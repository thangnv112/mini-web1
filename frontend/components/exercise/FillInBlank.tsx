"use client"
import { Input } from "@/components/ui/Input";
import { CheckCircle, XCircle } from "lucide-react";

type FillInBlankProps = {
  label: string;
  value: string;
  onChange: (val: string) => void;
  status?: "default" | "correct" | "error";
  disabled?: boolean;
}

export function FillInBlank({ label, value, onChange, status = "default", disabled = false }: FillInBlankProps) {
  const borderStyles = {
    default: "border-slate-300 focus-within:border-pastel-blue",
    correct: "border-green-400 bg-green-50/50 ring-1 ring-green-300",
    error: "border-red-400 bg-red-50/50 ring-1 ring-red-300"
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-semibold text-sm text-slate-600 flex items-center gap-2">
        {label}
        {status === "correct" && <CheckCircle className="w-4 h-4 text-green-500" />}
        {status === "error" && <XCircle className="w-4 h-4 text-red-500" />}
      </label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`text-base ${borderStyles[status]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        placeholder="Nhập câu trả lời..."
        disabled={disabled}
      />
    </div>
  );
}
