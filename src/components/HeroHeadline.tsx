"use client";

import { useEffect, useState } from "react";

/** Split "…the headache." → ["…the", "headache."] */
function splitLast(text: string): [string, string] {
  const parts = text.trim().split(" ");
  const last = parts.pop() ?? "";
  return [parts.join(" "), last];
}

const H1 =
  "display mx-auto max-w-4xl text-5xl leading-[0.92] text-fg sm:text-6xl md:text-7xl";

function KineticWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const animated = words.length > 1;
  useEffect(() => {
    if (!animated) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 1900);
    return () => clearInterval(id);
  }, [animated, words.length]);
  return (
    <span
      key={i}
      className="text-gold"
      style={animated ? { animation: "word-swap 1.9s ease-in-out" } : undefined}
    >
      {words[i % words.length]}
    </span>
  );
}

export default function HeroHeadline({
  text,
  cycle,
}: {
  text: string;
  cycle?: string[];
}) {
  const [lead, last] = splitLast(text);
  // Cycle through the provided words; ensure the headline's own last word leads
  // and de-dupe so it never repeats awkwardly.
  const words = (cycle && cycle.length ? cycle : [last]).filter(Boolean);
  const ordered = words[0] === last ? words : [last, ...words.filter((w) => w !== last)];

  return (
    <h1 className={H1}>
      {lead} <KineticWord words={ordered} />
    </h1>
  );
}
