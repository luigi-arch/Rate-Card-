import { DISTRIBUTION } from "@/lib/content";
import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Distribution() {
  return (
    <section className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Distribution"
          title="Content that works twice."
          intro="Every piece is designed for our audience, your audience and cross-posting across channels."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {DISTRIBUTION.channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className="card p-7">
              <span className="font-display text-2xl font-extrabold text-gold/30">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-white">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <blockquote className="border-l-2 border-gold pl-6">
            <p className="display max-w-2xl text-2xl text-white sm:text-3xl">
              {DISTRIBUTION.pullQuote}
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
