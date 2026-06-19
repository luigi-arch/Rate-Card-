"use client";

import { useState, useTransition } from "react";
import { useSelection } from "@/context/selection";
import { useContent } from "@/context/content";
import { submitLead } from "@/app/actions";
import { SectionHeading } from "./Section";

export default function LeadForm() {
  const { formats, budgetOptions, timelineOptions, contact, bookingUrl } =
    useContent();
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
    client,
    setClient,
  } = useSelection();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const recommendedNames = recommendedFormatIds
    .map((id) => formats.find((f) => f.id === id)?.name)
    .filter((n): n is string => Boolean(n));
  const activeFormatName = formats.find((f) => f.id === activeFormatId)?.name;

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
        setSubmittedName(String(data.get("name") ?? ""));
        setDone(true);
        form.reset();
      } else {
        setError(res.error ?? "Something went wrong.");
      }
    });
  }

  if (done) {
    return (
      <section id="contact" className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <BookCall
            name={submittedName}
            onReset={() => setDone(false)}
            bookingUrl={bookingUrl}
            contactEmail={contact.email}
          />
        </div>
      </section>
    );
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
                  href={`mailto:${contact.email}`}
                  className="font-semibold text-gold hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* right: form */}
          <div className="p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="name"
                    required
                    autoComplete="name"
                    value={client.name}
                    onChange={(v) => setClient({ name: v })}
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={client.email}
                    onChange={(v) => setClient({ email: v })}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Company / organisation"
                    name="company"
                    autoComplete="organization"
                    value={client.company}
                    onChange={(v) => setClient({ company: v })}
                  />
                  <Field label="Your role" name="role" autoComplete="organization-title" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
                  <SelectField
                    label="Budget"
                    name="budget"
                    options={budgetOptions}
                    value={budget}
                    onChange={setBudget}
                  />
                </div>
                <SelectField
                  label="Timeline"
                  name="timeline"
                  options={timelineOptions}
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
          </div>
        </div>
      </div>
    </section>
  );
}

function BookCall({
  name,
  onReset,
  bookingUrl,
  contactEmail,
}: {
  name: string;
  onReset: () => void;
  bookingUrl: string;
  contactEmail: string;
}) {
  const first = name.trim().split(" ")[0] || "there";
  return (
    <div className="card overflow-hidden">
      <div className="bg-ink px-8 py-10 text-center text-white sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl text-black">
          ✓
        </div>
        <h3 className="mt-5 font-display text-4xl text-white sm:text-5xl">
          Brief received, {first}.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
          We’ve emailed you a copy and our team is on it. The fastest next step:
          grab a time that suits you and let’s talk it through.
        </p>
      </div>

      <div className="p-4 sm:p-6">
        {bookingUrl ? (
          <iframe
            src={bookingUrl}
            title="Book a call with SideStreet"
            className="h-[640px] w-full rounded-xl border border-line"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line-strong bg-surface-2 px-6 py-14 text-center">
            <span className="text-3xl">📅</span>
            <p className="mt-4 font-display text-2xl text-fg">Book your intro call</p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Our scheduling link is being finalised. We’ll include a booking link
              in your confirmation email — or reach us directly below.
            </p>
            <a
              href={`mailto:${contactEmail}?subject=Booking%20a%20call%20with%20SideStreet`}
              className="press mt-5 rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-black"
            >
              Email us to book →
            </a>
            <p className="mt-3 font-mono text-[0.65rem] text-muted-2">
              set NEXT_PUBLIC_BOOKING_URL to embed your calendar
            </p>
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-muted hover:text-fg hover:underline"
          >
            ← Start another brief
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const controlled = value !== undefined;
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
        {...(controlled
          ? { value, onChange: (e) => onChange?.(e.target.value) }
          : {})}
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
