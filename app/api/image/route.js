import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let imageUrl = searchParams.get('url');

  if (!imageUrl) return new Response('URL missing', { status: 400 });

  // TRIK MAGIC: Mengubah '.heic' menjadi '.webp' di dalam URL sebelum dikirim ke CDN
  // Ini memaksa server gambar TikTok mengirim format yang bisa dibaca browser Anda.
  const optimizedUrl = imageUrl.replace('.heic', '.webp');

  try {
    const response = await fetch(optimizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.tiktok.com/', 
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', 'image/webp');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(arrayBuffer, { headers });
  } catch (e) {
    return new Response('Failed to fetch image', { status: 500 });
  }
}
