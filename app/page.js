export const dynamic = 'force-dynamic';

import { getTrending, getLatests } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const [trendingRes, latestsRes] = await Promise.all([
    getTrending(),
    getLatests()
  ]);

  // Handle struktur JSON yang berbeda:
  // Trending & Latest biasanya langsung .books
  const trendingData = trendingRes?.books || trendingRes?.data?.books || [];
  const latestsData = latestsRes?.books || latestsRes?.data?.books || [];

  return (
    <main className="min-h-screen">
      <section className="mb-14 px-6 md:px-12">
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-cyan-400 rounded-full" /> Drama Populer
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {trendingData.length > 0 ? (
            trendingData.map((book) => <MovieCard key={book.book_id} book={book} />)
          ) : (
            <p className="text-slate-500 italic">Gagal memuat drama populer...</p>
          )}
        </div>
      </section>

      <section className="mb-14 px-6 md:px-12">
        <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
          <span className="w-2 h-6 bg-cyan-400 rounded-full" /> Rilis Baru
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {latestsData.length > 0 ? (
            latestsData.map((book) => <MovieCard key={book.book_id} book={book} />)
          ) : (
            <p className="text-slate-500 italic">Gagal memuat rilis baru...</p>
          )}
        </div>
      </section>
    </main>
  );
  }
