"use client";

import { AUDIENCE, HEADACHES } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";
import { StatBar } from "./PlatformStats";
import Reveal from "./Reveal";

const OLD_WAY = ["1 reel", "1 carousel", "5 stories", "1 shoot day"];
const NEW_WAY = [
  "Understanding",
  "Relatability",
  "Relevance",
  "Trust",
  "Community",
];
const TEASER_IDS = ["understand", "corporate", "impact"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { toggle, isSelected } = useSelection();
  const { asset, text } = useContent();
  const teasers = HEADACHES.filter((h) => TEASER_IDS.includes(h.id));
  const heroVideo = asset("hero.video");
  const heroImage = asset("hero.image");

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-grid"
    >
      <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-32 text-center sm:pt-40">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-muted shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {text("tagline", AUDIENCE.tagline)}
          </span>
        </Reveal>

        <h1 className="display mt-7 text-6xl text-fg sm:text-7xl md:text-8xl">
          <span className="block animate-clip-up">
            {text("hero.line1", "You bring the headache.")}
          </span>
          <span
            className="relative mt-1 inline-block animate-clip-up"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="relative z-10">
              {text("hero.line2", "We build the story.")}
            </span>
            <span
              aria-hidden
              className="animate-underline absolute inset-x-[-4px] bottom-1 z-0 h-[38%] -skew-x-6 bg-gold"
            />
          </span>
        </h1>

        <Reveal delay={120}>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted">
            {text(
              "hero.sub",
              "This isn’t a list of deliverables. It’s a rate card built around your problem — pick the headache, we’ll prescribe the fix."
            )}
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollTo("headaches")}
              className="press rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
            >
              Start your brief →
            </button>
            <button
              onClick={() => scrollTo("formats")}
              className="press rounded-full border border-fg/20 px-8 py-4 text-sm font-bold uppercase tracking-wide text-fg transition-colors hover:border-fg"
            >
              See the formats
            </button>
          </div>
        </Reveal>

        {/* live teaser chips — seed the journey from the hero */}
        <Reveal delay={280}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-2">
              Sound familiar?
            </span>
            {teasers.map((h) => {
              const active = isSelected(h.id);
              return (
                <button
                  key={h.id}
                  onClick={() => {
                    if (!active) toggle(h.id);
                    scrollTo("headaches");
                  }}
                  className={`press rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "border-gold bg-gold text-black"
                      : "border-line-strong text-muted hover:border-fg hover:text-fg"
                  }`}
                >
                  “{h.label}”
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* showreel — CMS media with placeholder fallback */}
        <Reveal delay={320} className="mt-12">
          <div className="relative mx-auto flex aspect-video w-full max-w-3xl items-center justify-center overflow-hidden rounded-2xl bg-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
            {heroVideo ? (
              <video
                src={heroVideo}
                poster={heroImage}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroImage}
                alt="SideStreet showreel"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-3xl"
                  style={{ background: "var(--color-gold)" }}
                />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold text-black">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="absolute bottom-4 left-5 font-mono text-[0.68rem] text-white/50">
                  Add a showreel in /admin
                </span>
              </>
            )}
          </div>
        </Reveal>

        {/* platform-native stat bar */}
        <Reveal delay={360} className="mt-14">
          <StatBar />
        </Reveal>

        {/* the shift — folded-in Approach */}
        <Reveal delay={120} className="mt-12">
          <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-3 rounded-2xl border border-line bg-surface/60 p-5 text-left sm:flex-row sm:items-center">
            <div className="flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted-2">
                What agencies sell
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {OLD_WAY.map((x) => (
                  <span
                    key={x}
                    className="rounded-full bg-paper-2 px-2.5 py-1 text-xs text-muted line-through decoration-muted-2/60"
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
                    className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-fg"
                  >
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
