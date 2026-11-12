"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Trophy, Sparkles } from "lucide-react";
import { sound } from "@/lib/sound";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/student/dashboard", label: "Tổng quan", icon: Home },
    { href: "/student/exercises", label: "Bài tập câu ghép", icon: BookOpen },
    { href: "/student/progress", label: "Bảng thành tích", icon: Trophy },
  ];

  return (
    <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/80 hidden md:flex flex-col h-full shrink-0 shadow-xs">
      <div className="p-4 flex-1 flex flex-col gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 px-3 py-1">
          Học tập
        </span>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => sound.playPop()}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 translate-x-1" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}

        {/* Small AI Tip Banner in Sidebar */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100/80 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Mẹo học nhanh</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Câu ghép luôn gồm nhiều vế câu độc lập, mỗi vế có đủ Chủ ngữ và Vị ngữ riêng nhé!
          </p>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="p-4 border-t border-slate-200/80">
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/60">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-xl shadow-xs">
            👦
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-extrabold text-sm text-slate-800 truncate">Học sinh Lớp 5A</p>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Đang trực tuyến</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
