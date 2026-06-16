"use client";

import { useState } from "react";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function BriefTray() {
  const {
    selectedHeadacheLabels,
    activeFormatId,
    formatEngaged,
    selectedPackage,
    selectedAddOns,
    progress,
    briefCount,
  } = useSelection();
  const { formats } = useContent();
  const [open, setOpen] = useState(true);

  if (briefCount === 0) return null;

  const activeFormatName = formats.find((f) => f.id === activeFormatId)?.name;
  const steps = [
    { n: "01", label: "Headache", done: progress.step1, href: "headaches" },
    { n: "02", label: "Format", done: progress.step2, href: "formats" },
    { n: "03", label: "Package", done: progress.step3, href: "pricing" },
  ];

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-80">
      <div className="card-dark overflow-hidden text-white shadow-2xl">
        {/* header */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3"
        >
          <span className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
              Your brief
            </span>
            <span className="rounded-full bg-gold px-2 py-0.5 text-[0.65rem] font-bold text-black">
              {briefCount}
            </span>
          </span>
          <span className="flex items-center gap-2">
            {/* progress dots */}
            <span className="flex gap-1">
              {steps.map((s) => (
                <span
                  key={s.n}
                  className={`h-1.5 w-1.5 rounded-full ${
                    s.done ? "bg-gold" : "bg-white/25"
                  }`}
                />
              ))}
            </span>
            <span
              className={`text-white/50 transition-transform ${open ? "" : "rotate-180"}`}
            >
              ▾
            </span>
          </span>
        </button>

        {open && (
          <div className="border-t border-white/10 px-4 pb-4 pt-3">
            {/* steps */}
            <ol className="space-y-2">
              {steps.map((s) => (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => scrollTo(s.href)}
                    className="flex w-full items-center gap-2.5 text-left"
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.6rem] font-bold ${
                        s.done ? "bg-gold text-black" : "border border-white/25 text-white/50"
                      }`}
                    >
                      {s.done ? "✓" : s.n}
                    </span>
                    <span className={`text-sm ${s.done ? "text-white" : "text-white/55"}`}>
                      {s.label}
                    </span>
                    <span className="ml-auto truncate text-xs text-white/45">
                      {s.href === "headaches" && selectedHeadacheLabels.length
                        ? `${selectedHeadacheLabels.length} picked`
                        : s.href === "formats" && formatEngaged
                        ? activeFormatName?.replace("Interviewed by SideStreet", "Interviews")
                        : s.href === "pricing" && selectedPackage
                        ? selectedPackage
                        : ""}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            {selectedAddOns.length > 0 && (
              <p className="mt-3 text-xs text-white/45">
                + {selectedAddOns.length} add-on{selectedAddOns.length > 1 ? "s" : ""}
              </p>
            )}

            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="press mt-4 w-full rounded-full bg-gold py-2.5 text-center text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.02]"
            >
              Finish my brief →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
