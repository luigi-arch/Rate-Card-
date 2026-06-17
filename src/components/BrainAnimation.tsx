"use client";

import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";

/**
 * Interactive "headache brain" on a light background: a pulsing brain with the
 * real client headaches as clickable nodes arranged around it. Selecting a node
 * toggles it in the journey. Pure CSS motion, gated by prefers-reduced-motion.
 */

const DURATIONS = ["5.5s", "6.2s", "5.8s", "6.6s", "6s", "5.3s", "6.4s", "5.6s", "6.1s", "5.9s"];
const DELAYS = ["0s", "0.6s", "1.1s", "0.3s", "1.4s", "0.9s", "0.2s", "1.2s", "0.5s", "0.8s"];

function Node({
  label,
  active,
  onClick,
  index,
  align = "left",
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  index: number;
  align?: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={
        {
          "--dur": DURATIONS[index % DURATIONS.length],
          "--delay": DELAYS[index % DELAYS.length],
        } as React.CSSProperties
      }
      className={`animate-thought press max-w-[15rem] rounded-xl border px-3.5 py-2 text-sm font-medium shadow-sm transition-colors ${
        align === "right" ? "text-right" : "text-left"
      } ${
        active
          ? "border-gold bg-gold text-black"
          : "border-line-strong bg-surface text-muted hover:border-fg hover:text-fg"
      }`}
    >
      “{label}”
    </button>
  );
}

export default function BrainAnimation() {
  const { toggle, isSelected } = useSelection();
  const { headaches: HEADACHES } = useContent();
  const left = HEADACHES.slice(0, Math.ceil(HEADACHES.length / 2));
  const right = HEADACHES.slice(Math.ceil(HEADACHES.length / 2));

  return (
    <div className="relative select-none">
      <div className="items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* left column (desktop) */}
        <div className="hidden flex-col items-end gap-3 lg:flex">
          {left.map((h) => (
            <Node
              key={h.id}
              label={h.label}
              active={isSelected(h.id)}
              onClick={() => toggle(h.id)}
              index={HEADACHES.indexOf(h)}
              align="right"
            />
          ))}
        </div>

        {/* brain */}
        <div className="relative mx-auto flex h-[240px] w-[240px] items-center justify-center sm:h-[300px] sm:w-[300px]">
          <div
            aria-hidden
            className="animate-brain-glow pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 rounded-full opacity-50 blur-3xl sm:h-56 sm:w-56"
            style={{ background: "var(--color-gold)" }}
          />
          <div className="animate-brain-throb relative">
            <svg
              width="240"
              height="200"
              viewBox="0 0 240 200"
              fill="none"
              aria-hidden
              className="h-auto w-[180px] sm:w-[230px]"
            >
              <g
                stroke="var(--color-fg)"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M118 32 C 96 18, 60 22, 50 44 C 30 48, 22 72, 34 88 C 20 100, 26 124, 44 132 C 46 154, 72 166, 94 158 C 106 170, 118 166, 118 150 Z" />
                <path d="M122 32 C 144 18, 180 22, 190 44 C 210 48, 218 72, 206 88 C 220 100, 214 124, 196 132 C 194 154, 168 166, 146 158 C 134 170, 122 166, 122 150 Z" />
              </g>
              <g
                stroke="var(--color-gold)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M72 60 C 86 64, 80 80, 94 84" />
                <path d="M56 98 C 72 98, 70 112, 88 114" />
                <path d="M76 132 C 88 126, 94 136, 106 132" />
                <path d="M168 60 C 154 64, 160 80, 146 84" />
                <path d="M184 98 C 168 98, 170 112, 152 114" />
                <path d="M164 132 C 152 126, 146 136, 134 132" />
              </g>
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
              index={HEADACHES.indexOf(h)}
              align="left"
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
            index={i}
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
