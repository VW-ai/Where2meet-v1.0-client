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
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          color: 'white',
        },
      },
      h(
        'div',
        {
          style: {
            width: 420,
            height: 420,
            borderRadius: 120,
            background: SITE_CONFIG.themeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 200,
            fontWeight: 900,
            letterSpacing: -10,
          },
        },
        'W'
      )
    ),
    {
      width: 512,
      height: 512,
    }
  );
}
