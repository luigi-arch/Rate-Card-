"use client";

import { useEffect, useState } from "react";

export type HeadlineVariant = "sleepless" | "coffee" | "worry" | "kinetic";

const GOLD = "var(--color-gold)";

/** Split "…team awake?" → ["…team", "awake?"] */
function splitLast(text: string): [string, string] {
  const parts = text.trim().split(" ");
  const last = parts.pop() ?? "";
  return [parts.join(" "), last];
}

const H1 =
  "display mx-auto max-w-4xl text-5xl leading-[0.92] text-fg sm:text-6xl md:text-7xl";

/* ---- motif icons ---- */
function Moon() {
  return (
    <span className="relative inline-flex h-12 w-16 items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-9 w-9" fill="none" aria-hidden>
        <path
          d="M21 12.8A8.5 8.5 0 1 1 11.2 3.2 6.6 6.6 0 0 0 21 12.8Z"
          stroke={GOLD}
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={GOLD}
          fillOpacity="0.12"
        />
      </svg>
      {["0s", "0.5s", "1s"].map((d, i) => (
        <span
          key={d}
          className="animate-z absolute font-display text-gold"
          style={{
            right: `${2 + i * 8}px`,
            top: `${2 - i * 2}px`,
            fontSize: `${10 + i * 4}px`,
            animationDelay: d,
          }}
          aria-hidden
        >
          z
        </span>
      ))}
    </span>
  );
}

function Coffee() {
  return (
    <span className="relative inline-flex h-12 w-12 items-center justify-center">
      <svg viewBox="0 0 32 32" className="h-10 w-10" fill="none" aria-hidden>
        {/* steam */}
        <g stroke={GOLD} strokeWidth="1.6" strokeLinecap="round">
          <path className="animate-steam" d="M12 9c2-2-2-3 0-5" style={{ animationDelay: "0s" }} />
          <path className="animate-steam" d="M20 9c2-2-2-3 0-5" style={{ animationDelay: "0.8s" }} />
        </g>
        {/* cup */}
        <path
          d="M7 13h16v6a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z"
          stroke="var(--color-fg)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          fill={GOLD}
          fillOpacity="0.12"
        />
        <path d="M23 15h2.5a2.5 2.5 0 0 1 0 5H23" stroke="var(--color-fg)" strokeWidth="1.8" />
      </svg>
    </span>
  );
}

function Worry() {
  return (
    <span className="inline-flex h-12 w-20 items-center justify-center">
      <svg viewBox="0 0 64 28" className="h-10 w-24" fill="none" aria-hidden>
        <path
          className="animate-untangle"
          d="M4 14c4-8 10 6 14-2s8 10 12 0 9 8 13 1"
          stroke={GOLD}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M44 13l4 9 4-9" stroke="var(--color-fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
      </svg>
    </span>
  );
}

const CYCLE = ["awake?", "up at night?", "stuck?", "unseen?"];

function KineticWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % CYCLE.length), 1900);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      key={i}
      className="text-gold"
      style={{ animation: "word-swap 1.9s ease-in-out" }}
    >
      {CYCLE[i]}
    </span>
  );
}

export default function HeroHeadline({
  variant,
  text,
}: {
  variant: HeadlineVariant;
  text: string;
}) {
  const [lead, last] = splitLast(text);

  if (variant === "kinetic") {
    return (
      <h1 className={H1}>
        {lead} <KineticWord />
      </h1>
    );
  }

  const Icon = variant === "sleepless" ? Moon : variant === "coffee" ? Coffee : Worry;
  return (
    <div className="flex flex-col items-center">
      <Icon />
      <h1 className={`${H1} mt-2`}>
        {lead} <span className="text-gold">{last}</span>
      </h1>
    </div>
  );
}
