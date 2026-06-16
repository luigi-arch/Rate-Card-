import { AUDIENCE, RESULTS, CLIENT_RATING } from "@/lib/content";
import { SectionHeading } from "./Section";
import { PlatformCards, CountStat } from "./PlatformStats";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";

export default function Proof() {
  return (
    <section id="audience" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The platform"
          title="Real audience. Real results."
          intro="Malta’s largest youth news platform — half the audience under 35, across the feeds your customers actually live in."
        />

        {/* platform follower cards */}
        <Reveal className="mt-10">
          <PlatformCards />
        </Reveal>

        {/* age + gender */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Reveal className="card p-6">
            <p className="eyebrow mb-5">Age distribution</p>
            <ul className="space-y-3.5">
              {AUDIENCE.age.map((a) => (
                <li key={a.range}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-muted">{a.range}</span>
                    <span className="font-semibold text-fg">{a.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${a.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={90} className="card flex flex-col p-6">
            <p className="eyebrow mb-5">Gender split</p>
            <div className="flex flex-1 flex-col justify-center gap-6">
              {AUDIENCE.gender.map((g) => (
                <div key={g.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">{g.label}</span>
                    <span className="font-display text-3xl text-fg">{g.pct}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full bg-gold/80"
                      style={{ width: `${g.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* campaign results */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <h3 className="display text-3xl text-fg sm:text-4xl">
            Campaigns that delivered
          </h3>
          <span className="flex items-center gap-2">
            <span className="text-gold">★★★★★</span>
            <span className="text-sm text-muted">
              <span className="font-display text-lg text-fg">{CLIENT_RATING}</span>{" "}
              avg. client rating
            </span>
          </span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {RESULTS.map((r, i) => (
            <Reveal key={r.client} delay={i * 80} className="card hover-lift overflow-hidden">
              <Placeholder
                label={r.client}
                sublabel={`public/work/${r.client.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.jpg`}
                aspect="video"
                variant="play"
                className="rounded-none border-x-0 border-t-0"
              />
              <div className="p-6">
                <p className="eyebrow !text-muted-2">{r.client}</p>
                <h4 className="mt-1 font-display text-2xl text-fg">{r.project}</h4>
                <dl className="mt-5 grid grid-cols-3 gap-3">
                  {r.stats.map((s) => (
                    <div key={s.label}>
                      <CountStat
                        value={s.value}
                        className="font-display text-3xl text-fg"
                      />
                      <dd className="mt-1 text-[0.65rem] uppercase leading-tight tracking-wide text-muted">
                        {s.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="display text-xl text-fg sm:text-2xl">
            “Content that informs. Stories that connect. Results that speak.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
