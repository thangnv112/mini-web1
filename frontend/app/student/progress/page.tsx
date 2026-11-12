"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StarCounter } from "@/components/gamification/StarCounter";
import { AIMascot } from "@/components/ai/AIMascot";
import { Trophy, Medal, Star, Flame, Award, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { ProgressBar } from "@/components/gamification/ProgressBar";
import { motion } from "framer-motion";

export default function ProgressPage() {
  const badges = [
    { id: 1, title: "Khởi Đầu Tự Tin", desc: "Hoàn thành bài tập đầu tiên", icon: "🌱", unlocked: true },
    { id: 2, title: "Thám Tử Câu Ghép", desc: "Tìm đúng cụm C-V ngay lần đầu", icon: "🔍", unlocked: true },
    { id: 3, title: "Bậc Thầy Quan Hệ Từ", desc: "Nhận biết chính xác cặp Tuy...nhưng", icon: "🔗", unlocked: true },
    { id: 4, title: "Chiến Binh 3 Sao", desc: "Đạt trọn vẹn 3 sao ở một bài khó", icon: "⭐", unlocked: false },
    { id: 5, title: "Siêu Nhí Kiên Trì", desc: "Tự sửa đúng bài sau khi AI gợi ý", icon: "💡", unlocked: true },
    { id: 6, title: "Vô Địch Ngữ Pháp Lớp 5", desc: "Hoàn thành tất cả 12 bài tập", icon: "👑", unlocked: false },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20">
              Bảng Vàng Danh Dự
            </span>
            <h1 className="text-3xl font-black">Thành Tích Của Em</h1>
            <p className="text-amber-100 text-sm max-w-md">
              Mỗi bài tập hoàn thành giúp em củng cố vững chắc kiến thức ngữ pháp và nhận thêm nhiều huy hiệu vinh danh!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <AIMascot mood="celebrate" size="lg" />
          </div>
        </div>
      </motion.div>
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="border-2 border-amber-200 rounded-3xl text-center bg-gradient-to-b from-amber-50/50 to-white shadow-sm">
          <CardContent className="pt-6 flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
              🏆
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Hạng Hiện Tại</p>
              <h3 className="text-2xl font-black text-slate-800">Hạng Bạc 🥈</h3>
            </div>
            <p className="text-xs text-amber-700 font-semibold bg-amber-100/70 px-3 py-1 rounded-full">
              Cần thêm 3 sao để lên Hạng Vàng 🥇
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-blue-200 rounded-3xl text-center bg-gradient-to-b from-blue-50/50 to-white shadow-sm">
          <CardContent className="pt-6 flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
              ⭐
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Tổng Sao Thu Thập</p>
              <h3 className="text-3xl font-black text-slate-800">12</h3>
            </div>
            <p className="text-xs text-blue-700 font-semibold bg-blue-100/70 px-3 py-1 rounded-full">
              Trung bình 2.5 sao / bài
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-2 border-emerald-200 rounded-3xl text-center bg-gradient-to-b from-emerald-50/50 to-white shadow-sm">
          <CardContent className="pt-6 flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl">
              🎯
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Bài Hoàn Thành</p>
              <h3 className="text-3xl font-black text-slate-800">4 / 12</h3>
            </div>
            <p className="text-xs text-emerald-700 font-semibold bg-emerald-100/70 px-3 py-1 rounded-full">
              Hoàn thành 33% toàn khóa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Badges Collection Showcase */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-500" />
            <span>Bộ Sưu Tập Huy Hiệu</span>
          </h2>
          <span className="text-xs font-bold text-slate-500">Đã mở khóa: 4/6</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div 
              key={badge.id}
              className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                badge.unlocked 
                  ? "bg-white border-amber-200 shadow-sm hover:shadow-md" 
                  : "bg-slate-50/80 border-dashed border-slate-300 opacity-60"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                badge.unlocked ? "bg-amber-100/70 shadow-xs" : "bg-slate-200 grayscale"
              }`}>
                {badge.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-slate-800">{badge.title}</h4>
                  {badge.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
