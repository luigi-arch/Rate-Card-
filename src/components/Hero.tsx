import { AUDIENCE } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-grid"
    >
      {/* gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[130px]"
        style={{ background: "var(--color-gold)" }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-36 text-center sm:pb-28 sm:pt-44">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {AUDIENCE.tagline}
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display mt-8 text-6xl text-white sm:text-7xl md:text-8xl">
            You bring the headache.
            <br />
            <span className="text-gold">We build the story.</span>
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
              className="rounded-full border border-line-strong px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
            >
              See the formats
            </a>
          </div>
        </Reveal>

        {/* slim stat strip */}
        <Reveal delay={320} className="mt-16 w-full">
          <dl className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 border-t border-line pt-10 sm:gap-x-16">
            {AUDIENCE.headline.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="font-display text-4xl leading-none text-gold sm:text-5xl">
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
