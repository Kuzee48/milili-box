import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let imageUrl = searchParams.get('url');

  if (!imageUrl) return new Response('URL missing', { status: 400 });

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        'Referer': 'https://www.tiktok.com/', // Menipu CDN TikTok
      },
    });

    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg'); // Memaksa browser membaca sebagai JPEG
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(buffer, { headers });
  } catch (e) {
    return new Response('Error loading image', { status: 500 });
  }
}
