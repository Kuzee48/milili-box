import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let imageUrl = searchParams.get('url');
  if (!imageUrl) return new Response('No URL', { status: 400 });

  // Trik: Paksa CDN mengirim format yang bisa dibaca browser daripada .heic
  const cleanUrl = imageUrl.replace('.heic', '.image');

  try {
    const response = await fetch(cleanUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.tiktok.com/', 
      },
    });

    const buffer = await response.arrayBuffer();
    return new NextResponse(buffer, {
      headers: { 'Content-Type': 'image/jpeg', 'Cache-Control': 'public, max-age=31536000' },
    });
  } catch (e) {
    return new Response('Fail', { status: 500 });
  }
}
