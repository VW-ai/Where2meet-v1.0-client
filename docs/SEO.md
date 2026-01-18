# SEO Standard Operating Procedure (SOP) - Where2Meet

> **Last Updated:** 2026-01-06
> **Version:** 2.0.0
> **Purpose:** Reference guide for all SEO implementations and maintenance procedures

---

## Quick Reference

| Item          | Status                   | Location                    |
| ------------- | ------------------------ | --------------------------- |
| Site URL      | `https://where2meet.org` | `.env`                      |
| Sitemap       | `/sitemap.xml`           | `src/app/sitemap.ts`        |
| Robots        | `/robots.txt`            | `public/robots.txt`         |
| SEO Utilities | Core library             | `src/lib/seo/`              |
| Analytics     | GA4 Ready                | `src/components/analytics/` |

---

## Table of Contents

1. [Site Configuration](#1-site-configuration)
2. [Page Indexing Strategy](#2-page-indexing-strategy)
3. [SEO Files Inventory](#3-seo-files-inventory)
4. [Metadata Implementation](#4-metadata-implementation)
5. [Structured Data (JSON-LD)](#5-structured-data-json-ld)
6. [Favicon & Icons](#6-favicon--icons)
7. [Content Pages](#7-content-pages)
8. [Keywords Strategy](#8-keywords-strategy)
9. [Analytics Setup](#9-analytics-setup)
10. [Maintenance Checklist](#10-maintenance-checklist)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Site Configuration

### Core Settings

| Setting     | Value                    | File                      |
| ----------- | ------------------------ | ------------------------- |
| Site Name   | `Where2Meet`             | `src/lib/seo/metadata.ts` |
| Site URL    | `https://where2meet.org` | `NEXT_PUBLIC_APP_URL`     |
| Locale      | `en_US`                  | `src/lib/seo/metadata.ts` |
| Theme Color | `#FF6B6B` (coral-500)    | `src/lib/seo/metadata.ts` |
| Author      | `Where2Meet`             | `src/lib/seo/metadata.ts` |

### Environment Variables

| Variable                        | Purpose                            | Required |
| ------------------------------- | ---------------------------------- | -------- |
| `NEXT_PUBLIC_APP_URL`           | Production URL for canonical links | Yes      |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 tracking        | Optional |

---

## 2. Page Indexing Strategy

### Indexing Rules by Page Type

| Page Type      | Route               | Index | Follow | Sitemap | Rationale                      |
| -------------- | ------------------- | ----- | ------ | ------- | ------------------------------ |
| Landing Page   | `/`                 | Yes   | Yes    | Yes     | Main SEO target                |
| How It Works   | `/how-it-works`     | Yes   | Yes    | Yes     | Feature explanation            |
| FAQ            | `/faq`              | Yes   | Yes    | Yes     | Keyword-rich content           |
| Contact        | `/contact`          | Yes   | Yes    | Yes     | Trust signal                   |
| Scenarios Hub  | `/scenarios`        | Yes   | Yes    | Yes     | Category page                  |
| Scenario Pages | `/scenarios/[slug]` | Yes   | Yes    | Yes     | Long-tail keywords             |
| Meeting Pages  | `/meet/[id]`        | No    | Yes    | No      | User-generated, allow OG crawl |
| Dashboard      | `/dashboard/*`      | No    | No     | No      | Private user data              |
| Auth Pages     | `/auth/*`           | No    | No     | No      | No SEO value                   |
| API Routes     | `/api/*`            | No    | No     | No      | Not for crawling               |

### Meeting Page Strategy (Critical)

```typescript
// noindex + follow = Social sharing works, no spam in search results
robots: {
  index: false,  // Don't rank user-generated pages
  follow: true,  // Allow crawling for Open Graph tags
}
```

**Why this approach?**

- Prevents low-quality spam pages from diluting site authority
- Allows Google to crawl and cache OG tags for beautiful social previews
- Keeps SEO power concentrated on landing/feature pages

---

## 3. SEO Files Inventory

### Core SEO Library (`src/lib/seo/`)

| File                  | Purpose                     | Key Exports                                                                                 |
| --------------------- | --------------------------- | ------------------------------------------------------------------------------------------- |
| `metadata.ts`         | SEO utilities & site config | `SITE_CONFIG`, `createMetadata()`, `createMeetingPageMetadata()`, `createArticleMetadata()` |
| `structured-data.ts`  | JSON-LD schema generators   | `organizationSchema()`, `websiteSchema()`, `eventSchema()`, `faqPageSchema()`               |
| `content-registry.ts` | Content freshness tracking  | `getPageLastUpdated()`, `getStalePages()`                                                   |
| `types/content.ts`    | TypeScript definitions      | Content metadata types, update frequency enum                                               |

### Static Files

| File          | Location              | Purpose             |
| ------------- | --------------------- | ------------------- |
| `robots.txt`  | `public/robots.txt`   | Crawler directives  |
| `sitemap.ts`  | `src/app/sitemap.ts`  | Dynamic XML sitemap |
| `manifest.ts` | `src/app/manifest.ts` | PWA manifest        |

### Layout Files with Metadata

| File                                          | Metadata Type                             |
| --------------------------------------------- | ----------------------------------------- |
| `src/app/layout.tsx`                          | Root metadata, Organization schema        |
| `src/app/(landing)/layout.tsx`                | Landing page metadata, WebSite schema     |
| `src/app/(landing)/how-it-works/page.tsx`     | Feature page metadata                     |
| `src/app/(landing)/faq/page.tsx`              | FAQ metadata, FAQPage schema              |
| `src/app/(landing)/contact/page.tsx`          | Contact page metadata                     |
| `src/app/(landing)/scenarios/page.tsx`        | Scenarios hub metadata                    |
| `src/app/(landing)/scenarios/[slug]/page.tsx` | Dynamic scenario metadata, FAQPage schema |
| `src/app/meet/[id]/layout.tsx`                | Dynamic meeting metadata (noindex)        |
| `src/app/dashboard/layout.tsx`                | Dashboard metadata (noindex)              |
| `src/app/auth/layout.tsx`                     | Auth metadata (noindex)                   |

---

## 4. Metadata Implementation

### Metadata Preset Functions

| Function                      | Use Case           | Key Features                            |
| ----------------------------- | ------------------ | --------------------------------------- |
| `createMetadata()`            | General pages      | Title, description, canonical, OG       |
| `createMeetingPageMetadata()` | `/meet/[id]` pages | noindex/follow, dynamic titles          |
| `createArticleMetadata()`     | Scenarios, blog    | publishedTime, modifiedTime, article OG |
| `createFeaturePageMetadata()` | Feature pages      | Feature-specific keywords               |

### Default Metadata (Root Layout)

| Property       | Value                                         |
| -------------- | --------------------------------------------- |
| Title Template | `%s \| Where2Meet – Fair Meeting Planner`     |
| Default Title  | `Where2Meet – Fair Meeting Planner`           |
| Description    | Find the perfect meeting spot for everyone... |
| OG Type        | `website`                                     |
| Twitter Card   | `summary_large_image`                         |

### Open Graph Configuration

| Property         | Default Value    | Override Location       |
| ---------------- | ---------------- | ----------------------- |
| `og:title`       | Page title       | Per-page metadata       |
| `og:description` | Page description | Per-page metadata       |
| `og:image`       | `/og-image.png`  | Per-page metadata       |
| `og:type`        | `website`        | `article` for scenarios |
| `og:locale`      | `en_US`          | `SITE_CONFIG`           |
| `og:site_name`   | `Where2Meet`     | `SITE_CONFIG`           |

### Social Sharing Images

| Image                | Size       | Purpose               | Status                      |
| -------------------- | ---------- | --------------------- | --------------------------- |
| `/og-image.png`      | 1200x630px | Default Open Graph    | Implemented (dynamic route) |
| `/og-landing.png`    | 1200x630px | Landing page specific | Implemented (dynamic route) |
| `/twitter-image.png` | 1200x600px | Twitter Card          | Implemented (dynamic route) |

---

## 5. Structured Data (JSON-LD)

### Implemented Schemas

| Schema Type  | Location             | Purpose                      |
| ------------ | -------------------- | ---------------------------- |
| Organization | Root layout          | Brand identity, rich results |
| WebSite      | Landing layout       | Site-wide search features    |
| Event        | Meeting pages        | Event rich results (minimal) |
| FAQPage      | FAQ + Scenario pages | FAQ rich results             |

### Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Where2Meet",
  "url": "https://where2meet.org",
  "logo": "https://where2meet.org/logo.png",
  "description": "Find the perfect meeting spot for everyone",
  "foundingDate": "2024"
}
```

### FAQPage Schema Usage

| Page                | Questions        | Implementation             |
| ------------------- | ---------------- | -------------------------- |
| `/faq`              | 20+ questions    | Static FAQ data            |
| `/scenarios/[slug]` | 3-5 per scenario | Dynamic from scenario data |

### Event Schema (Conservative Approach)

Only use minimal fields to avoid Google warnings:

- `name` (required)
- `startDate` (required)
- `organizer` (required)
- Skip: `location`, `offers`, `eventStatus` unless confirmed

---

## 6. Favicon & Icons

### Asset Inventory

| File                   | Size    | Purpose          | Status      |
| ---------------------- | ------- | ---------------- | ----------- |
| `favicon.ico`          | 48x48   | Browser favicon  | Implemented |
| `favicon-16.png`       | 16x16   | Small favicon    | Implemented |
| `favicon-32.png`       | 32x32   | Standard favicon | Implemented |
| `favicon-48.png`       | 48x48   | Large favicon    | Implemented |
| `apple-touch-icon.png` | 180x180 | Apple devices    | Implemented |
| `icon-192.png`         | 192x192 | PWA icon         | Implemented |
| `icon-512.png`         | 512x512 | PWA splash       | Implemented |

### Icon Configuration (Root Layout)

```typescript
icons: {
  icon: [
    { url: '/favicon.ico', sizes: '48x48' },
    { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
}
```

---

## 7. Content Pages

### Scenario Pages (SEO-Optimized)

| Slug                             | Target Keyword           | Priority |
| -------------------------------- | ------------------------ | -------- |
| `friends-group-dinner-spot`      | group dinner planning    | 0.7      |
| `date-night-equal-distance`      | fair date location       | 0.7      |
| `coworkers-lunch-spot`           | work lunch meeting spot  | 0.7      |
| `group-weekend-hangout`          | weekend hangout planning | 0.7      |
| `family-reunion-location-finder` | family reunion location  | 0.7      |
| `remote-team-offsite-planning`   | team offsite planning    | 0.7      |
| `cross-city-client-meetings`     | client meeting location  | 0.7      |
| `long-distance-friends-reunion`  | long distance meetup     | 0.7      |

### Scenario Page Structure

Each scenario page includes:
| Section | Purpose |
|---------|---------|
| Hero | Headline + CTA |
| Problem | Pain point identification |
| Solution | How Where2Meet helps |
| Step-by-Step | Usage guide |
| Best Practices | Tips and advice |
| FAQ | 3-5 questions (FAQPage schema) |
| Related Scenarios | Internal linking |
| CTA | Conversion action |

### Feature Pages

| Page          | Route           | h1                                                | Priority |
| ------------- | --------------- | ------------------------------------------------- | -------- |
| Landing       | `/`             | Find Fair Meeting Spots with Equal Travel Times   | 1.0      |
| How It Works  | `/how-it-works` | How Where2Meet Finds the Fairest Meeting Location | 0.8      |
| FAQ           | `/faq`          | Where2Meet FAQ – Fair Meeting Locations Explained | 0.8      |
| Contact       | `/contact`      | Contact Where2Meet                                | 0.8      |
| Scenarios Hub | `/scenarios`    | Fair Meeting Scenarios - Where2Meet Use Cases     | 0.8      |

---

## 8. Keywords Strategy

### Keyword Categories

| Category        | Keywords                                                          | Usage                 |
| --------------- | ----------------------------------------------------------------- | --------------------- |
| Core            | meeting spot finder, group meeting planner, find meeting location | All pages             |
| Differentiation | fair meeting location, equal travel time, midpoint meeting        | Landing, How It Works |
| AI/Smart        | AI meeting planner, smart meeting finder, optimal meeting point   | Feature pages         |
| Features        | compare travel times, visual meeting planning, venue finder       | Feature pages         |

### Primary Target Keywords

| Keyword                          | Target Page  | Competition |
| -------------------------------- | ------------ | ----------- |
| meeting spot finder              | Landing      | Medium      |
| group meeting planner            | Landing      | Medium      |
| fair meeting location            | How It Works | Low         |
| central meeting point calculator | Landing      | Low         |
| where to meet friends            | Scenarios    | Medium      |

### Long-Tail Keywords (Scenarios)

| Keyword                         | Target Page                    |
| ------------------------------- | ------------------------------ |
| where to meet for group dinner  | friends-group-dinner-spot      |
| equal distance date spot        | date-night-equal-distance      |
| coworker lunch meeting location | coworkers-lunch-spot           |
| family reunion location finder  | family-reunion-location-finder |
| remote team offsite planning    | remote-team-offsite-planning   |

---

## 9. Analytics Setup

### Google Analytics 4

| Item          | Value                                           |
| ------------- | ----------------------------------------------- |
| Component     | `src/components/analytics/google-analytics.tsx` |
| Env Variable  | `NEXT_PUBLIC_GA_MEASUREMENT_ID`                 |
| Load Strategy | `afterInteractive`                              |
| Tracking      | Automatic pageviews                             |

### Custom Events (`src/lib/analytics/events.ts`)

| Event            | Trigger           |
| ---------------- | ----------------- |
| `createEvent`    | Meeting created   |
| `joinEvent`      | Participant joins |
| `addLocation`    | Location added    |
| `voteVenue`      | Venue voted       |
| `publishMeeting` | Meeting finalized |
| `shareEvent`     | Link shared       |

### Setup Steps

1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
4. Deploy - tracking starts automatically

---

## 10. Maintenance Checklist

### Weekly Tasks

| Task               | Tool           | Action                 |
| ------------------ | -------------- | ---------------------- |
| Check crawl errors | Search Console | Fix any 4xx/5xx errors |
| Review analytics   | GA4            | Monitor traffic trends |

### Monthly Tasks

| Task                | Tool                 | Action                                 |
| ------------------- | -------------------- | -------------------------------------- |
| SEO audit           | Lighthouse           | Run `lighthouse --only-categories=seo` |
| Keyword rankings    | Search Console       | Track position changes                 |
| Content freshness   | Content Registry     | Check `getStalePages()`                |
| Social sharing test | FB/Twitter debuggers | Verify OG previews                     |

### Quarterly Tasks

| Task                    | Tool                | Action                     |
| ----------------------- | ------------------- | -------------------------- |
| Full SEO audit          | Lighthouse + manual | Score target: 90+          |
| Keyword research        | Search Console      | Identify new opportunities |
| Competitor analysis     | Manual              | Review competitor SEO      |
| Meta description review | Manual              | Update stale descriptions  |

### Annual Tasks

| Task                    | Action                    |
| ----------------------- | ------------------------- |
| Comprehensive audit     | Full technical SEO review |
| Schema.org updates      | Check for spec changes    |
| Image refresh           | Update OG/social images   |
| Content strategy review | Plan new scenario pages   |

---

## 11. Troubleshooting

### Common Issues

| Issue                | Diagnosis                         | Solution                                        |
| -------------------- | --------------------------------- | ----------------------------------------------- |
| Page not indexed     | Check robots meta, Search Console | Ensure `index: true`, request indexing          |
| OG image not showing | Test with FB debugger             | Verify image exists, correct size, absolute URL |
| Missing from sitemap | Check `src/app/sitemap.ts`        | Add URL entry with priority                     |
| Lighthouse score low | Run Lighthouse audit              | Fix specific issues in report                   |
| GA4 not tracking     | Check env var, ad blockers        | Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` set      |

### Verification Commands

```bash
# Check robots.txt
curl https://where2meet.org/robots.txt

# Check sitemap
curl https://where2meet.org/sitemap.xml

# Check OG image
curl -I https://where2meet.org/og-image.png

# Run Lighthouse SEO audit
lighthouse https://where2meet.org --only-categories=seo
```

### Testing Tools

| Tool                  | URL                                    | Purpose                    |
| --------------------- | -------------------------------------- | -------------------------- |
| Google Search Console | search.google.com/search-console       | Indexing, errors, rankings |
| Facebook Debugger     | developers.facebook.com/tools/debug    | OG tag preview             |
| Twitter Validator     | cards-validator.twitter.com            | Twitter Card preview       |
| Rich Results Test     | search.google.com/test/rich-results    | Schema validation          |
| Mobile-Friendly Test  | search.google.com/test/mobile-friendly | Mobile SEO                 |
| PageSpeed Insights    | pagespeed.web.dev                      | Performance + SEO          |

---

## Appendix A: Adding New Pages

### Standard Page Checklist

| Step | Action                                                    |
| ---- | --------------------------------------------------------- |
| 1    | Create page with `createMetadata()` or appropriate preset |
| 2    | Set proper `title`, `description`, `canonical`            |
| 3    | Add h1 tag with target keyword                            |
| 4    | Add to sitemap if indexable                               |
| 5    | Add JSON-LD schema if applicable                          |
| 6    | Test with Lighthouse                                      |

### Example: New Feature Page

```typescript
// src/app/(landing)/new-feature/page.tsx
import { createMetadata } from '@/lib/seo/metadata';

export const metadata = createMetadata({
  title: 'New Feature - Keyword Rich Title',
  description: 'Description with primary keywords (150-160 chars)',
  canonical: '/new-feature',
  keywords: ['additional', 'keywords'],
});

export default function NewFeaturePage() {
  return (
    <main>
      <h1>New Feature Heading</h1>
      {/* content */}
    </main>
  );
}
```

### Update Sitemap

```typescript
// src/app/sitemap.ts
{
  url: `${baseUrl}/new-feature`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
}
```

---

## Appendix B: Files Quick Reference

### Must-Know Files

| File                      | Purpose                      |
| ------------------------- | ---------------------------- |
| `src/lib/seo/metadata.ts` | All SEO config and utilities |
| `src/app/sitemap.ts`      | Sitemap generation           |
| `public/robots.txt`       | Crawler rules                |
| `src/app/layout.tsx`      | Root metadata                |

### Full File Tree

```
src/
├── app/
│   ├── layout.tsx                 # Root metadata + Organization schema
│   ├── sitemap.ts                 # Dynamic sitemap
│   ├── manifest.ts                # PWA manifest
│   ├── (landing)/
│   │   ├── layout.tsx             # Landing metadata + WebSite schema
│   │   ├── page.tsx               # Homepage
│   │   ├── how-it-works/page.tsx  # Feature page
│   │   ├── faq/page.tsx           # FAQ + FAQPage schema
│   │   ├── contact/page.tsx       # Contact page
│   │   └── scenarios/
│   │       ├── page.tsx           # Scenarios hub
│   │       └── [slug]/page.tsx    # Dynamic scenarios
│   ├── meet/[id]/
│   │   └── layout.tsx             # Meeting metadata (noindex)
│   ├── dashboard/
│   │   └── layout.tsx             # Dashboard metadata (noindex)
│   └── auth/
│       └── layout.tsx             # Auth metadata (noindex)
├── lib/seo/
│   ├── metadata.ts                # Core SEO utilities
│   ├── structured-data.ts         # JSON-LD generators
│   ├── content-registry.ts        # Content freshness
│   └── types/content.ts           # TypeScript types
└── components/
    ├── seo/
    │   └── structured-data.tsx    # Schema injection
    └── analytics/
        └── google-analytics.tsx   # GA4 component

public/
├── robots.txt                     # Crawler directives
├── favicon.ico                    # Browser favicon
├── favicon-16.png                 # 16x16 favicon
├── favicon-32.png                 # 32x32 favicon
├── favicon-48.png                 # 48x48 favicon
├── apple-touch-icon.png           # Apple touch icon
├── icon-192.png                   # PWA icon
└── icon-512.png                   # PWA splash
```

---

## Appendix C: Outstanding Tasks

| Task                                     | Priority | Status  |
| ---------------------------------------- | -------- | ------- |
| Create `/og-image.png` (1200x630px)      | High     | Pending |
| Create `/og-landing.png` (1200x630px)    | High     | Pending |
| Create `/twitter-image.png` (1200x600px) | High     | Pending |
| Add Google Search Console verification   | Medium   | Pending |
| Configure GA4 in production              | Medium   | Pending |
| Add breadcrumb schema                    | Low      | Future  |
| Implement hreflang for i18n              | Low      | Future  |

---

**Document maintained by:** Where2Meet Team
**Review frequency:** Quarterly
