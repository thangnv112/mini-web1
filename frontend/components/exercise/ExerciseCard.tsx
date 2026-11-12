"use client"

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Exercise } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const difficultyConfig = {
    easy: { label: "Dễ", color: "bg-green-100 text-green-700 border-green-300", icon: "🌱" },
    medium: { label: "Trung bình", color: "bg-yellow-100 text-yellow-700 border-yellow-300", icon: "🌟" },
    hard: { label: "Khó", color: "bg-red-100 text-red-700 border-red-300", icon: "🔥" },
  };

  const config = difficultyConfig[exercise.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/student/exercises/${exercise.id}`}>
        <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer border-2 border-transparent hover:border-pastel-blue/50 group h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                {config.icon} {config.label}
              </span>
              <span className="text-sm text-slate-400">#{index + 1}</span>
            </div>
            <CardTitle className="text-lg mt-2">{exercise.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 text-sm mb-4 italic line-clamp-2">&ldquo;{exercise.sentence}&rdquo;</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Câu ghép</span>
              <span className="text-pastel-blue group-hover:translate-x-1 transition-transform flex items-center gap-1 text-sm font-medium">
                Làm bài <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
