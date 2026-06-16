import Reveal from "./Reveal";

/**
 * Step header for the three journey sections. Surfaces the
 * "How this rate card works" narrative as connective tissue.
 */
export function JourneyHeader({
  step,
  title,
  body,
  done = false,
}: {
  step: string;
  title: string;
  body?: string;
  done?: boolean;
}) {
  return (
    <Reveal className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full border font-display text-lg transition-colors ${
            done
              ? "border-gold bg-gold text-black"
              : "border-fg/20 text-fg"
          }`}
        >
          {done ? "✓" : step}
        </span>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
          Step {step} of 03
        </span>
      </div>
      <h2 className="display mt-4 text-4xl text-fg sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {body && (
        <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{body}</p>
      )}
    </Reveal>
  );
}
