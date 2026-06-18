"use client";

import { useState } from "react";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";

/**
 * Interactive "headache brain": a detailed brain whose regions light up as the
 * matching headache is hovered or selected. Each headache maps to a node on the
 * brain (by index); selecting it fires the region + a connecting synapse. Pure
 * CSS motion, gated by prefers-reduced-motion.
 */

const DURATIONS = ["5.5s", "6.2s", "5.8s", "6.6s", "6s", "5.3s", "6.4s", "5.6s", "6.1s", "5.9s"];
const DELAYS = ["0s", "0.6s", "1.1s", "0.3s", "1.4s", "0.9s", "0.2s", "1.2s", "0.5s", "0.8s"];

// Region nodes on the 240x200 brain viewBox — first half left hemisphere,
// second half right, so the left/right pill columns map to their side.
const NODES: { x: number; y: number }[] = [
  { x: 74, y: 58 },
  { x: 58, y: 90 },
  { x: 88, y: 82 },
  { x: 68, y: 116 },
  { x: 98, y: 112 },
  { x: 86, y: 142 },
  { x: 166, y: 58 },
  { x: 182, y: 90 },
  { x: 152, y: 82 },
  { x: 172, y: 116 },
  { x: 142, y: 112 },
  { x: 154, y: 142 },
];

// Faint synapse links between nearby nodes (indices into NODES).
const LINKS: [number, number][] = [
  [0, 2], [2, 4], [1, 3], [3, 5], [2, 1], [4, 5],
  [6, 8], [8, 10], [7, 9], [9, 11], [8, 7], [10, 11],
];

function Node({
  label,
  active,
  onClick,
  onHover,
  index,
  align = "left",
  dark = false,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  onHover: (on: boolean) => void;
  index: number;
  align?: "left" | "right";
  dark?: boolean;
}) {
  const inactive = dark
    ? "border-white/20 bg-white/5 text-white/70 hover:border-white hover:text-white hover:bg-white/10"
    : "border-line-strong bg-surface text-muted hover:border-fg hover:text-fg";
  const tail = active
    ? "border-gold bg-gold"
    : dark
    ? "border-white/25 bg-white/10"
    : "border-line-strong bg-surface";
  const tailSide = align === "right" ? "right-4" : "left-4";
  const tailSide2 = align === "right" ? "right-2" : "left-2";
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      aria-pressed={active}
      style={
        {
          "--dur": DURATIONS[index % DURATIONS.length],
          "--delay": DELAYS[index % DELAYS.length],
        } as React.CSSProperties
      }
      className={`animate-thought press relative max-w-[15rem] rounded-[1.4rem] border px-4 py-2.5 text-center text-sm font-medium shadow-sm transition-colors ${
        active ? "border-gold bg-gold text-black" : inactive
      }`}
    >
      “{label}”
      <span aria-hidden className={`absolute -bottom-1.5 h-2.5 w-2.5 rounded-full border ${tail} ${tailSide}`} />
      <span aria-hidden className={`absolute -bottom-3.5 h-1.5 w-1.5 rounded-full border ${tail} ${tailSide2}`} />
    </button>
  );
}

export default function BrainAnimation({
  dark = false,
  active = false,
}: {
  dark?: boolean;
  active?: boolean;
}) {
  const { toggle, isSelected } = useSelection();
  const { headaches: HEADACHES } = useContent();
  const [hovered, setHovered] = useState<string | null>(null);

  const half = Math.ceil(HEADACHES.length / 2);
  const left = HEADACHES.slice(0, half);
  const right = HEADACHES.slice(half);

  const outline = dark ? "#ffffff" : "var(--color-fg)";
  const lit = (i: number) => {
    const h = HEADACHES[i];
    return h ? isSelected(h.id) || hovered === h.id : false;
  };

  return (
    <div className="relative select-none">
      <div className="items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
        {/* left column (desktop) */}
        <div className="hidden flex-col items-end gap-3 lg:flex">
          {left.map((h) => (
            <Node
              key={h.id}
              label={h.label}
              active={isSelected(h.id)}
              onClick={() => toggle(h.id)}
              onHover={(on) => setHovered(on ? h.id : null)}
              index={HEADACHES.indexOf(h)}
              align="right"
              dark={dark}
            />
          ))}
        </div>

        {/* brain */}
        <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center sm:h-[320px] sm:w-[320px]">
          <div
            aria-hidden
            className={`animate-brain-glow pointer-events-none absolute left-1/2 top-1/2 rounded-full blur-3xl transition-all duration-500 ${
              active ? "h-60 w-60 opacity-90 sm:h-72 sm:w-72" : "h-44 w-44 opacity-50 sm:h-56 sm:w-56"
            }`}
            style={{ background: "var(--color-gold)" }}
          />
          <div className="animate-brain-throb relative">
            <svg
              width="240"
              height="200"
              viewBox="0 0 240 200"
              fill="none"
              aria-hidden
              className="h-auto w-[210px] sm:w-[260px]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* outline — two hemispheres + stem */}
              <g stroke={outline} strokeWidth="3.5" fill="none">
                <path d="M118 30 C 96 16, 58 20, 48 44 C 27 48, 19 74, 33 90 C 18 102, 24 128, 44 134 C 46 158, 74 170, 96 160 C 108 172, 118 168, 118 150 Z" />
                <path d="M122 30 C 144 16, 182 20, 192 44 C 213 48, 221 74, 207 90 C 222 102, 216 128, 196 134 C 194 158, 166 170, 144 160 C 132 172, 122 168, 122 150 Z" />
                <path d="M112 160 C 110 176, 130 176, 128 160" />
              </g>

              {/* gyri detail */}
              <g stroke={outline} strokeWidth="1.6" fill="none" opacity="0.45">
                <path d="M70 50 C 84 56, 78 70, 92 74 C 84 84, 96 92, 90 104" />
                <path d="M52 78 C 68 78, 66 92, 84 94 C 76 104, 86 116, 78 126" />
                <path d="M64 118 C 78 112, 86 122, 100 120" />
                <path d="M170 50 C 156 56, 162 70, 148 74 C 156 84, 144 92, 150 104" />
                <path d="M188 78 C 172 78, 174 92, 156 94 C 164 104, 154 116, 162 126" />
                <path d="M176 118 C 162 112, 154 122, 140 120" />
                <path d="M120 38 L120 150" strokeWidth="1.2" opacity="0.6" />
              </g>

              {/* synapse links */}
              <g stroke="var(--color-gold)" strokeWidth="1.4" opacity="0.35">
                {LINKS.map(([a, b], i) => (
                  <line key={i} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
                ))}
              </g>

              {/* region nodes — light up per headache */}
              {NODES.map((n, i) => {
                const on = lit(i);
                return (
                  <g key={i}>
                    {on && (
                      <circle className="animate-node" cx={n.x} cy={n.y} r="8" fill="var(--color-gold)" />
                    )}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={on ? 4.5 : 2.6}
                      fill={on ? "var(--color-gold)" : outline}
                      opacity={on ? 1 : dark ? 0.4 : 0.3}
                      style={{ transition: "r 0.3s ease, opacity 0.3s ease" }}
                    />
                  </g>
                );
              })}
            </svg>

            <span
              className="animate-spark absolute -left-2 -top-1 text-gold"
              style={{ "--dur": "2.2s" } as React.CSSProperties}
              aria-hidden
            >
              <Spark />
            </span>
            <span
              className="animate-spark absolute -right-1 top-2 text-gold"
              style={{ "--dur": "2.8s", "--delay": "0.5s" } as React.CSSProperties}
              aria-hidden
            >
              <Spark />
            </span>
          </div>
        </div>

        {/* right column (desktop) */}
        <div className="hidden flex-col items-start gap-3 lg:flex">
          {right.map((h) => (
            <Node
              key={h.id}
              label={h.label}
              active={isSelected(h.id)}
              onClick={() => toggle(h.id)}
              onHover={(on) => setHovered(on ? h.id : null)}
              index={HEADACHES.indexOf(h)}
              align="left"
              dark={dark}
            />
          ))}
        </div>
      </div>

      {/* mobile / tablet: clickable cloud */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 lg:hidden">
        {HEADACHES.map((h, i) => (
          <Node
            key={h.id}
            label={h.label}
            active={isSelected(h.id)}
            onClick={() => toggle(h.id)}
            onHover={(on) => setHovered(on ? h.id : null)}
            index={i}
            dark={dark}
          />
        ))}
      </div>
    </div>
  );
}

function Spark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2 L4 14 h6 l-1 8 9-12 h-6 z" />
    </svg>
  );
}
