"use client";

import { useContent } from "@/context/content";
import type { Client } from "@/lib/content";

export default function Clients() {
  const { clients } = useContent();
  // Be tolerant of legacy data (plain strings) as well as { name, logo }.
  const list: Client[] = (clients as unknown[]).map((c) =>
    typeof c === "string" ? { name: c } : (c as Client)
  );
  const row = [...list, ...list];

  return (
    <section className="bg-ink py-14 text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow eyebrow-gold mb-8 text-center">
          Trusted by leading brands
        </p>
      </div>
      <div className="marquee relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="marquee-track gap-3 px-3">
          {row.map((c, i) =>
            c.logo ? (
              <span
                key={`${c.name}-${i}`}
                className="flex h-14 shrink-0 items-center justify-center rounded-xl bg-white px-6"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  className="max-h-8 w-auto max-w-[150px] object-contain"
                />
              </span>
            ) : (
              <span
                key={`${c.name}-${i}`}
                className="flex h-14 items-center whitespace-nowrap rounded-xl border border-white/12 bg-white/[0.04] px-6 font-display text-base font-bold text-white/70"
              >
                {c.name}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
