"use client";

import { useEffect, useState } from "react";

/** Split "…team awake?" → ["…team", "awake?"] */
function splitLast(text: string): [string, string] {
  const parts = text.trim().split(" ");
  const last = parts.pop() ?? "";
  return [parts.join(" "), last];
}

const H1 =
  "display mx-auto max-w-4xl text-5xl leading-[0.92] text-fg sm:text-6xl md:text-7xl";

const CYCLE = ["awake?", "up at night?", "stuck?", "unseen?"];

function KineticWord({ first }: { first: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % CYCLE.length), 1900);
    return () => clearInterval(id);
  }, []);
  // start on the headline's own last word, then cycle
  const word = i === 0 ? first : CYCLE[i % CYCLE.length];
  return (
    <span key={i} className="text-gold" style={{ animation: "word-swap 1.9s ease-in-out" }}>
      {word}
    </span>
  );
}

export default function HeroHeadline({ text }: { text: string }) {
  const [lead, last] = splitLast(text);
  return (
    <h1 className={H1}>
      {lead} <KineticWord first={last} />
    </h1>
  );
}
