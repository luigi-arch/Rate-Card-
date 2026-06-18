"use client";

import { useContent } from "@/context/content";
import { SectionHeading } from "./Section";
import { PlatformCards, CountStat, StatBar } from "./PlatformStats";
import Placeholder from "./Placeholder";
import Reveal from "./Reveal";

export default function Proof() {
  const { audience, results, clientRating } = useContent();
  return (
    <section id="audience" className="py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The platform"
          title="Real audience. Real results."
          intro="Malta’s largest youth news platform — half the audience under 35, across the feeds your customers actually live in."
        />

        {/* headline reach numbers */}
        <Reveal className="mt-10">
          <StatBar />
        </Reveal>

        {/* platform follower cards */}
        <Reveal className="mt-3">
          <PlatformCards />
        </Reveal>

        {/* age + gender */}
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Reveal className="card p-6">
            <p className="eyebrow mb-5">Age distribution</p>
            <ul className="space-y-3.5">
              {audience.age.map((a) => (
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
              {audience.gender.map((g) => (
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
              <span className="font-display text-lg text-fg">{clientRating}</span>{" "}
              avg. client rating
            </span>
          </span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {results.map((r, i) => {
            const img = r.image;
            const thumb = img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={`${r.client} — ${r.project}`}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <Placeholder
                label={r.client}
                sublabel={r.link ? "watch" : "add in /admin"}
                aspect="video"
                variant="play"
                className="rounded-none border-x-0 border-t-0"
              />
            );
            return (
            <Reveal key={`${r.client}-${i}`} delay={i * 80} className="card hover-lift overflow-hidden">
              {r.link ? (
                <a
                  href={r.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-gold group block overflow-hidden"
                  aria-label={`Watch ${r.client} — ${r.project}`}
                >
                  {thumb}
                </a>
              ) : (
                thumb
              )}
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
            );
          })}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="display text-xl text-fg sm:text-2xl">
            “Content that informs. Stories that connect. Results that speak.”
          </p>
        </Reveal>

        {/* journey CTAs — placed after the audience info so it isn’t skipped */}
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#headaches"
            className="press rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
          >
            Start your brief →
          </a>
          <a
            href="#formats"
            className="press rounded-full border border-fg/20 px-8 py-4 text-sm font-bold uppercase tracking-wide text-fg transition-colors hover:border-fg"
          >
            See the video formats
          </a>
        </Reveal>
      </div>
    </section>
  );
}
