/**
 * SideStreet logo — gold ring with a split "S" monogram.
 * This is a faithful placeholder; to use the real asset, drop `logo.svg`
 * into /public and replace the <svg> below with:
 *   <img src="/logo.svg" alt="SideStreet" className="h-9 w-auto" />
 */
export default function Logo({
  className = "",
  showWordmark = true,
  size = 36,
}: {
  className?: string;
  showWordmark?: boolean;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="5"
        />
        <clipPath id="ss-clip">
          <circle cx="50" cy="50" r="42" />
        </clipPath>
        <g clipPath="url(#ss-clip)">
          {/* upper lobe (gold) */}
          <path
            d="M0,0 H100 V52 C74,40 60,66 40,58 C26,52 16,42 0,48 Z"
            fill="var(--color-gold)"
          />
          {/* lower lobe (ink) */}
          <path
            d="M0,100 H100 V52 C74,40 60,66 40,58 C26,52 16,42 0,48 Z"
            fill="var(--color-ink)"
          />
        </g>
      </svg>
      {showWordmark && (
        <span className="font-display text-2xl leading-none tracking-[0.04em] text-white">
          SIDESTREET
        </span>
      )}
    </span>
  );
}
