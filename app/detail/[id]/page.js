export const dynamic = 'force-dynamic';
import { getDetail } from "@/lib/api";
import Link from "next/link";
import { ChevronLeft, List } from "lucide-react";

export default async function DetailPage({ params }) {
  const res = await getDetail(params.id);
  const data = res?.data?.video_data;

  if (!data) return <div className="p-20 text-center text-white">Loading...</div>;

  const proxiedCover = `/api/image?url=${encodeURIComponent(data.series_cover)}`;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#020617] text-white border-x border-white/5 pb-20">
      <div className="relative h-80 w-full overflow-hidden">
        <Link href="/" className="absolute top-4 left-4 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <img src={proxiedCover} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-black/20" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-2xl font-black leading-tight drop-shadow-lg">{data.series_title}</h1>
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Deskripsi Singkat */}
        <p className="text-xs text-slate-400 leading-relaxed italic opacity-80 mb-8 line-clamp-3">
          "{data.series_intro}"
        </p>

        {/* EPISODE GRID - 6 KOLOM FIX */}
        <div className="flex items-center gap-2 mb-4 text-white">
          <List className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-bold uppercase tracking-widest">Episode ({data.episode_cnt})</span>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {(data.video_list || []).map((ep) => (
            <Link 
              href={`/play/${ep.vid}`} 
              key={ep.vid}
              className={`aspect-square flex items-center justify-center rounded-lg text-xs font-black transition-all border border-white/5 
                ${ep.vid_index === 1 
                  ? 'bg-pink-400 text-black shadow-lg shadow-pink-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-cyan-600 hover:text-white'}`}
            >
              {ep.vid_index}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
