import Reveal from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  theme = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  theme?: "dark" | "light";
}) {
  const dark = theme === "dark";
  return (
    <Reveal
      className={
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }
    >
      {eyebrow && (
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${
            dark ? "text-gold" : "text-zinc-500"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`display text-4xl sm:text-5xl md:text-6xl ${
          dark ? "text-white" : "text-fg"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 max-w-xl text-base leading-relaxed ${
            dark ? "text-white/70" : "text-muted"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
