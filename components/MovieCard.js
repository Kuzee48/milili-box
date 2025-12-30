"use client";
import Link from "next/link";

export default function MovieCard({ book }) {
  if (!book) return null;
  const proxiedImg = `/api/image?url=${encodeURIComponent(book.thumb_url)}`;

  return (
    <Link href={`/detail/${book.book_id}`} className="group block no-underline text-white">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-800 border border-white/5 group-hover:border-cyan-500/50 transition-all">
        <img 
          src={proxiedImg} 
          alt={book.book_name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 right-2 text-[10px] font-bold text-cyan-400 truncate">
          {book.stat_infos?.[0]}
        </div>
      </div>
      <h3 className="mt-2 text-xs font-semibold line-clamp-2 leading-tight group-hover:text-cyan-400">
        {book.book_name}
      </h3>
    </Link>
  );
}
