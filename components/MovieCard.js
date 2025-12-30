"use client";
import Link from "next/link";

export default function MovieCard({ book }) {
  if (!book) return null;
  const proxiedImg = `/api/image?url=${encodeURIComponent(book.thumb_url)}`;

  return (
    <Link href={`/detail/${book.book_id}`} className="group block text-white no-underline outline-none">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900 border border-white/5 group-hover:border-cyan-500 transition-all duration-300 shadow-xl">
        <img 
          src={proxiedImg} 
          alt={book.book_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-[9px] bg-cyan-500 text-black px-2 py-0.5 rounded font-black w-fit uppercase tracking-tighter">
            {book.stat_infos?.[0] || "DRAMA"}
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-[11px] font-bold line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors px-1">
        {book.book_name}
      </h3>
    </Link>
  );
}
