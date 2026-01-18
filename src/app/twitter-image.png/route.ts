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
          justifyContent: 'center',
          padding: 70,
          background: 'linear-gradient(135deg, #fff7ed 0%, #f0fdf4 55%, #eef2ff 100%)',
          color: '#0f172a',
        },
      },
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22 } },
        h(
          'div',
          {
            style: {
              width: 56,
              height: 56,
              borderRadius: 16,
              background: SITE_CONFIG.themeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 32,
              fontWeight: 800,
            },
          },
          'W'
        ),
        h('div', { style: { fontSize: 40, fontWeight: 800, letterSpacing: -1 } }, SITE_CONFIG.name)
      ),
      h(
        'div',
        { style: { fontSize: 52, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1.2 } },
        'Fair meeting spots,',
        h('br', null),
        'balanced commutes'
      ),
      h(
        'div',
        { style: { marginTop: 18, fontSize: 26, color: '#334155', lineHeight: 1.2 } },
        'Equal travel time for everyone'
      )
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
