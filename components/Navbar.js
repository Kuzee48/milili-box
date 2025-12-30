// components/Navbar.js
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [q, setQ] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if(q) router.push(`/search?q=${q}`);
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-cyan-900/50 px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        JOKERBOX
      </Link>
      <form onSubmit={handleSearch} className="relative">
        <input 
          type="text" 
          placeholder="Cari drama..." 
          className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 focus:outline-none focus:border-cyan-500 text-sm w-40 md:w-64"
          onChange={(e) => setQ(e.target.value)}
        />
      </form>
    </nav>
  );
}
