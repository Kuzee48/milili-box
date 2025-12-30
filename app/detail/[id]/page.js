export const dynamic = 'force-dynamic';
import { getDetail } from "@/lib/api";
import Link from "next/link";
import { List, ChevronLeft } from "lucide-react";

export default async function DetailPage({ params }) {
  const res = await getDetail(params.id);
  const data = res?.data?.video_data;

  if (!data) return <div className="p-20 text-center">Data Kosong...</div>;

  const proxiedCover = `/api/image?url=${encodeURIComponent(data.series_cover)}`;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#020617] text-white border-x border-white/5 pb-10">
      <div className="relative h-72 w-full">
        <Link href="/" className="absolute top-4 left-4 z-10 p-2 bg-black/40 rounded-full border border-white/10">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <img src={proxiedCover} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent" />
        <h1 className="absolute bottom-4 left-6 text-2xl font-black">{data.series_title}</h1>
      </div>

      <div className="px-6 py-4">
        <p className="text-xs text-slate-400 italic mb-6">"{data.series_intro}"</p>

        {/* EPISODE GRID 6 KOLOM */}
        <div className="flex items-center gap-2 mb-4 text-cyan-400">
          <List className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest">Daftar Episode</span>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {(data.video_list || []).map((ep) => (
            <Link 
              href={`/play/${ep.vid}`} 
              key={ep.vid}
              className={`aspect-square flex items-center justify-center rounded-lg text-xs font-bold border border-white/5 
                ${ep.vid_index === 1 ? 'bg-[#FF99CC] text-black' : 'bg-slate-800 text-slate-300'}`}
            >
              {ep.vid_index}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
            }
