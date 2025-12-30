export const dynamic = 'force-dynamic';
import { getTrending, getLatests } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

export default async function Home() {
  const [trendingRes, latestsRes] = await Promise.all([getTrending(), getLatests()]);

  // Struktur JSON: Trending & Latest langsung berada di variabel .books
  const trendingData = trendingRes?.books || [];
  const latestsData = latestsRes?.books || [];

  return (
    <main className="max-w-md mx-auto min-h-screen bg-[#020617] px-4 pb-10">
      <h2 className="text-xl font-black py-6 text-cyan-400 tracking-tighter">DRAMA POPULER</h2>
      <div className="grid grid-cols-2 gap-4">
        {trendingData.map((book) => <MovieCard key={book.book_id} book={book} />)}
      </div>

      <h2 className="text-xl font-black py-6 text-cyan-400 tracking-tighter mt-4">RILIS BARU</h2>
      <div className="grid grid-cols-2 gap-4">
        {latestsData.map((book) => <MovieCard key={book.book_id} book={book} />)}
      </div>
    </main>
  );
}
