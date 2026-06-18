"use client";

import { useState } from "react";
import { type ContentFormat } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";
import BrainAnimation from "./BrainAnimation";
import HeroHeadline from "./HeroHeadline";
import Reveal from "./Reveal";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/** "Clarity, Authenticity & Trust" */
function joinList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}

export default function Hero() {
  const { hero, formats } = useContent();
  const { selected, recommendedFormatIds, clear, progress } = useSelection();
  const [revealed, setRevealed] = useState(false);

  function startOver() {
    clear();
    setRevealed(false);
  }

  const recommended = recommendedFormatIds
    .map((id) => formats.find((f) => f.id === id))
    .filter((f): f is ContentFormat => Boolean(f));
  const diagnosed = recommended.length > 0;
  const keywords = [...new Set(recommended.map((f) => f.keyword))];

  // Journey stepper — previews the flow and lights up with progress.
  const steps = [
    { label: "Headaches", done: selected.length > 0, href: "top" },
    { label: "Diagnosis", done: revealed, href: "top" },
    { label: "Formats", done: progress.step3, href: "formats" },
    { label: "Brief", done: false, href: "contact" },
  ];
  const activeStep = steps.findIndex((s) => !s.done);

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-grid"
    >
      {/* soft gold warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-20 h-96 w-96 rounded-full opacity-[0.16] blur-[150px]"
        style={{ background: "var(--color-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full opacity-[0.12] blur-[150px]"
        style={{ background: "var(--color-gold)" }}
      />

      <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-32 text-center sm:px-8 sm:pt-36">
        <Reveal>
          <HeroHeadline text={hero.line1} />
        </Reveal>

        {/* journey stepper — previews the flow + tracks progress */}
        <Reveal delay={60}>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-line bg-surface/80 px-2 py-1.5 text-xs backdrop-blur">
            {steps.map((s, i) => {
              const isActive = i === activeStep;
              return (
                <span key={s.label} className="flex items-center">
                  {i > 0 && (
                    <span className="px-1 text-muted-2" aria-hidden>
                      ›
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => scrollTo(s.href)}
                    className={`press flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold transition-colors ${
                      s.done
                        ? "bg-gold text-black"
                        : isActive
                        ? "text-fg ring-1 ring-gold"
                        : "text-muted-2 hover:text-fg"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-full text-[0.6rem] ${
                        s.done
                          ? "bg-black/15 text-black"
                          : isActive
                          ? "bg-gold text-black"
                          : "border border-line-strong text-muted-2"
                      }`}
                    >
                      {s.done ? "✓" : i + 1}
                    </span>
                    {s.label}
                  </button>
                </span>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.sub}
          </p>
        </Reveal>

        {/* the brain is the focal point — symptoms radiate around it */}
        <Reveal delay={200} className="mt-12">
          <BrainAnimation active={selected.length > 0} />
        </Reveal>

        {/* diagnosis flow: select → confirm → reveal */}
        <Reveal delay={120} className="mx-auto mt-10 max-w-xl">
          {selected.length === 0 ? (
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-2">
              ↑ Tap the headaches that sound like you
            </p>
          ) : !revealed ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-muted">
                <span className="font-bold text-fg">
                  {selected.length} headache{selected.length > 1 ? "s" : ""}
                </span>{" "}
                selected — add as many as apply, then get your diagnosis.
              </p>
              <button
                onClick={() => setRevealed(true)}
                disabled={!diagnosed}
                className="press rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03] disabled:opacity-50"
              >
                Diagnose me →
              </button>
            </div>
          ) : (
            <div className="card overflow-hidden text-left">
              <div className="bg-ink px-6 py-5 text-white sm:px-8">
                <p className="eyebrow eyebrow-gold">Diagnosis complete</p>
                <p className="mt-2 font-display text-3xl leading-none sm:text-4xl">
                  {keywords.length > 1 ? "You need a mix of " : "You need "}
                  <span className="text-gold">{joinList(keywords)}</span>.
                </p>
                <p className="mt-3 text-sm text-white/60">
                  Based on the {selected.length} headache
                  {selected.length > 1 ? "s" : ""} you picked.
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <p className="eyebrow !text-muted-2">Recommended prescription</p>
                <ul className="mt-3 space-y-2">
                  {recommended.map((f) => (
                    <li key={f.id} className="flex items-center gap-2.5 text-fg">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-xs font-bold text-black">
                        ✓
                      </span>
                      <span className="font-medium">{f.name}</span>
                      <span className="text-sm text-muted-2">— {f.keyword}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => scrollTo("formats")}
                    className="press rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
                  >
                    Get my prescription →
                  </button>
                  <button
                    onClick={() => setRevealed(false)}
                    className="text-xs font-semibold uppercase tracking-wide text-muted-2 hover:text-fg"
                  >
                    ← Edit selection
                  </button>
                  <button
                    onClick={startOver}
                    className="text-xs font-semibold uppercase tracking-wide text-muted-2 hover:text-fg"
                  >
                    Start over
                  </button>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
