"use client";

import { useEffect, useRef, useState } from "react";
import {
  FORMATS,
  FORMAT_LOGOS,
  ALWAYS_INCLUDED,
  type FormatId,
} from "@/lib/content";
import { useSelection } from "@/context/selection";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Formats() {
  const { recommendedFormatIds } = useSelection();
  const recommended = new Set(recommendedFormatIds);

  const [activeId, setActiveId] = useState<FormatId>("explained");
  const touched = useRef(false);

  // Until the visitor manually picks a format, follow their top recommendation.
  useEffect(() => {
    if (!touched.current && recommendedFormatIds.length > 0) {
      setActiveId(recommendedFormatIds[0]);
    }
  }, [recommendedFormatIds]);

  const active = FORMATS.find((f) => f.id === activeId) ?? FORMATS[0];

  function select(id: FormatId) {
    touched.current = true;
    setActiveId(id);
  }

  return (
    <section id="formats" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our formats"
          title="Six formats. Six problems solved."
          intro="Native, organic and built to feel real — never like an ad. Pick a format to explore it."
        />

        {/* always included */}
        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-line bg-surface/40 px-6 py-4">
          <span className="eyebrow">Every format includes</span>
          {ALWAYS_INCLUDED.map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-muted">
              <span className="text-gold">✓</span>
              {item}
            </span>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[5fr_7fr]">
          {/* selector list */}
          <Reveal className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
            {FORMATS.map((f) => {
              const isActive = f.id === active.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => select(f.id)}
                  className={`group flex shrink-0 items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all lg:shrink ${
                    isActive
                      ? "border-gold bg-gold-soft"
                      : "border-line hover:border-line-strong"
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={`font-display text-2xl leading-none transition-colors ${
                        isActive ? "text-white" : "text-muted group-hover:text-white"
                      }`}
                    >
                      {f.name.replace("Interviewed by SideStreet", "Interviews")}
                    </span>
                    {recommended.has(f.id) && (
                      <span className="text-xs text-gold" title="Recommended for you">
                        ★
                      </span>
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap text-sm font-bold ${
                      isActive ? "text-gold" : "text-muted-2"
                    }`}
                  >
                    {f.priceFrom ? `€${f.priceFrom.toLocaleString()}` : "Custom"}
                  </span>
                </button>
              );
            })}
          </Reveal>

          {/* feature panel */}
          <Reveal delay={80} key={active.id}>
            <FeaturePanel
              format={active}
              recommended={recommended.has(active.id)}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LogoTile({ logo, tag }: { logo?: string; tag: string }) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={`${tag} logo`}
        onError={() => setFailed(true)}
        className="relative max-h-24 w-auto object-contain"
      />
    );
  }
  return (
    <span className="display relative text-center text-5xl text-white/90 sm:text-6xl">
      {tag}
    </span>
  );
}

function FeaturePanel({
  format: f,
  recommended,
}: {
  format: (typeof FORMATS)[number];
  recommended: boolean;
}) {
  const logo = FORMAT_LOGOS[f.id];

  return (
    <div className="card overflow-hidden">
      {/* visual / logo tile */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br from-surface-2 to-ink-2 sm:h-52">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-25 blur-3xl"
          style={{ background: "var(--color-gold)" }}
        />
        <LogoTile logo={logo} tag={f.tag} />
        <span className="absolute left-5 top-5 rounded-md bg-gold px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-black">
          {f.tag}
        </span>
        {recommended && (
          <span className="absolute right-5 top-5 rounded-full border border-gold/50 bg-ink/70 px-3 py-1 text-xs font-semibold text-gold">
            ★ For you
          </span>
        )}
      </div>

      <div className="p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-4xl leading-none text-white sm:text-5xl">
              {f.name}
            </h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-gold">
              Builds {f.keyword}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="block text-[0.65rem] uppercase tracking-wide text-muted-2">
              From
            </span>
            <span className="font-display text-3xl leading-none text-gold">
              {f.priceFrom ? `€${f.priceFrom.toLocaleString()}` : "Custom"}
            </span>
          </div>
        </div>

        <p className="mt-5 text-base leading-relaxed text-muted">{f.oneLiner}</p>

        {/* meta */}
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 text-sm sm:grid-cols-4">
          <Meta label="Best for" value={f.bestFor} />
          <Meta label="Length" value={f.length} />
          <Meta label="Avg. reach" value={f.reach} />
          <Meta label="Ideal for" value={f.idealFor} />
        </dl>

        {/* solves */}
        <div className="mt-6">
          <p className="eyebrow mb-3 !text-muted-2">Solves</p>
          <div className="flex flex-wrap gap-2">
            {f.solves.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm italic text-muted"
              >
                “{s}”
              </span>
            ))}
          </div>
        </div>

        {/* includes (collapsed) */}
        <details className="group mt-6 border-t border-line pt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold uppercase tracking-wide text-white">
            What’s included
            <span className="text-lg text-gold transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {f.includes.map((grp) => (
              <div key={grp.group}>
                <p className="text-xs font-bold uppercase tracking-wide text-gold">
                  {grp.group}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {grp.items.map((it) => (
                    <li key={it} className="text-sm leading-snug text-muted">
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
          className="mt-7 block rounded-full bg-gold py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.01]"
        >
          Brief us on this
        </a>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.65rem] uppercase tracking-wide text-muted-2">
        {label}
      </dt>
      <dd className="mt-0.5 font-semibold text-white">{value}</dd>
    </div>
  );
}
