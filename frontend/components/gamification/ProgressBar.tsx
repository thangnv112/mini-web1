"use client"

import { Progress } from "@/components/ui/Progress";

export function ProgressBar({ current, total }: { current: number, total: number }) {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1 text-sm font-medium text-slate-600">
        <span>Tiến độ</span>
        <span>{current}/{total}</span>
      </div>
      <Progress value={percentage} className="h-3" />
    </div>
  );
}
