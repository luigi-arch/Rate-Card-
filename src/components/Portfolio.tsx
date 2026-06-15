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

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.url} delay={(i % 3) * 60}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-5 py-4 transition-colors hover:border-gold/50"
              >
                <span>
                  <span className="block text-[0.65rem] uppercase tracking-wide text-gold">
                    {FORMAT_NAME[item.formatId]}
                  </span>
                  <span className="mt-1 block font-medium text-white">
                    {item.client}
                  </span>
                </span>
                <span className="text-muted-2 transition-colors group-hover:text-gold">
                  ↗
                </span>
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
          : "border-line-strong text-muted hover:border-white hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
