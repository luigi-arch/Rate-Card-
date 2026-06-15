import { SectionHeading } from "./Section";
import Reveal from "./Reveal";

const OLD_WAY = ["1 reel", "1 carousel", "5 stories", "1 shoot day"];

const NEW_WAY = [
  "Better understanding",
  "Real relatability",
  "More relevance",
  "Deeper trust",
  "Genuine community",
];

export default function Approach() {
  return (
    <section id="approach" className="border-b border-line py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The shift"
          title={
            <>
              Clients don’t want content.
              <br />
              They want outcomes.
            </>
          }
          intro="Agencies sell deliverables. But nobody actually wants a reel — they want what the reel does. We start with the problem, then build the format that solves it."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal className="card p-7 sm:p-9">
            <p className="eyebrow mb-5 !text-muted-2">What agencies sell</p>
            <ul className="space-y-3">
              {OLD_WAY.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-lg text-muted line-through decoration-muted-2/60"
                >
                  <span className="text-muted-2">✕</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted-2">
              A shopping list of deliverables that gets views but doesn’t move
              perception.
            </p>
          </Reveal>

          <Reveal delay={90} className="card border-gold/30 bg-gold-soft p-7 sm:p-9">
            <p className="eyebrow mb-5">What you actually want</p>
            <ul className="space-y-3">
              {NEW_WAY.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-lg font-medium text-white"
                >
                  <span className="text-gold">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Real results. We build each format around one of these, not around
              a format spec sheet.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
