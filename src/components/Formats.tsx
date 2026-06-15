"use client";

import { FORMATS, ALWAYS_INCLUDED } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Formats() {
  const { recommendedFormatIds } = useSelection();
  const recommended = new Set(recommendedFormatIds);

  return (
    <section id="formats" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our formats"
          title="Six formats. Six problems solved."
          intro="Every format is native, organic and built to feel real — not like an ad. Each one is engineered around a single outcome."
        />

        {/* always included */}
        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-line bg-surface/50 px-6 py-4">
          <span className="eyebrow">Every format includes</span>
          {ALWAYS_INCLUDED.map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-muted">
              <span className="text-gold">✓</span>
              {item}
            </span>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {FORMATS.map((f, i) => {
            const isRec = recommended.has(f.id);
            return (
              <Reveal
                key={f.id}
                delay={(i % 2) * 80}
                as="article"
              >
                <div
                  id={`format-${f.id}`}
                  className={`card flex h-full scroll-mt-24 flex-col p-7 transition-shadow ${
                    isRec ? "border-gold/60 shadow-glow" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block rounded-md bg-gold px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-black">
                        {f.tag}
                      </span>
                      <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                        {f.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="block text-[0.65rem] uppercase tracking-wide text-muted-2">
                        From
                      </span>
                      <span className="font-display text-xl font-extrabold text-gold">
                        {f.priceFrom ? `€${f.priceFrom.toLocaleString()}` : "Custom"}
                      </span>
                    </div>
                  </div>

                  {isRec && (
                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 bg-gold-soft px-3 py-1 text-xs font-semibold text-gold">
                      ★ Recommended for you
                    </span>
                  )}

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {f.description}
                  </p>

                  {/* keyword */}
                  <div className="mt-5 flex items-center gap-2 text-sm">
                    <span className="text-muted-2">Builds</span>
                    <span className="font-display text-lg font-extrabold text-white">
                      {f.keyword}
                    </span>
                  </div>

                  {/* meta */}
                  <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-line py-5 text-sm">
                    <Meta label="Best for" value={f.bestFor} />
                    <Meta label="Length" value={f.length} />
                    <Meta label="Avg. reach" value={f.reach} />
                    <Meta label="Ideal for" value={f.idealFor} />
                  </dl>

                  {/* solves */}
                  <div className="mt-5">
                    <p className="eyebrow mb-3 !text-muted-2">Solves</p>
                    <ul className="space-y-1.5">
                      {f.solves.slice(0, 3).map((s) => (
                        <li
                          key={s}
                          className="text-sm italic leading-snug text-muted"
                        >
                          “{s}”
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* whats included */}
                  <details className="group mt-5 border-t border-line pt-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-white">
                      What’s included
                      <span className="text-gold transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="mt-4 space-y-4">
                      {f.includes.map((grp) => (
                        <div key={grp.group}>
                          <p className="text-xs font-semibold uppercase tracking-wide text-gold">
                            {grp.group}
                          </p>
                          <ul className="mt-1.5 space-y-1">
                            {grp.items.map((it) => (
                              <li
                                key={it}
                                className="flex gap-2 text-sm text-muted"
                              >
                                <span className="text-muted-2">·</span>
                                {it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </details>

                  <a
                    href="#contact"
                    className="mt-6 block rounded-full border border-line-strong py-3 text-center text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
                  >
                    Brief us on {f.name.replace("SideStreet ", "").replace("Interviewed by SideStreet", "interviews")}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-wide text-muted-2">
        {label}
      </dt>
      <dd className="mt-0.5 font-medium text-white">{value}</dd>
    </div>
  );
}
