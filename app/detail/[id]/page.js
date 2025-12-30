export const dynamic = 'force-dynamic';
import { getDetail } from "@/lib/api";
import Link from "next/link";
import { List } from "lucide-react";

export default async function DetailPage({ params }) {
  const response = await getDetail(params.id);
  const data = response?.data?.video_data;

  if (!data) return <div className="p-20 text-center text-slate-500 font-italic">Drama membeku di musim dingin...</div>;

  const proxiedCover = `/api/image?url=${encodeURIComponent(data.series_cover)}`;

  return (
    <div className="min-h-screen">
      {/* Background Banner */}
      <div className="fixed top-0 left-0 w-full h-[60vh] -z-10 opacity-20 blur-2xl">
        <img src={proxiedCover} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        <div className="flex flex-col items-center text-center mb-12">
          <img 
            src={proxiedCover} 
            className="w-48 md:w-64 rounded-3xl shadow-[0_0_50px_rgba(34,211,238,0.2)] border-4 border-white/10 mb-8" 
            alt={data.series_title} 
          />
          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter drop-shadow-xl">
            {data.series_title}
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed italic">
            "{data.series_intro}"
          </p>
        </div>

        {/* Episode Grid */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl">
          <h2 className="flex items-center justify-center gap-3 text-2xl font-black mb-10 text-cyan-400 uppercase tracking-widest">
            <List className="w-6 h-6" /> Episode List
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
            {(data.video_list || []).map((ep) => (
              <Link 
                href={`/play/${ep.vid}`} 
                key={ep.vid}
                className="aspect-square flex items-center justify-center rounded-2xl bg-white/5 hover:bg-cyan-500 hover:scale-110 transition-all font-bold text-white shadow-lg border border-white/5"
              >
                {ep.vid_index}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
    }
