import { AUDIENCE } from "@/lib/content";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line bg-grid pt-28 pb-16 sm:pt-36 sm:pb-24"
    >
      {/* gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[120px]"
        style={{ background: "var(--color-gold)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            {AUDIENCE.tagline}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="display max-w-4xl text-[2.6rem] leading-[0.95] text-white sm:text-6xl md:text-7xl">
            You bring the headache.
            <br />
            <span className="text-gold">We build the story.</span>
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            We don’t sell reels and carousels. We sell solutions to marketing
            problems — native content that feels real, earns attention and
            actually changes how people see you.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#headaches"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.03]"
            >
              Find your fix →
            </a>
            <a
              href="#formats"
              className="rounded-full border border-line-strong px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-white"
            >
              See the formats
            </a>
          </div>
        </Reveal>

        {/* headline stats */}
        <Reveal delay={300}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
            {AUDIENCE.headline.map((s) => (
              <div key={s.label} className="bg-ink-2 px-5 py-6">
                <dt className="font-display text-3xl font-extrabold text-gold sm:text-4xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-muted">
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
