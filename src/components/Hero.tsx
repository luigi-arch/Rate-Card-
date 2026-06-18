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
  const { hero } = useContent();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-white bg-grid"
    >
      {/* gold glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full opacity-25 blur-[140px]"
        style={{ background: "var(--color-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full opacity-20 blur-[140px]"
        style={{ background: "var(--color-gold)" }}
      />

      <div className="relative mx-auto max-w-[88rem] px-5 pb-16 pt-32 text-center sm:px-10 sm:pt-36 lg:px-16">
        <h1 className="display text-6xl text-white sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9rem] leading-[0.88]">
          <span className="block animate-clip-up">{hero.line1}</span>
          <span
            className="relative mt-1 inline-block animate-clip-up"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="relative z-10">{hero.line2}</span>
            <span
              aria-hidden
              className="animate-underline absolute inset-x-[-6px] bottom-1 z-0 h-[38%] -skew-x-6 bg-gold"
            />
          </span>
        </h1>

        {/* interactive headache brain — the hook + selector, with woven-in prompt */}
        <Reveal delay={160} className="mt-14">
          <BrainAnimation dark />
          <p className="mx-auto mt-2 max-w-md text-sm italic text-white/55">
            Tap the thoughts that sound like you — we’ll prescribe the fix.
          </p>
        </Reveal>

        {/* the shift — what agencies sell → what you actually want */}
        <Reveal delay={120} className="mt-16">
          <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur sm:flex-row sm:items-center sm:gap-6">
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/40">
                What agencies sell
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {OLD_WAY.map((x) => (
                  <span
                    key={x}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/50 line-through decoration-white/30"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
            <span className="hidden text-3xl text-gold sm:block">→</span>
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-gold">
                What you actually want
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {NEW_WAY.map((x) => (
                  <span
                    key={x}
                    className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-white"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* the pitch + CTAs — beneath the shift for a cleaner top */}
        <Reveal delay={120}>
          <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-white/70 lg:text-xl">
            {hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollTo("formats")}
              className="press rounded-full bg-gold px-9 py-4 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
            >
              Start your brief →
            </button>
            <button
              onClick={() => scrollTo("about")}
              className="press rounded-full border border-white/25 px-9 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
            >
              Meet the platform ↓
            </button>
          </div>
        </Reveal>

        {/* platform-native stat strip (dark) */}
        <Reveal delay={200} className="mx-auto mt-12 max-w-5xl">
          <StatBar dark />
        </Reveal>
      </div>
    </section>
  );
}
