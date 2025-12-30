"use client";
import Link from "next/link";

export default function MovieCard({ book }) {
  if (!book) return null;
  
  // Mengarahkan URL gambar asli melalui proxy internal kita
  const proxiedImageUrl = `/api/image?url=${encodeURIComponent(book.thumb_url)}`;

  return (
    <Link href={`/detail/${book.book_id}`} className="group block relative bg-slate-900/40 rounded-2xl overflow-hidden border border-white/5 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
      <div className="aspect-[3/4] relative overflow-hidden bg-slate-800">
        <img 
          src={proxiedImageUrl} 
          alt={book.book_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Overlay Salju/Winter */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-[10px] text-cyan-300 font-black uppercase tracking-widest drop-shadow-md">
            {book.stat_infos?.[0] || "Winter Selection"}
          </p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {book.book_name}
        </h3>
      </div>
    </Link>
  );
            }
