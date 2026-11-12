"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export function Confetti({ trigger }: { trigger: boolean }) {
  useEffect(() => {
    if (trigger) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#60A5FA', '#FB923C', '#FBBF24', '#34D399']
      });
    }
  }, [trigger]);

  return null;
}
