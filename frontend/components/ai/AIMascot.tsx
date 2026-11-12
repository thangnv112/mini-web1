"use client"

import React from "react";
import { motion } from "framer-motion";

export type MascotMood = "idle" | "thinking" | "happy" | "hint" | "celebrate";

interface AIMascotProps {
  mood?: MascotMood;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AIMascot({ mood = "idle", size = "md", className = "" }: AIMascotProps) {
  const sizeMap = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      {/* Glow aura */}
      <motion.div
        animate={{
          scale: mood === "celebrate" ? [1, 1.25, 1] : [1, 1.08, 1],
          opacity: mood === "celebrate" ? [0.4, 0.8, 0.4] : [0.2, 0.4, 0.2],
        }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-300 to-amber-200 blur-lg"
      />

      {/* Mascot Body */}
      <motion.div
        animate={
          mood === "celebrate"
            ? { y: [0, -12, 0, -6, 0], rotate: [0, -6, 6, -3, 0] }
            : mood === "thinking"
            ? { rotate: [0, -4, 4, 0], y: [0, -2, 0] }
            : mood === "hint"
            ? { scale: [1, 1.05, 1], y: [0, -4, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: mood === "celebrate" ? 1.2 : mood === "thinking" ? 2.5 : 3,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Antenna */}
          <path
            d="M60 28 L60 14"
            stroke="#6366F1"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <motion.circle
            animate={{
              scale: mood === "thinking" ? [1, 1.5, 1] : [1, 1.2, 1],
              fill: mood === "hint" ? "#F59E0B" : mood === "happy" ? "#10B981" : "#6366F1"
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            cx="60"
            cy="10"
            r="6"
          />

          {/* Ears / Head accessories */}
          <path d="M26 42 Q18 28 32 30 Z" fill="#818CF8" />
          <path d="M94 42 Q102 28 88 30 Z" fill="#818CF8" />

          {/* Head & Body Capsule */}
          <rect
            x="24"
            y="26"
            width="72"
            height="70"
            rx="30"
            fill="url(#mascotGrad)"
            stroke="#C7D2FE"
            strokeWidth="3"
          />

          {/* Screen Visor */}
          <rect
            x="32"
            y="36"
            width="56"
            height="34"
            rx="16"
            fill="#1E1B4B"
          />

          {/* Eyes */}
          {mood === "happy" || mood === "celebrate" ? (
            <g stroke="#38BDF8" strokeWidth="3.5" fill="none" strokeLinecap="round">
              <path d="M42 54 Q48 46 54 54" />
              <path d="M66 54 Q72 46 78 54" />
            </g>
          ) : mood === "thinking" ? (
            <g fill="#38BDF8">
              <circle cx="48" cy="48" r="4.5" />
              <circle cx="72" cy="48" r="4.5" />
              <motion.circle
                animate={{ cx: [47, 49, 47], cy: [47, 49, 47] }}
                transition={{ repeat: Infinity, duration: 1 }}
                cx="49"
                cy="47"
                r="1.8"
                fill="#FFFFFF"
              />
              <motion.circle
                animate={{ cx: [71, 73, 71], cy: [47, 49, 47] }}
                transition={{ repeat: Infinity, duration: 1 }}
                cx="73"
                cy="47"
                r="1.8"
                fill="#FFFFFF"
              />
            </g>
          ) : mood === "hint" ? (
            <g fill="#FBBF24">
              <circle cx="48" cy="52" r="5" />
              <circle cx="72" cy="52" r="5" />
              <circle cx="50" cy="50" r="2" fill="#FFFFFF" />
              <circle cx="74" cy="50" r="2" fill="#FFFFFF" />
            </g>
          ) : (
            <g fill="#38BDF8">
              <circle cx="48" cy="52" r="4.5" />
              <circle cx="72" cy="52" r="4.5" />
              <circle cx="49.5" cy="50.5" r="1.8" fill="#FFFFFF" />
              <circle cx="73.5" cy="50.5" r="1.8" fill="#FFFFFF" />
            </g>
          )}

          {/* Cheeks */}
          <circle cx="38" cy="62" r="3" fill="#FDA4AF" opacity="0.8" />
          <circle cx="82" cy="62" r="3" fill="#FDA4AF" opacity="0.8" />

          {/* Mouth */}
          {mood === "celebrate" || mood === "happy" ? (
            <path
              d="M54 62 Q60 68 66 62"
              stroke="#F43F5E"
              strokeWidth="2.5"
              fill="#FFE4E6"
              strokeLinecap="round"
            />
          ) : mood === "hint" ? (
            <ellipse cx="60" cy="63" rx="3" ry="2" fill="#FBBF24" />
          ) : (
            <path
              d="M56 62 Q60 65 64 62"
              stroke="#93C5FD"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* Belly Badge */}
          <rect x="46" y="76" width="28" height="14" rx="7" fill="#EEF2FF" />
          <path
            d="M52 83 Q57 80 60 83 Q63 80 68 83"
            stroke="#6366F1"
            strokeWidth="1.8"
            fill="none"
          />

          {/* Hands */}
          <motion.ellipse
            animate={
              mood === "celebrate"
                ? { cy: [82, 70, 82], cx: [20, 22, 20] }
                : { y: [0, -2, 0] }
            }
            transition={{ repeat: Infinity, duration: 1.2 }}
            cx="22"
            cy="78"
            rx="5"
            ry="7"
            fill="#818CF8"
          />
          <motion.ellipse
            animate={
              mood === "celebrate"
                ? { cy: [82, 70, 82], cx: [100, 98, 100] }
                : { y: [0, -2, 0] }
            }
            transition={{ repeat: Infinity, duration: 1.2 }}
            cx="98"
            cy="78"
            rx="5"
            ry="7"
            fill="#818CF8"
          />

          <defs>
            <linearGradient id="mascotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#EEF2FF" />
              <stop offset="100%" stopColor="#E0E7FF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}
