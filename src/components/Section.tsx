import Reveal from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="display text-4xl text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
