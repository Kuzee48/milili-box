import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) return new Response('URL missing', { status: 400 });

  try {
    // 1. Ambil data asli dari CDN (seperti tiktok/fizzopic)
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.tiktok.com/',
      },
    });

    if (!response.ok) throw new Error('Gagal mengambil gambar dari sumber');

    const inputBuffer = await response.arrayBuffer();

    // 2. KONVERSI MENGGUNAKAN SHARP
    // Kita ubah HEIC/format lain menjadi JPEG dengan kualitas optimal
    const outputBuffer = await sharp(Buffer.from(inputBuffer))
      .jpeg({ quality: 80 }) 
      .toBuffer();

    // 3. Kirim hasilnya ke browser
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Sharp Error:', error);
    return new Response('Konversi Gagal', { status: 500 });
  }
}
