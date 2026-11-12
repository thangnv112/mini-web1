"use client"

import Link from "next/link";
import { StarCounter } from "@/components/gamification/StarCounter";
import { Flame, Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <nav className="h-16 border-b border-slate-200/80 bg-white/90 backdrop-blur-md flex items-center px-6 justify-between shrink-0 sticky top-0 z-30 shadow-xs">
      <Link href="/student/dashboard" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
          <span className="text-xl">📚</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none">
            Tiếng Việt Lớp 5
          </span>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
            Trợ Lý Học Tập GenAI
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {/* Streak Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-bold shadow-xs">
          <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
          <span>3 Ngày liên tục</span>
        </div>

        {/* Level Badge */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Cấp 2: Thám Tử Câu Ghép</span>
        </div>

        {/* Stars */}
        <StarCounter count={12} />
      </div>
    </nav>
  );
}
