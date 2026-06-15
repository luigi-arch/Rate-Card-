import { AUDIENCE } from "@/lib/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Audience() {
  return (
    <section id="audience" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our audience"
          title="A young, engaged audience that actually listens."
          intro="Half of Malta under 35 follows the conversation here. When your story lands on SideStreet, it lands native — in the feed, not beside it."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* channels */}
          <Reveal className="card p-7">
            <p className="eyebrow mb-6">Across platforms</p>
            <ul className="space-y-5">
              {AUDIENCE.channels.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between">
                  <span className="text-muted">{c.name}</span>
                  <span className="font-display text-2xl font-extrabold text-fg">
                    {c.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-sm text-muted">
                <span className="font-bold text-gold">50%</span> of the audience
                is under 35.
              </p>
            </div>
          </Reveal>

          {/* age distribution */}
          <Reveal delay={90} className="card p-7">
            <p className="eyebrow mb-6">Age distribution</p>
            <ul className="space-y-4">
              {AUDIENCE.age.map((a) => (
                <li key={a.range}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
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

          {/* gender */}
          <Reveal delay={180} className="card p-7">
            <p className="eyebrow mb-6">Gender split</p>
            <div className="flex h-full flex-col justify-center gap-6">
              {AUDIENCE.gender.map((g) => (
                <div key={g.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">{g.label}</span>
                    <span className="font-display text-3xl font-extrabold text-fg">
                      {g.pct}%
                    </span>
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
      </div>
    </section>
  );
}
