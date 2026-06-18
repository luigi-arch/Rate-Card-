"use client";

import { useContent } from "@/context/content";
import { StatBar } from "./PlatformStats";
import BrainAnimation from "./BrainAnimation";
import Reveal from "./Reveal";

const OLD_WAY = ["1 reel", "1 carousel", "5 stories", "1 shoot day"];
const NEW_WAY = ["Understanding", "Relatability", "Relevance", "Trust", "Community"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { hero, audience } = useContent();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-white bg-grid"
    >
      {/* gold glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full opacity-25 blur-[120px]"
        style={{ background: "var(--color-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--color-gold)" }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-32 text-center sm:px-8 sm:pt-36">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {audience.tagline}
          </span>
        </Reveal>

        <h1 className="display mt-7 text-6xl text-white sm:text-7xl md:text-8xl">
          <span className="block animate-clip-up">{hero.line1}</span>
          <span
            className="relative mt-1 inline-block animate-clip-up"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="relative z-10">{hero.line2}</span>
            <span
              aria-hidden
              className="animate-underline absolute inset-x-[-4px] bottom-1 z-0 h-[38%] -skew-x-6 bg-gold"
            />
          </span>
        </h1>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            {hero.sub}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollTo("formats")}
              className="press rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
            >
              Start your brief →
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="press rounded-full border border-white/25 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
            >
              Meet the platform ↓
            </button>
          </div>
        </Reveal>

        {/* interactive headache brain — the hook + selector */}
        <Reveal delay={280} className="mt-12">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Tap a headache — we’ll prescribe the fix
          </p>
          <BrainAnimation dark />
        </Reveal>

        {/* the shift — what agencies sell → what you actually want */}
        <Reveal delay={120} className="mt-14">
          <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left backdrop-blur sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/40">
                What agencies sell
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {OLD_WAY.map((x) => (
                  <span
                    key={x}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/50 line-through decoration-white/30"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <span className="hidden text-2xl text-gold sm:block">→</span>
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold">
                What you actually want
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {NEW_WAY.map((x) => (
                  <span
                    key={x}
                    className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-white"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* platform-native stat strip (dark) */}
        <Reveal delay={200} className="mt-10">
          <StatBar dark />
        </Reveal>
      </div>
    </section>
  );
}
