"use client";

import { useContent } from "@/context/content";
import { SectionHeading } from "./Section";

export default function BehindScenes() {
  const { teamPhotos } = useContent();
  if (!teamPhotos.length) return null;

  return (
    <section
      id="team"
      className="scroll-mt-20 border-t border-line bg-ink py-14 text-white sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          theme="dark"
          eyebrow="Behind the scenes"
          title="The faces behind SideStreet."
          intro="Real people, real shoots. The crew that turns your headache into content people actually want to watch."
        />
      </div>

      {/* horizontal filmstrip */}
      <div className="snap-row mt-10 flex gap-4 overflow-x-auto px-5 pb-4 sm:px-8">
        {teamPhotos.map((p, i) => (
          <div
            key={i}
            className="group relative w-[300px] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:w-[360px]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.url}
              alt={p.alt || "The SideStreet crew on a shoot"}
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
