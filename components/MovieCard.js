"use client";
import Link from "next/link";

export default function MovieCard({ book }) {
  if (!book) return null;
  
  // Masukkan URL gambar asli ke dalam parameter proxy kita
  const imageUrl = `/api/image?url=${encodeURIComponent(book.thumb_url)}`;

  return (
    <Link href={`/detail/${book.book_id}`} className="group block no-underline">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-800 border border-white/5">
        <img 
          src={imageUrl} 
          alt={book.book_name}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>
      <h3 className="mt-2 text-xs font-bold text-white line-clamp-2 leading-tight">
        {book.book_name}
      </h3>
    </Link>
  );
}
