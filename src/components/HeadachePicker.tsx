"use client";

import { HEADACHES, FORMATS } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { SectionHeading } from "./Section";
import BrainAnimation from "./BrainAnimation";

export default function HeadachePicker() {
  const { selected, toggle, clear, isSelected, recommendedFormatIds } =
    useSelection();

  const recommended = recommendedFormatIds
    .map((id) => FORMATS.find((f) => f.id === id))
    .filter((f): f is (typeof FORMATS)[number] => Boolean(f));

  return (
    <section id="headaches" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Find your fix"
          title="What’s your headache?"
          intro="Pick the ones that sound like you. We’ll match each to the format built to solve it — and build your shortlist as you go."
        />

        {/* brain on a black feature panel */}
        <div className="relative mt-10 overflow-hidden rounded-3xl bg-ink px-4 py-8 sm:py-10">
          <BrainAnimation />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* chips */}
          <div className="flex flex-wrap content-start gap-2.5">
            {HEADACHES.map((h) => {
              const active = isSelected(h.id);
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => toggle(h.id)}
                  aria-pressed={active}
                  className={`group rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-all ${
                    active
                      ? "border-gold bg-gold text-black"
                      : "border-line-strong text-muted hover:border-fg hover:text-fg"
                  }`}
                >
                  <span className="mr-1.5 opacity-60">“</span>
                  {h.label}
                  <span className="ml-1.5 opacity-60">”</span>
                </button>
              );
            })}
          </div>

          {/* result panel */}
          <div className="card sticky top-24 self-start p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Your matched formats</p>
              {selected.length > 0 && (
                <button
                  type="button"
                  onClick={clear}
                  className="text-xs text-muted-2 underline-offset-2 hover:text-fg hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            {recommended.length === 0 ? (
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Select a headache and we’ll show you the format engineered to fix
                it. Choose as many as apply.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {recommended.map((f) => (
                  <a
                    key={f.id}
                    href={`#format-${f.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 px-4 py-3 transition-colors hover:border-gold"
                  >
                    <span>
                      <span className="block font-display text-lg text-fg">
                        {f.name}
                      </span>
                      <span className="text-xs text-muted">{f.keyword}</span>
                    </span>
                    <span className="text-sm font-bold text-fg">
                      {f.priceFrom ? `€${f.priceFrom.toLocaleString()}` : "Custom"}
                    </span>
                  </a>
                ))}
                <a
                  href="#contact"
                  className="mt-2 block rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                >
                  Build my package →
                </a>
                <p className="text-center text-xs text-muted-2">
                  We’ll pre-fill your brief with these.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
