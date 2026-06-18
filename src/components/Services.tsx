"use client";

import { useState } from "react";
import { useContent } from "@/context/content";
import { useSelection } from "@/context/selection";
import type { ServiceItem } from "@/lib/content";
import { SectionHeading } from "./Section";
import ServiceIllustration from "./ServiceIllustration";
import Reveal from "./Reveal";

const price = (n: number | null) => (n ? `€${n.toLocaleString()}` : "Custom");

function ServiceCard({ service: s }: { service: ServiceItem }) {
  const { toggleAddOn, selectedAddOns } = useSelection();
  const hasOptions = Boolean(s.options?.length);
  const [optIndex, setOptIndex] = useState(0);
  const opt = hasOptions ? s.options![optIndex] : undefined;

  const activePrice = opt ? opt.priceFrom : s.priceFrom;
  // Brief label — includes the chosen option + price for context.
  const label = `${s.name}${opt ? ` — ${opt.label}` : ""} (${price(activePrice)})`;
  // A service counts as "added" if any of its variants is in the brief.
  const existing = selectedAddOns.find((a) => a.startsWith(s.name));
  const on = Boolean(existing);

  function add() {
    if (existing) toggleAddOn(existing); // remove whatever variant is in the brief
    if (existing !== label) toggleAddOn(label); // add the current selection
  }

  function changeOption(next: number) {
    setOptIndex(next);
    if (existing) {
      // keep the brief in sync with the newly chosen quantity
      const nextOpt = s.options![next];
      const nextLabel = `${s.name} — ${nextOpt.label} (${price(nextOpt.priceFrom)})`;
      toggleAddOn(existing);
      toggleAddOn(nextLabel);
    }
  }

  return (
    <div
      className={`group hover-lift flex h-full flex-col overflow-hidden rounded-2xl border transition-all ${
        on ? "border-gold ring-1 ring-gold" : "border-line"
      }`}
    >
      {/* illustration */}
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-gold-soft to-surface-2 text-fg/80">
        <ServiceIllustration icon={s.icon} />
      </div>

      <div className="flex flex-1 flex-col bg-surface p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-md bg-paper-2 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-muted-2">
            {s.category}
          </span>
          {on && (
            <span className="rounded-full bg-gold px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-black">
              ✓ In brief
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl leading-none text-fg">{s.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.blurb}</p>

        {hasOptions && (
          <select
            value={optIndex}
            onChange={(e) => changeOption(Number(e.target.value))}
            className="mt-4 w-full rounded-xl border border-line bg-white px-3 py-2 text-sm text-fg outline-none focus:border-gold"
          >
            {s.options!.map((o, i) => (
              <option key={o.label} value={i}>
                {o.label} — {price(o.priceFrom)}
              </option>
            ))}
          </select>
        )}

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-display text-2xl text-fg">{price(activePrice)}</span>
          <button
            type="button"
            onClick={add}
            aria-pressed={on}
            className={`press rounded-full px-4 py-2 text-sm font-bold transition-all ${
              on
                ? "bg-zinc-900 text-white"
                : "bg-gold text-black hover:scale-[1.03]"
            }`}
          >
            {on ? "Remove" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const { services, addOns } = useContent();
  const { toggleAddOn, isAddOnSelected } = useSelection();

  return (
    <section id="services" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Other services"
          title="More than video."
          intro="Carousels, statics, stories and platform campaigns — add any to your brief alongside a video format, or on their own."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 60} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        {/* add-ons */}
        <div id="add-ons" className="mt-14">
          <h3 className="display text-3xl text-fg sm:text-4xl">Add-ons</h3>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Tap any to add them to your brief — we’ll quote them with your selection.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {addOns.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-7"
              >
                <h4 className="font-display text-xl text-zinc-900">{group.title}</h4>
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
