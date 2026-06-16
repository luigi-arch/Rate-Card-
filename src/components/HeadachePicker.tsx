"use client";

import { FORMATS, HOW_IT_WORKS } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { JourneyHeader } from "./JourneyHeader";
import BrainAnimation from "./BrainAnimation";

export default function HeadachePicker() {
  const { selected, clear, recommendedFormatIds } = useSelection();

  const recommended = recommendedFormatIds
    .map((id) => FORMATS.find((f) => f.id === id))
    .filter((f): f is (typeof FORMATS)[number] => Boolean(f));

  return (
    <section id="headaches" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <JourneyHeader
          step="01"
          title={HOW_IT_WORKS[0].title}
          body="Click the headaches that sound like you. We’ll match each to the format built to solve it — and build your brief as you go."
          done={selected.length > 0}
        />

        {/* interactive brain — the headaches are the selectors */}
        <div className="mt-10">
          <BrainAnimation />
        </div>

        {/* matched formats */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="card p-6 sm:p-7">
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
                Click a headache above and we’ll show you the format engineered to
                fix it. Choose as many as apply.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {recommended.map((f) => (
                  <a
                    key={f.id}
                    href="#formats"
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
                  href="#formats"
                  className="press mt-2 block rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-black"
                >
                  Explore your formats →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
