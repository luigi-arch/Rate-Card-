"use client";

import { type ContentFormat } from "@/lib/content";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";
import { JourneyHeader } from "./JourneyHeader";
import BrainAnimation from "./BrainAnimation";

export default function HeadachePicker() {
  const { selected, clear, recommendedFormatIds } = useSelection();
  const { formats, howItWorks } = useContent();

  const recommended = recommendedFormatIds
    .map((id) => formats.find((f) => f.id === id))
    .filter((f): f is ContentFormat => Boolean(f));

  return (
    <section id="headaches" className="scroll-mt-20 border-t border-line py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <JourneyHeader
          step="01"
          title={howItWorks[0].title}
          body="Click the headaches that sound like you. We’ll match each to the format built to solve it — and build your brief as you go."
          done={selected.length > 0}
        />

        {/* interactive brain — the headaches are the selectors */}
        <div className="mt-10">
          <BrainAnimation />
        </div>

        {/* reveal matching formats — no duplicate listing, just the bridge */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          {recommended.length === 0 ? (
            <p className="text-sm leading-relaxed text-muted">
              Click the headaches above that sound like you — choose as many as
              apply — then we’ll show the video formats engineered to fix them.
            </p>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-muted">
                <span className="font-semibold text-fg">
                  {recommended.length} video format
                  {recommended.length > 1 ? "s" : ""}
                </span>{" "}
                match your headaches.
              </p>
              <a
                href="#formats"
                className="press rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
              >
                Show my matching formats →
              </a>
              <button
                type="button"
                onClick={clear}
                className="text-xs text-muted-2 underline-offset-2 hover:text-fg hover:underline"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
