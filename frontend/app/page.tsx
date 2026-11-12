"use client"

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AIMascot } from "@/components/ai/AIMascot";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, BookOpen, Star, Trophy, MessageSquareText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50/30 to-amber-50/20 text-slate-800 relative overflow-hidden bg-dot-pattern">
      {/* Top Banner Badge */}
      <header className="max-w-6xl mx-auto px-6 pt-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <span className="text-2xl">📚</span>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Tiếng Việt 5
            </span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
              GenAI Tutor
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link href="/student/exercises" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Bài tập
          </Link>
          <Link href="/student/dashboard">
            <Button className="rounded-full shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold px-6">
              Đăng nhập học sinh
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-100 shadow-sm text-sm font-semibold text-indigo-700">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Hệ thống bài tập thông minh với GenAI</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
              Luyện Phân Tích <br />
              <span className="gradient-text">Câu Ghép Lớp 5</span> <br />
              Cùng Gia Sư AI
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Không còn cảm giác sợ sai hay chép phạt! Trợ lý ảo AI đóng vai <strong>&ldquo;Người gác cổng sư phạm&rdquo;</strong>, nhận diện lỗi cụ thể và dẫn dắt từng bước để các em tự hiểu và tự sửa.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/student/exercises/ex-6">
                <Button size="lg" className="rounded-2xl px-8 py-6 text-lg font-bold shadow-lg shadow-blue-500/25 bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white flex items-center gap-3">
                  <span>Trải nghiệm câu mẫu</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/student/dashboard">
                <Button size="lg" variant="outline" className="rounded-2xl px-8 py-6 text-lg font-bold border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700">
                  Xem bảng điều khiển
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>3 mức Scaffolding sư phạm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span>Chuẩn chương trình Lớp 5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Phản hồi tức thì</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Card Preview with Mascot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Background floating glow blobs */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-br from-indigo-300/40 to-pink-300/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gradient-to-tr from-amber-300/40 to-sky-300/40 rounded-full blur-3xl pointer-events-none" />

            {/* Interactive Preview Card */}
            <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/80 space-y-5">
              {/* Mascot Header */}
              <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl border border-blue-100/60">
                <AIMascot mood="happy" size="md" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-800 text-sm">Gia sư AI Lớp 5</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    &ldquo;Thử tài phân tích câu này nhé!&rdquo;
                  </p>
                </div>
              </div>

              {/* Sample Sentence */}
              <div className="p-4 bg-amber-50/80 border border-amber-200/70 rounded-2xl text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
                  Đề bài ví dụ
                </span>
                <p className="font-semibold text-slate-800 text-base italic">
                  &ldquo;Tuy trời mưa rất lớn nhưng các bạn học sinh vẫn đến lớp đúng giờ.&rdquo;
                </p>
              </div>

              {/* Interactive Sample Fields */}
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Chủ ngữ vế 1:</span>
                  <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    trời ✓
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500">Quan hệ từ:</span>
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200">
                    Tuy... nhưng... ✓
                  </span>
                </div>
              </div>

              {/* AI Guidance Simulation */}
              <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl text-white text-xs space-y-1.5 shadow-md">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <MessageSquareText className="w-4 h-4" />
                  <span>AI Gợi ý Scaffolding Mức 1:</span>
                </div>
                <p className="text-blue-50 leading-relaxed">
                  &ldquo;Em đã tìm chủ ngữ vế 1 rất tốt! Còn từ &apos;rất lớn&apos; đi kèm với &apos;mưa&apos; sẽ làm rõ nghĩa gì nhỉ? Thử tìm cả cụm vị ngữ nhé!&rdquo;
                </p>
              </div>

              <Link href="/student/exercises/ex-6" className="block">
                <Button className="w-full rounded-xl py-3 font-bold bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-md transition-all">
                  🎮 Thử giải câu này ngay ➜
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 3 Steps Workflow Feature Section */}
        <section className="mt-28">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              Quy Trình 3 Bước Thông Minh
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Khác Biệt Với Cách Học Truyền Thống
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Thay vì báo &ldquo;Sai rồi!&rdquo; cộc lốc, hệ thống kích hoạt cơ chế đồng hành sư phạm giúp học sinh tự tư duy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
            {/* Step 1 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all relative group">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-black mb-5 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Học Sinh Làm Bài</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Học sinh nhập hoặc chọn chủ ngữ, vị ngữ từng vế và cách nối trên giao diện tương tác trực quan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-indigo-200/80 shadow-lg hover:shadow-xl transition-all relative group ring-2 ring-indigo-500/20">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-2xl font-black mb-5 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Phân Tích & Gợi Ý</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                GenAI phát hiện lỗi cụ thể (thiếu vị ngữ, nhầm cặp từ) và đưa ra gợi ý phân hóa theo 3 cấp độ (Scaffolding).
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all relative group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-black mb-5 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tự Sửa & Hoàn Thành</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dựa vào gợi ý dẫn dắt, học sinh tự suy nghĩ và sửa lại đáp án đúng, được tặng sao ⭐ và chuyển bài.
              </p>
            </div>
          </div>
        </section>

        {/* Exercises Showcase */}
        <section className="mt-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black">
              12 Bài Tập Câu Ghép Đa Dạng
            </h2>
            <p className="text-blue-100 text-base leading-relaxed">
              Bao quát đầy đủ các dạng: quan hệ nguyên nhân - kết quả, tương phản, điều kiện, tăng tiến, lựa chọn theo chuẩn SGK Tiếng Việt 5.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/student/exercises">
                <Button size="lg" className="rounded-2xl px-10 py-6 text-lg font-bold bg-white text-blue-700 hover:bg-slate-100 shadow-lg">
                  Khám phá toàn bộ bài tập 🚀
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/60 backdrop-blur-sm py-8 text-center text-xs text-slate-500">
        <p>Đề tài: Thiết kế hệ thống bài tập tương tác thông minh hỗ trợ học sinh lớp 5 tự học nội dung về câu dưới sự hỗ trợ của GenAI</p>
      </footer>
    </div>
  );
}
