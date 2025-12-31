import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) return new Response('URL missing', { status: 400 });

  try {
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.tiktok.com/',
      },
    });

    const arrayBuffer = await response.arrayBuffer();
    
    // KONVERSI HEIC/JPG/PNG -> JPEG menggunakan Sharp
    const buffer = await sharp(Buffer.from(arrayBuffer))
      .jpeg({ quality: 80 })
      .toBuffer();

    return new NextResponse(buffer, {
      headers: { 
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
    });
  } catch (e) {
    console.error("Sharp Error:", e);
    return new Response('Fail', { status: 500 });
  }
}
