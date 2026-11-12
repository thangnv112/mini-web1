"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/gamification/ProgressBar";
import { AIMascot } from "@/components/ai/AIMascot";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { exercises, exercisesByDifficulty } from "@/lib/data";
import { BookOpen, Star, Trophy, ArrowRight, Sparkles, CheckCircle2, Target } from "lucide-react";
import { sound } from "@/lib/sound";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gia sư AI đã sẵn sàng cùng em học bài!</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Chào mừng em quay trở lại! 👋
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Hôm nay chúng ta tiếp tục luyện phân tích cấu tạo các vế câu ghép nhé! Hãy tích lũy đủ <strong>15 sao</strong> để thăng cấp.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <AIMascot mood="happy" size="lg" />
            <Link href="/student/exercises/ex-6">
              <Button 
                size="lg" 
                onClick={() => sound.playPop()}
                className="rounded-2xl px-6 py-6 font-black bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-lg transition-transform active:scale-95"
              >
                Học tiếp ngay ➜
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
      
      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all rounded-3xl shadow-sm bg-gradient-to-b from-blue-50/50 to-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-md shadow-blue-500/25">
                <BookOpen className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Kho bài tập</p>
                <p className="text-3xl font-black text-slate-800">{exercises.length}</p>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">3 cấp độ phân hóa</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="border-2 border-amber-100 hover:border-amber-300 transition-all rounded-3xl shadow-sm bg-gradient-to-b from-amber-50/50 to-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-white flex items-center justify-center shadow-md shadow-amber-400/25">
                <Star className="w-7 h-7 fill-white" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Sao tích lũy</p>
                <p className="text-3xl font-black text-slate-800">12 ⭐</p>
                <p className="text-xs font-semibold text-amber-600 mt-0.5">Cần 3 sao để lên hạng Bạc</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-2 border-emerald-100 hover:border-emerald-300 transition-all rounded-3xl shadow-sm bg-gradient-to-b from-emerald-50/50 to-white">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/25">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Đã hoàn thành</p>
                <p className="text-3xl font-black text-slate-800">4 / {exercises.length}</p>
                <p className="text-xs font-semibold text-emerald-600 mt-0.5">Đạt tỉ lệ 33%</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Progress & Daily Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Progress Bar Card */}
        <div className="lg:col-span-7">
          <Card className="border-2 border-slate-200/80 rounded-3xl shadow-sm h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Tiến độ chinh phục câu ghép</span>
                </CardTitle>
                <span className="text-xs font-bold text-slate-400">Học kỳ 1</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar current={4} total={exercises.length} />
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600">Đã đạt danh hiệu: <strong>&ldquo;Tập sự ngữ pháp&rdquo;</strong></span>
                <span className="text-indigo-600">Mục tiêu tiếp theo: &ldquo;Thám tử câu ghép&rdquo; 🏅</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Mission Card */}
        <div className="lg:col-span-5">
          <Card className="border-2 border-indigo-100 rounded-3xl shadow-sm bg-gradient-to-br from-indigo-50/50 to-blue-50/30 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-black text-indigo-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Nhiệm vụ hôm nay</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Hoàn thành 1 bài tập câu ghép tương phản</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-indigo-100 shadow-2xs font-semibold text-slate-700">
                <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0" />
                <span>Làm bài không cần trợ giúp mức 3</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Difficulty Breakdown & Quick Navigation */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-800">
            Các chuyên đề bài tập
          </h2>
          <Link href="/student/exercises" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Easy */}
          <Link href="/student/exercises" onClick={() => sound.playPop()}>
            <Card className="border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all rounded-3xl cursor-pointer group bg-gradient-to-b from-emerald-50/40 to-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🌱</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                    Cơ bản
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-emerald-600 transition-colors">
                  Câu ghép nối bằng dấu câu & từ nối đơn
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  {exercisesByDifficulty.easy.length} bài tập (dấu phẩy, từ và, còn)
                </p>
                <div className="flex items-center justify-between text-xs font-bold text-emerald-600">
                  <span>Bắt đầu luyện tập</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Medium */}
          <Link href="/student/exercises" onClick={() => sound.playPop()}>
            <Card className="border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all rounded-3xl cursor-pointer group bg-gradient-to-b from-amber-50/40 to-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🌟</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                    Nâng cao vừa
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-amber-600 transition-colors">
                  Cặp quan hệ từ (Tuy...nhưng, Vì...nên)
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  {exercisesByDifficulty.medium.length} bài tập (nguyên nhân, tương phản, điều kiện)
                </p>
                <div className="flex items-center justify-between text-xs font-bold text-amber-600">
                  <span>Bắt đầu luyện tập</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Hard */}
          <Link href="/student/exercises" onClick={() => sound.playPop()}>
            <Card className="border-2 border-rose-200 hover:border-rose-400 hover:shadow-lg transition-all rounded-3xl cursor-pointer group bg-gradient-to-b from-rose-50/40 to-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">🔥</span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700">
                    Thử thách
                  </span>
                </div>
                <h3 className="font-extrabold text-base text-slate-800 group-hover:text-rose-600 transition-colors">
                  Câu ghép tăng tiến & lựa chọn
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  {exercisesByDifficulty.hard.length} bài tập (không chỉ... mà còn, hoặc... hoặc)
                </p>
                <div className="flex items-center justify-between text-xs font-bold text-rose-600">
                  <span>Bắt đầu luyện tập</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
