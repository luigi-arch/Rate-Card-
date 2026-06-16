"use client";

import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";
import { JourneyHeader } from "./JourneyHeader";
import Reveal from "./Reveal";

// Map a package tier to the closest budget band so the brief form pre-fills.
const PKG_BUDGET: Record<string, string> = {
  Starter: "€2,500 – €5,000",
  Growth: "€5,000 – €10,000",
  "Always On": "€10,000+ / monthly partnership",
};

export default function Packages() {
  const {
    selectedPackage,
    setSelectedPackage,
    setBudget,
    toggleAddOn,
    isAddOnSelected,
  } = useSelection();
  const { packages, addOns, howItWorks } = useContent();

  function choose(name: string) {
    const next = selectedPackage === name ? null : name;
    setSelectedPackage(next);
    if (next && PKG_BUDGET[next]) setBudget(PKG_BUDGET[next]);
  }

  return (
    <section id="pricing" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <JourneyHeader
          step="03"
          title={howItWorks[2].title}
          body="Start from a ready-made package or a single format, then tune it with add-ons. Pick a starting point to add it to your brief."
          done={Boolean(selectedPackage)}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {packages.map((p, i) => {
            const isChosen = selectedPackage === p.name;
            return (
              <Reveal
                key={p.name}
                delay={i * 90}
                className={`hover-lift relative flex flex-col rounded-2xl border bg-white p-7 ${
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
                <h3 className="font-display text-2xl text-zinc-900">{p.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{p.blurb}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-5xl text-zinc-900">
                    {p.price}
                  </span>
                  {p.name === "Always On" && (
                    <span className="text-sm text-zinc-500">/ mo</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex gap-2.5 text-sm text-zinc-600">
                      <span className="font-bold text-zinc-900">✓</span>
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
                  {isChosen ? "Selected" : `Choose ${p.name}`}
                </button>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-5 rounded-2xl border border-dashed border-zinc-300 px-6 py-4 text-center text-sm text-zinc-600">
          Custom packages available to fit your goals and budget.{" "}
          <a
            href="#contact"
            className="font-bold text-zinc-900 underline underline-offset-2"
          >
            Tell us what you need →
          </a>
        </Reveal>

        {/* selectable add-ons */}
        <div id="add-ons" className="mt-14">
          <h3 className="display text-3xl text-fg sm:text-4xl">Add-ons</h3>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Tap any to add them to your brief — we’ll quote them with your package.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {addOns.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-7"
              >
                <h4 className="font-display text-xl text-zinc-900">
                  {group.title}
                </h4>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => {
                    const on = isAddOnSelected(item);
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => toggleAddOn(item)}
                          aria-pressed={on}
                          className={`press rounded-full border px-3 py-1.5 text-sm transition-all ${
                            on
                              ? "border-gold bg-gold text-black"
                              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400"
                          }`}
                        >
                          {on ? "✓ " : "+ "}
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
