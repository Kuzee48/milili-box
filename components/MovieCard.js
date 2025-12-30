"use client";
import Link from "next/link";

export default function MovieCard({ book }) {
  if (!book) return null;
  const proxiedImg = `/api/image?url=${encodeURIComponent(book.thumb_url)}`;

  return (
    <Link href={`/detail/${book.book_id}`} className="group block text-white no-underline">
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900 border border-white/5 group-hover:border-cyan-500 transition-all duration-300 shadow-xl">
        <img 
          src={proxiedImg} 
          alt={book.book_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="text-[9px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-cyan-300 font-bold w-fit truncate">
            {book.stat_infos?.[0] || "Update"}
          </div>
        </div>
      </div>
      <h3 className="mt-2 text-xs font-bold line-clamp-1 group-hover:text-cyan-400 transition-colors">
        {book.book_name}
      </h3>
    </Link>
  );
}
