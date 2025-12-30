export const dynamic = 'force-dynamic';
import { getDetail } from "@/lib/api";
import Link from "next/link";
import { List, Play } from "lucide-react";

export default async function DetailPage({ params }) {
  const res = await getDetail(params.id);
  const data = res?.data?.video_data;

  if (!data) return <div className="p-20 text-center">Drama tidak ditemukan...</div>;

  const proxiedCover = `/api/image?url=${encodeURIComponent(data.series_cover)}`;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#020617] pb-10">
      {/* Header Info */}
      <div className="p-6 flex gap-4 border-b border-white/5">
        <img src={proxiedCover} className="w-24 h-32 rounded-lg object-cover shadow-lg" alt="" />
        <div className="flex-1">
          <h1 className="text-xl font-bold leading-tight">{data.series_title}</h1>
          <div className="mt-2 flex flex-wrap gap-1">
            {JSON.parse(data.category_schema || "[]").slice(0, 3).map((c, i) => (
              <span key={i} className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Deskripsi */}
      <div className="p-6">
        <p className="text-xs text-slate-400 leading-relaxed italic line-clamp-3">
          "{data.series_intro}"
        </p>
      </div>

      {/* Grid Episode ala Foto yang Anda Kirim */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-4 text-cyan-400">
          <List className="w-4 h-4" />
          <span className="text-sm font-bold uppercase tracking-wider">Episode List</span>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {(data.video_list || []).map((ep) => (
            <Link 
              href={`/play/${ep.vid}`} 
              key={ep.vid}
              className={`aspect-square flex items-center justify-center rounded-md text-sm font-bold transition-all border border-white/5 
                ${ep.vid_index === 1 ? 'bg-pink-300 text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            >
              {ep.vid_index}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
    }
