import { ImageResponse } from 'next/og';
import { createElement as h } from 'react';
import { SITE_CONFIG } from '@/lib/seo/metadata';

export const runtime = 'edge';
export const revalidate = 60 * 60 * 24; // 24h

export async function GET() {
  return new ImageResponse(
    h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'linear-gradient(135deg, #fff7ed 0%, #fdf2f8 45%, #eef2ff 100%)',
          color: '#0f172a',
        },
      },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
        h(
          'div',
          { style: { display: 'flex', alignItems: 'center', gap: 18 } },
          h(
            'div',
            {
              style: {
                width: 64,
                height: 64,
                borderRadius: 18,
                background: SITE_CONFIG.themeColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 36,
                fontWeight: 800,
              },
            },
            'W'
          ),
          h(
            'div',
            { style: { fontSize: 44, fontWeight: 800, letterSpacing: -1 } },
            SITE_CONFIG.name
          )
        ),
        h('div', { style: { fontSize: 22, color: '#475569' } }, SITE_CONFIG.url)
      ),
      h(
        'div',
        null,
        h(
          'div',
          { style: { fontSize: 58, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1.2 } },
          'Find the perfect',
          h('br', null),
          'meeting spot for your group'
        ),
        h(
          'div',
          { style: { marginTop: 18, fontSize: 28, color: '#334155', lineHeight: 1.2 } },
          'No sign-ups • AI-powered venue ideas • Travel-time fairness'
        )
      ),
      h(
        'div',
        { style: { display: 'flex', gap: 14 } },
        h(
          'div',
          {
            style: {
              padding: '14px 18px',
              borderRadius: 999,
              background: SITE_CONFIG.themeColor,
              color: 'white',
              fontSize: 22,
              fontWeight: 700,
            },
          },
          'Create a meetup in seconds'
        ),
        h(
          'div',
          {
            style: {
              padding: '14px 18px',
              borderRadius: 999,
              background: 'rgba(15, 23, 42, 0.06)',
              color: '#0f172a',
              fontSize: 22,
              fontWeight: 700,
            },
          },
          'Compare travel times'
        )
      )
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
