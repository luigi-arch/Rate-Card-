"use client";

import { useState } from "react";
import { type ContentFormat } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";
import { JourneyHeader } from "./JourneyHeader";
import Reveal from "./Reveal";

export default function Formats() {
  const { recommendedFormatIds, activeFormatId, setActiveFormat, formatEngaged } =
    useSelection();
  const { formats, alwaysIncluded, howItWorks } = useContent();
  const recommended = new Set(recommendedFormatIds);
  const active = formats.find((f) => f.id === activeFormatId) ?? formats[0];

  return (
    <section id="formats" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <JourneyHeader
          step="02"
          title={howItWorks[1].title}
          body="Each format is engineered around one outcome. Pick one to explore — we’ve starred the fit for your headaches."
          done={formatEngaged}
        />

        {/* always included */}
        <Reveal className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-line bg-surface/40 px-6 py-4">
          <span className="eyebrow">Every campaign includes</span>
          {alwaysIncluded.map((item) => (
            <span key={item} className="flex items-center gap-2 text-sm text-muted">
              <span className="text-gold">✓</span>
              {item}
            </span>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-[5fr_7fr]">
          {/* selector list */}
          <Reveal className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0">
            {formats.map((f) => {
              const isActive = f.id === active.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFormat(f.id)}
                  className={`press group flex shrink-0 items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-all lg:shrink ${
                    isActive
                      ? "border-gold bg-gold-soft"
                      : "border-line hover:border-line-strong hover:bg-surface-2"
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={`font-display text-2xl leading-none transition-colors ${
                        isActive ? "text-fg" : "text-muted group-hover:text-fg"
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
                      isActive ? "text-fg" : "text-muted-2"
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
        className="relative h-20 w-auto max-w-[90%] object-contain px-4 sm:h-24"
      />
    );
  }
  return (
    <div className="relative flex flex-col items-center gap-2">
      <span className="display text-center text-5xl text-white/90 sm:text-6xl">
        {tag}
      </span>
      {logo?.startsWith("/formats/") && (
        <span className="rounded-full border border-dashed border-white/20 px-3 py-1 font-mono text-[0.65rem] text-white/40">
          add {logo.replace("/formats/", "")}
        </span>
      )}
    </div>
  );
}

function FeaturePanel({
  format: f,
  recommended,
}: {
  format: ContentFormat;
  recommended: boolean;
}) {
  const { distribution } = useContent();
  const logo = f.logo;

  return (
    <div className="card overflow-hidden">
      {/* visual / logo tile */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#1c1c1f] to-[#0b0b0c] sm:h-52">
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
            <h3 className="font-display text-4xl leading-none text-fg sm:text-5xl">
              {f.name}
            </h3>
            <p className="mt-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
              Builds
              <span className="rounded bg-gold px-2 py-0.5 text-black">
                {f.keyword}
              </span>
            </p>
          </div>
          <div className="shrink-0 text-right">
            <span className="block text-[0.65rem] uppercase tracking-wide text-muted-2">
              From
            </span>
            <span className="font-display text-3xl leading-none text-fg">
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
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold uppercase tracking-wide text-fg">
            What’s included
            <span className="text-lg text-fg transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {f.includes.map((grp) => (
              <div key={grp.group}>
                <p className="text-xs font-bold uppercase tracking-wide text-fg">
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

        {/* distribution (folded in) */}
        <details className="group mt-3 border-t border-line pt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold uppercase tracking-wide text-fg">
            How it’s distributed
            <span className="text-lg text-fg transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {distribution.channels.map((c, i) => (
              <div key={c.title}>
                <p className="font-display text-2xl text-gold/40">0{i + 1}</p>
                <p className="text-sm font-bold text-fg">{c.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 border-l-2 border-gold pl-4 text-sm italic text-muted">
            {distribution.pullQuote}
          </p>
        </details>

        <a
          href="#contact"
          className="press mt-7 block rounded-full bg-gold py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.01]"
        >
          Add to my brief
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
      <dd className="mt-0.5 font-semibold text-fg">{value}</dd>
    </div>
  );
}
