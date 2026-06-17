"use client";

import { useContent } from "@/context/content";
import { useSelection } from "@/context/selection";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Services() {
  const { services, addOns } = useContent();
  const { toggleAddOn, isAddOnSelected } = useSelection();

  // Label used in the brief / lead — keeps the price for context.
  const serviceLabel = (name: string, price: number | null) =>
    price ? `${name} (€${price.toLocaleString()})` : name;

  return (
    <section id="services" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Other services"
          title="More than video."
          intro="Carousels, statics, stories and platform campaigns — add any to your brief alongside a video format, or on their own."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const label = serviceLabel(s.name, s.priceFrom);
            const on = isAddOnSelected(label);
            return (
              <Reveal key={s.id} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => toggleAddOn(label)}
                  aria-pressed={on}
                  className={`hover-lift flex h-full w-full flex-col rounded-2xl border p-6 text-left transition-all ${
                    on
                      ? "border-gold bg-gold-soft ring-1 ring-gold"
                      : "border-line bg-surface hover:border-line-strong"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-paper-2 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-muted-2">
                      {s.category}
                    </span>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        on ? "bg-gold text-black" : "border border-line-strong text-muted-2"
                      }`}
                    >
                      {on ? "✓" : "+"}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl leading-none text-fg">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {s.blurb}
                  </p>
                  <p className="mt-4 font-display text-2xl text-fg">
                    {s.priceFrom ? `€${s.priceFrom.toLocaleString()}` : "Custom"}
                  </p>
                </button>
              </Reveal>
            );
          })}
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
