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
      className="relative overflow-hidden border-b border-line bg-grid"
    >
      {/* soft gold warmth */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-20 h-96 w-96 rounded-full opacity-[0.18] blur-[150px]"
        style={{ background: "var(--color-gold)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full opacity-[0.14] blur-[150px]"
        style={{ background: "var(--color-gold)" }}
      />

      <div className="relative mx-auto max-w-[88rem] px-5 pb-16 pt-32 text-center sm:px-10 sm:pt-36 lg:px-16">
        {/* stylised hero statement */}
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.34em] text-muted-2 sm:text-sm">
            This is
          </p>
          <h1 className="display mt-3 text-fg">
            <span className="block animate-clip-up text-6xl leading-[0.86] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
              Not your <span className="italic text-gold">typical</span>
            </span>
            <span
              className="relative mt-1 inline-block animate-clip-up text-6xl leading-[0.86] sm:text-7xl md:text-8xl lg:text-[8.5rem]"
              style={{ animationDelay: "0.12s" }}
            >
              <span className="relative z-10">rate card.</span>
              <span
                aria-hidden
                className="animate-underline absolute inset-x-[-6px] bottom-1 z-0 h-[32%] -skew-x-6 bg-gold"
              />
            </span>
          </h1>
        </Reveal>

        {/* interactive headache brain — the hook + selector */}
        <Reveal delay={160} className="mt-14">
          <p className="mb-8 text-2xl font-bold text-fg sm:text-3xl">
            Tap the <span className="text-gold">headaches</span> that sound like you
            <span className="ml-1 inline-block">↓</span>
          </p>
          <BrainAnimation />
        </Reveal>

        {/* the shift — what agencies sell → what you actually want */}
        <Reveal delay={120} className="mt-16">
          <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-4 rounded-2xl border border-line bg-surface/60 p-6 text-left sm:flex-row sm:items-center sm:gap-6">
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-2">
                What agencies sell
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {OLD_WAY.map((x) => (
                  <span
                    key={x}
                    className="rounded-full bg-paper-2 px-3 py-1 text-xs text-muted line-through decoration-muted-2/60"
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
                    className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-fg"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* the pitch + CTAs */}
        <Reveal delay={120}>
          <p className="mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-muted lg:text-xl">
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
              className="press rounded-full border border-fg/20 px-9 py-4 text-sm font-bold uppercase tracking-wide text-fg transition-colors hover:border-fg"
            >
              Meet the platform ↓
            </button>
          </div>
        </Reveal>

        {/* platform-native stat strip */}
        <Reveal delay={200} className="mx-auto mt-12 max-w-5xl">
          <StatBar />
        </Reveal>
      </div>
    </section>
  );
}
