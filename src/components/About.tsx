"use client";

import { useContent } from "@/context/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function About() {
  const { about } = useContent();
  return (
    <section id="about" className="scroll-mt-20 border-b border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Who we are" title={about.title} intro={about.body} />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
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
