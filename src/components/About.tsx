"use client";

import { useContent } from "@/context/content";
import Reveal from "./Reveal";

export default function About() {
  const { about, teamPhotos } = useContent();
  const photos = teamPhotos.slice(0, 2);

  return (
    <section id="about" className="scroll-mt-20 border-b border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          {/* text */}
          <Reveal>
            <p className="eyebrow eyebrow-gold">Who we are</p>
            <h2 className="display mt-3 text-4xl text-fg sm:text-5xl">
              {about.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {about.body}
            </p>
          </Reveal>

          {/* photo collage */}
          {photos.length > 0 && (
            <Reveal delay={120} className="relative mx-auto w-full max-w-sm">
              <div className="flex gap-4">
                {photos.map((p, i) => (
                  <div
                    key={i}
                    className={`relative flex-1 overflow-hidden rounded-2xl border border-line shadow-lg ${
                      i === 1 ? "mt-8" : ""
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.url}
                      alt={p.alt || "The SideStreet crew"}
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 -z-10 h-28 w-28 rounded-full bg-gold/30 blur-2xl"
              />
            </Reveal>
          )}
        </div>

        {/* pillars */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {about.pillars.map((p, i) => (
            <Reveal key={p.number} delay={i * 90} className="card p-7">
              <p className="font-display text-4xl text-gold/50">{p.number}</p>
              <h3 className="mt-3 font-display text-2xl text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
