"use client";

import { type ContentFormat } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";
import BrainAnimation from "./BrainAnimation";
import Reveal from "./Reveal";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { hero, formats } = useContent();
  const { selected, recommendedFormatIds, clear } = useSelection();

  const recommended = recommendedFormatIds
    .map((id) => formats.find((f) => f.id === id))
    .filter((f): f is ContentFormat => Boolean(f));
  const diagnosed = recommended.length > 0;
  const keyword = recommended[0]?.keyword ?? "";

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
          <h1 className="display mx-auto max-w-4xl text-5xl leading-[0.92] text-fg sm:text-6xl md:text-7xl">
            {hero.line1}
          </h1>
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

        {/* live diagnosis + prescription */}
        <Reveal delay={120} className="mx-auto mt-10 max-w-xl">
          {diagnosed ? (
            <div className="card overflow-hidden text-left">
              <div className="bg-ink px-6 py-5 text-white sm:px-8">
                <p className="eyebrow eyebrow-gold">Diagnosis complete</p>
                <p className="mt-2 font-display text-3xl leading-none sm:text-4xl">
                  You need <span className="text-gold">{keyword}</span>.
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
                    onClick={clear}
                    className="text-xs font-semibold uppercase tracking-wide text-muted-2 hover:text-fg"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-2">
              ↑ Tap a headache to get your diagnosis
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
