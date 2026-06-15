import { PACKAGES, ADD_ONS } from "@/lib/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Packages() {
  return (
    <section id="pricing" className="bg-white py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          theme="light"
          eyebrow="Ready-made packages"
          title="Simpler. Smarter. More impact."
          intro="Start with a package or build from a single format. Every format begins with strategy, production, editing and organic distribution — then you add what you need."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 90}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 ${
                p.popular
                  ? "border-gold shadow-[0_24px_60px_-20px_rgba(255,182,0,0.45)]"
                  : "border-zinc-200 shadow-sm"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-black">
                  Most popular
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
              <a
                href="#contact"
                className={`mt-7 block rounded-full py-3 text-center text-sm font-bold uppercase tracking-wide transition-transform hover:scale-[1.02] ${
                  p.popular
                    ? "bg-gold text-black"
                    : "border border-zinc-300 text-zinc-900 hover:border-zinc-900"
                }`}
              >
                Choose {p.name}
              </a>
            </Reveal>
          ))}
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

        {/* add-ons */}
        <div id="add-ons" className="mt-16 grid gap-5 md:grid-cols-2">
          {[ADD_ONS.creative, ADD_ONS.distribution].map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 90}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-7"
            >
              <h3 className="font-display text-xl text-zinc-900">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
