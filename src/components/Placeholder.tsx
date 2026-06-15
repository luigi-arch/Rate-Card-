/**
 * Labelled placeholder frame marking where imagery should be dropped in.
 * `sublabel` is the expected file path (e.g. "public/hero.jpg").
 */
export default function Placeholder({
  label,
  sublabel,
  aspect = "video",
  variant = "image",
  className = "",
}: {
  label: string;
  sublabel?: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  variant?: "image" | "play";
  className?: string;
}) {
  const ratio =
    aspect === "video"
      ? "aspect-video"
      : aspect === "square"
      ? "aspect-square"
      : aspect === "portrait"
      ? "aspect-[4/5]"
      : "aspect-[21/9]";

  return (
    <div
      className={`relative flex ${ratio} w-full flex-col items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-dashed border-line-strong bg-gradient-to-br from-surface-2 to-ink-2 text-center ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--color-gold)" }}
      />
      {variant === "play" ? (
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ink/50 text-gold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      ) : (
        <span className="relative text-gold/70">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="8.5" cy="8.5" r="1.8" fill="currentColor" />
            <path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <span className="relative px-3 text-xs font-bold uppercase tracking-[0.15em] text-muted">
        {label}
      </span>
      {sublabel && (
        <span className="relative font-mono text-[0.68rem] text-muted-2">
          {sublabel}
        </span>
      )}
    </div>
  );
}
