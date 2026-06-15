import Reveal from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  theme = "dark",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  theme?: "dark" | "light";
}) {
  const light = theme === "light";
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow &&
        (light ? (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
            {eyebrow}
          </p>
        ) : (
          <p className="eyebrow mb-3">{eyebrow}</p>
        ))}
      <h2
        className={`display text-4xl sm:text-5xl md:text-6xl ${
          light ? "text-zinc-900" : "text-white"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed ${
            light ? "text-zinc-600" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
