"use client";

import { useState } from "react";
import { PORTFOLIO, FORMATS, type FormatId } from "@/lib/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

const FORMAT_NAME: Record<FormatId, string> = Object.fromEntries(
  FORMATS.map((f) => [f.id, f.tag])
) as Record<FormatId, string>;

// only show filters for formats that actually have portfolio items
const FILTERS = FORMATS.filter((f) =>
  PORTFOLIO.some((p) => p.formatId === f.id)
);

export default function Portfolio() {
  const [active, setActive] = useState<FormatId | "all">("all");

  const items =
    active === "all"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.formatId === active);

  return (
    <section id="work" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Real stories. Real people. Real impact."
          intro="A snapshot of recent work across formats — for government, finance, culture, retail and purpose-driven brands."
        />

        {/* filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          <FilterButton
            active={active === "all"}
            onClick={() => setActive("all")}
          >
            All
          </FilterButton>
          {FILTERS.map((f) => (
            <FilterButton
              key={f.id}
              active={active === f.id}
              onClick={() => setActive(f.id)}
            >
              {f.tag}
            </FilterButton>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.url} delay={(i % 4) * 50}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-gold/50"
              >
                {/* reel thumbnail placeholder (9:16) */}
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gradient-to-br from-[#1c1c1f] to-[#0b0b0c]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl"
                    style={{ background: "var(--color-gold)" }}
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ink/50 text-gold transition-transform group-hover:scale-110">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="absolute left-2.5 top-2.5 rounded bg-gold px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-black">
                    {FORMAT_NAME[item.formatId]}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 px-3.5 py-3">
                  <span className="truncate text-sm font-medium text-fg">
                    {item.client}
                  </span>
                  <span className="shrink-0 text-muted-2 transition-colors group-hover:text-gold">
                    ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-gold bg-gold text-black"
          : "border-line-strong text-muted hover:border-fg hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
