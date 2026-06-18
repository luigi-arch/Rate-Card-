"use client";

import { useEffect, useState } from "react";

/**
 * The word "typical" — rendered anything but. Cycles through a set of
 * generic/system font families (no external fonts to load) for a kinetic
 * "not typical" gag. Gated by prefers-reduced-motion.
 */
const FONTS = [
  "var(--font-display), sans-serif", // brand Bebas (initial / reduced-motion)
  "Georgia, 'Times New Roman', serif",
  "'Courier New', monospace",
  "'Comic Sans MS', 'Comic Sans', cursive",
  "Impact, Haettenschweiler, sans-serif",
  "'Brush Script MT', cursive",
  "'Trebuchet MS', sans-serif",
  "Papyrus, fantasy",
  "Garamond, 'Times New Roman', serif",
  "Verdana, Geneva, sans-serif",
];

export default function TypicalWord({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % FONTS.length), 460);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className={`italic text-gold ${className}`}
      style={{ fontFamily: FONTS[i] }}
    >
      typical
    </span>
  );
}
