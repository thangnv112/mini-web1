"use client"

import { useState } from "react";
import { ExerciseCard } from "@/components/exercise/ExerciseCard";
import { exercises } from "@/lib/data";
import { Sparkles, Filter, CheckCircle2 } from "lucide-react";
import { sound } from "@/lib/sound";

export default function ExercisesPage() {
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all");

  const filteredExercises = exercises.filter(e => {
    if (filter === "all") return true;
    return e.difficulty === filter;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 rounded-3xl text-white shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kho bài tập tương tác có trợ lý AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Danh Sách Bài Tập Câu Ghép
          </h1>
          <p className="text-blue-100 text-sm max-w-xl">
            Chọn bất kỳ bài tập nào bên dưới. Khi gặp khó khăn, trợ lý ảo AI sẽ tự động phân tích và đưa ra gợi ý giúp em tự tìm ra đáp án!
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <div className="text-xs">
            <p className="font-bold text-white">12 Thử Thách</p>
            <p className="text-blue-200">Đầy đủ SGK Lớp 5</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 mr-2">
          <Filter className="w-4 h-4" />
          <span>Lọc mức độ:</span>
        </div>

        <button
          onClick={() => { sound.playPop(); setFilter("all"); }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
            filter === "all"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          Tất cả ({exercises.length})
        </button>

        <button
          onClick={() => { sound.playPop(); setFilter("easy"); }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            filter === "easy"
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
              : "bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
          }`}
        >
          <span>🌱 Mức Dễ</span>
          <span className="opacity-80">({exercises.filter(e => e.difficulty === "easy").length})</span>
        </button>

        <button
          onClick={() => { sound.playPop(); setFilter("medium"); }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            filter === "medium"
              ? "bg-amber-500 text-white shadow-md shadow-amber-500/25"
              : "bg-white text-amber-700 hover:bg-amber-50 border border-amber-200"
          }`}
        >
          <span>🌟 Mức Trung Bình</span>
          <span className="opacity-80">({exercises.filter(e => e.difficulty === "medium").length})</span>
        </button>

        <button
          onClick={() => { sound.playPop(); setFilter("hard"); }}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            filter === "hard"
              ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
              : "bg-white text-rose-700 hover:bg-rose-50 border border-rose-200"
          }`}
        >
          <span>🔥 Mức Khó</span>
          <span className="opacity-80">({exercises.filter(e => e.difficulty === "hard").length})</span>
        </button>
      </div>

      {/* Exercises Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExercises.map((exercise, index) => (
          <ExerciseCard key={exercise.id} exercise={exercise} index={index} />
        ))}
      </div>
    </div>
  );
}
