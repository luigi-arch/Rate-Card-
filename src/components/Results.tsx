import { RESULTS, CLIENT_RATING } from "@/lib/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Results() {
  return (
    <section className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Campaign results"
            title="Real campaigns. Real impact."
          />
          <Reveal className="flex items-center gap-3">
            <span className="text-gold">★★★★★</span>
            <span className="text-sm text-muted">
              <span className="font-display text-lg font-extrabold text-white">
                {CLIENT_RATING}
              </span>{" "}
              average client rating
            </span>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {RESULTS.map((r, i) => (
            <Reveal key={r.client} delay={i * 90} className="card p-7">
              <p className="eyebrow !text-muted-2">{r.client}</p>
              <h3 className="mt-2 font-display text-xl font-bold text-white">
                {r.project}
              </h3>
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {r.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-2xl font-extrabold text-gold">
                      {s.value}
                    </dt>
                    <dd className="mt-1 text-[0.7rem] uppercase leading-tight tracking-wide text-muted">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="display text-xl text-white sm:text-2xl">
            “Content that informs. Stories that connect. Results that speak.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
