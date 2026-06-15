import { PACKAGES, ADD_ONS } from "@/lib/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Packages() {
  return (
    <section id="pricing" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Ready-made packages"
          title="Simpler. Smarter. More impact."
          intro="Start with a package or build from a single format. Every format begins with strategy, production, editing and organic distribution — then you add what you need."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 90}
              className={`card relative flex flex-col p-7 ${
                p.popular ? "border-gold/60 shadow-glow" : ""
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-black">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white">
                {p.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{p.blurb}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-gold">
                  {p.price}
                </span>
                {p.name === "Always On" && (
                  <span className="text-sm text-muted">/ mo</span>
                )}
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {p.features.map((feat) => (
                  <li key={feat} className="flex gap-2.5 text-sm text-muted">
                    <span className="text-gold">✓</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-7 block rounded-full py-3 text-center text-sm font-bold transition-transform hover:scale-[1.02] ${
                  p.popular
                    ? "bg-gold text-black"
                    : "border border-line-strong text-white hover:border-gold hover:text-gold"
                }`}
              >
                Choose {p.name}
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-5 rounded-2xl border border-dashed border-line-strong px-6 py-4 text-center text-sm text-muted">
          Custom packages available to fit your goals and budget.{" "}
          <a href="#contact" className="font-semibold text-gold hover:underline">
            Tell us what you need →
          </a>
        </Reveal>

        {/* add-ons */}
        <div id="add-ons" className="mt-16 grid gap-5 md:grid-cols-2">
          {[ADD_ONS.creative, ADD_ONS.distribution].map((group, i) => (
            <Reveal key={group.title} delay={i * 90} className="card p-7">
              <h3 className="font-display text-lg font-bold text-white">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted"
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
