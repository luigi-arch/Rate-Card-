"use client";

import { useContent } from "@/context/content";
import { useSelection } from "@/context/selection";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Packages() {
  const { packages } = useContent();
  const { selectedPackage, setSelectedPackage } = useSelection();

  function choose(name: string) {
    setSelectedPackage(selectedPackage === name ? null : name);
  }

  return (
    <section id="packages" className="scroll-mt-20 border-t border-line bg-surface/40 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Prefer a bundle?"
          title="Or pick a ready-made package."
          intro="Don’t want to build your own? These bundle our most popular formats at a discounted rate — an easy alternative to the brief above. Pick one to add it to your enquiry."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((p, i) => {
            const isChosen = selectedPackage === p.name;
            return (
              <Reveal
                key={p.name}
                delay={i * 80}
                className={`hover-lift relative flex flex-col rounded-2xl border bg-white p-6 ${
                  isChosen
                    ? "border-gold ring-2 ring-gold"
                    : p.popular
                    ? "border-gold/50 shadow-[0_24px_60px_-20px_rgba(255,182,0,0.35)]"
                    : "border-zinc-200 shadow-sm"
                }`}
              >
                {p.popular && !isChosen && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-black">
                    Most popular
                  </span>
                )}
                {isChosen && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-black">
                    ✓ In your brief
                  </span>
                )}

                {p.tier && (
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-gold">
                    {p.tier}
                  </p>
                )}
                <h3 className="mt-1 font-display text-2xl text-zinc-900">{p.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{p.blurb}</p>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-zinc-900">{p.price}</span>
                  {p.save && (
                    <span className="rounded-full bg-gold/15 px-2 py-0.5 text-xs font-semibold text-zinc-700">
                      {p.save}
                    </span>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex gap-2.5 text-sm text-zinc-600">
                      <span className="font-bold text-zinc-900">+</span>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => choose(p.name)}
                  className={`press mt-7 block rounded-full py-3 text-center text-sm font-bold uppercase tracking-wide transition-transform hover:scale-[1.02] ${
                    isChosen
                      ? "bg-zinc-900 text-white"
                      : p.popular
                      ? "bg-gold text-black"
                      : "border border-zinc-300 text-zinc-900 hover:border-zinc-900"
                  }`}
                >
                  {isChosen ? "Selected" : "Choose"}
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6 rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-4 text-center text-sm text-zinc-600">
          Custom packages available to fit your goals and budget.{" "}
          <a
            href="#contact"
            className="font-bold text-zinc-900 underline underline-offset-2"
          >
            Tell us what you need →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
