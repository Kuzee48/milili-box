export const dynamic = 'force-dynamic';

import { searchDramas } from "@/lib/api";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";

export default async function SearchPage({ searchParams }) {
  // Pastikan q diambil dengan benar dari query string
  const query = searchParams?.q || "";
  let results = [];

  try {
    const response = await searchDramas(query);
    results = response?.data?.search_data || [];
  } catch (error) {
    results = [];
  }

  return (
    <div className="px-6 md:px-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          Hasil pencarian untuk: <span className="text-cyan-400">"{query}"</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Ditemukan {results.length} drama ajaib</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((item, idx) => {
            // Mengambil buku pertama dari setiap hasil pencarian
            const book = item.books?.[0];
            if (!book) return null;

            return (
              <MovieCard key={book.book_id || idx} book={book} />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-slate-400 italic">Maaf, JOKERBOX tidak menemukan drama tersebut di bawah salju...</p>
        </div>
      )}
    </div>
  );
                       }
