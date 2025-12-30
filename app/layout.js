import "./globals.css";
import Navbar from "@/components/Navbar";
import Snowfall from "@/components/Snowfall";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "JOKERBOX - Winter Drama Streaming",
  description: "Nikmati drama pendek terbaik dalam suasana musim dingin yang ajaib.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#020617] text-slate-100 min-h-screen relative`}>
        <div className="fixed inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <Snowfall />
        <Navbar />
        <main className="relative z-10 pt-24 pb-12">{children}</main>
      </body>
    </html>
  );
}
