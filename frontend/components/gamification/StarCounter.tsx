import { Star } from "lucide-react";

export function StarCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-2 bg-pastel-yellow/20 px-4 py-2 rounded-full border border-pastel-yellow">
      <Star className="text-pastel-yellow fill-pastel-yellow w-6 h-6" />
      <span className="font-bold text-lg text-slate-700">{count}</span>
    </div>
  );
}
