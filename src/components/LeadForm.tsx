"use client";

import { useState, useTransition } from "react";
import {
  FORMATS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  CONTACT,
} from "@/lib/content";
import { useSelection } from "@/context/selection";
import { submitLead } from "@/app/actions";
import { SectionHeading } from "./Section";

export default function LeadForm() {
  const {
    selectedHeadacheLabels,
    recommendedFormatIds,
    activeFormatId,
    formatEngaged,
    selectedPackage,
    selectedAddOns,
    budget,
    setBudget,
    timeline,
    setTimeline,
  } = useSelection();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recommendedNames = recommendedFormatIds
    .map((id) => FORMATS.find((f) => f.id === id)?.name)
    .filter((n): n is string => Boolean(n));
  const activeFormatName = FORMATS.find((f) => f.id === activeFormatId)?.name;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const res = await submitLead({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? ""),
        role: String(data.get("role") ?? ""),
        phone: String(data.get("phone") ?? ""),
        budget,
        timeline,
        message: String(data.get("message") ?? ""),
        headaches: selectedHeadacheLabels,
        recommendedFormats: recommendedFormatIds,
        activeFormat: formatEngaged ? activeFormatName : undefined,
        package: selectedPackage ?? undefined,
        addOns: selectedAddOns,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : "",
      });

      if (res.ok) {
        setDone(true);
        form.reset();
      } else {
        setError(res.error ?? "Something went wrong.");
      }
    });
  }

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="card grid gap-0 overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
          {/* left: brief summary — black feature panel */}
          <div className="bg-ink p-8 text-white sm:p-10">
            <SectionHeading
              theme="dark"
              eyebrow="Let’s build"
              title="Tell us your headache."
              intro="Share a few details and we’ll come back with a tailored recommendation — usually within one working day."
            />

            <div className="mt-8 space-y-5">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  Your selected headaches
                </p>
                {selectedHeadacheLabels.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {selectedHeadacheLabels.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-white"
                      >
                        “{h}”
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-white/60">
                    None yet —{" "}
                    <a href="#headaches" className="text-gold hover:underline">
                      pick yours
                    </a>{" "}
                    and they’ll appear here.
                  </p>
                )}
              </div>

              {recommendedNames.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    We’d recommend
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {recommendedNames.map((n) => (
                      <li
                        key={n}
                        className="rounded-full bg-gold px-3 py-1 text-xs font-semibold text-black"
                      >
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedPackage && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    Your package
                  </p>
                  <span className="rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs text-white">
                    {selectedPackage}
                  </span>
                </div>
              )}

              {selectedAddOns.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                    Add-ons
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {selectedAddOns.map((a) => (
                      <li
                        key={a}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-white/10 pt-5 text-sm text-white/60">
                Prefer email?{" "}
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-semibold text-gold hover:underline"
                >
                  {CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* right: form */}
          <div className="p-8 sm:p-10">
            {done ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-black">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-3xl text-fg">
                  Brief received.
                </h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  Thanks — we’ve got your details and we’ll be in touch shortly
                  with a tailored recommendation.
                </p>
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="mt-6 text-sm text-gold hover:underline"
                >
                  Send another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required autoComplete="name" />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Company / organisation"
                    name="company"
                    autoComplete="organization"
                  />
                  <Field label="Your role" name="role" autoComplete="organization-title" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                  <SelectField
                    label="Budget"
                    name="budget"
                    options={BUDGET_OPTIONS}
                    value={budget}
                    onChange={setBudget}
                  />
                </div>
                <SelectField
                  label="Timeline"
                  name="timeline"
                  options={TIMELINE_OPTIONS}
                  value={timeline}
                  onChange={setTimeline}
                />
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-fg"
                  >
                    Anything else?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your goal or the problem you’re trying to solve…"
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-gold"
                  />
                </div>

                {error && (
                  <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full rounded-full bg-gold py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? "Sending…" : "Send my brief →"}
                </button>
                <p className="text-center text-xs text-muted-2">
                  We’ll only use your details to respond to your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-gold"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-fg outline-none transition-colors focus:border-gold"
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
