import { HOW_IT_WORKS } from "@/lib/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="How this rate card works"
          title="You bring the objective. We build the story."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.step} delay={i * 90} className="relative card p-7">
              <span className="font-display text-5xl font-extrabold text-fg">
                {step.step}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-fg">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
