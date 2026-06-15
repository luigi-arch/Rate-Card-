import { AUDIENCE } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-grid"
    >
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-36 text-center sm:pb-28 sm:pt-44">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-muted shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {AUDIENCE.tagline}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display mt-8 text-6xl text-fg sm:text-7xl md:text-8xl">
            You bring the headache.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">We build the story.</span>
              <span
                aria-hidden
                className="absolute inset-x-[-4px] bottom-1 z-0 h-[38%] -skew-x-6 bg-gold"
              />
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            We don’t sell reels. We sell solutions — native content that feels
            real and changes how people see you.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#headaches"
              className="rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
            >
              Find your fix →
            </a>
            <a
              href="#formats"
              className="rounded-full border border-fg/20 px-8 py-4 text-sm font-bold uppercase tracking-wide text-fg transition-colors hover:border-fg"
            >
              See the formats
            </a>
          </div>
        </Reveal>

        {/* showreel — black feature on white */}
        <Reveal delay={300} className="mt-14 w-full max-w-3xl">
          <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
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
              public/hero.mp4 or public/hero.jpg
            </span>
          </div>
        </Reveal>

        {/* stat strip */}
        <Reveal delay={360} className="mt-14 w-full">
          <dl className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-line pt-10 sm:gap-x-16">
            {AUDIENCE.headline.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="font-display text-4xl leading-none text-fg sm:text-5xl">
                  {s.value}
                </dt>
                <dd className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
