export const dynamic = 'force-dynamic';

import { getStream } from "@/lib/api";

export default async function PlayerPage({ params }) {
  const { vid } = params;
  const streamResponse = await getStream(vid);
  
  // Ambil URL utama, jika tidak ada gunakan backup_url
  const videoSrc = streamResponse?.data?.main_url || streamResponse?.data?.backup_url;

  if (!videoSrc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-slate-400">
        <p className="italic">Video tidak dapat dimuat atau telah kedaluwarsa.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 min-h-[70vh]">
      <div className="relative w-full max-w-[450px] aspect-[9/16] rounded-3xl overflow-hidden border-4 border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.2)] bg-black">
        <video 
          src={videoSrc}
          controls 
          className="w-full h-full"
          autoPlay
          playsInline
        />
      </div>
      <div className="mt-10 text-center">
        <h2 className="text-cyan-400 font-bold text-xl tracking-widest uppercase animate-pulse">Now Playing</h2>
        <p className="text-slate-500 text-sm mt-2 font-medium">JOKERBOX Frost-Server Premium Streaming</p>
      </div>
    </div>
  );
}
