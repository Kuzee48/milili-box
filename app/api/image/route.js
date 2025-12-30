import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let imageUrl = searchParams.get('url');

  if (!imageUrl) return new Response('URL missing', { status: 400 });

  // Trik: Mengubah ekstensi .heic menjadi .image agar CDN ByteDance mengirim format yang didukung browser
  imageUrl = imageUrl.replace('.heic', '.image');

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/', 
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(arrayBuffer, { headers });
  } catch (e) {
    return new Response('Failed', { status: 500 });
  }
}
