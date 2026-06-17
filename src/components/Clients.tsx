"use client";

import { useContent } from "@/context/content";

export default function Clients() {
  const { clients } = useContent();
  const row = [...clients, ...clients];
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
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap rounded-xl border border-white/12 bg-white/[0.04] px-6 py-3.5 font-display text-base font-bold text-white/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
