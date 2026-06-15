/**
 * SideStreet logo — gold ring containing a split "S" monogram
 * (gold upper, ink lower). Hand-built SVG replica of the brand mark.
 *
 * If you later attach the original as a FILE (the way the PDFs were attached,
 * not pasted inline), drop it at /public/logo.svg and replace the <svg> with:
 *   <img src="/logo.svg" alt="SideStreet" style={{ height: size }} />
 */
export default function Logo({
  className = "",
  showWordmark = true,
  size = 38,
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
        {/* outer gold ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="5"
        />

        {/* split S: same glyph drawn twice, clipped top (gold) / bottom (ink) */}
        <defs>
          <clipPath id="ss-top">
            <rect x="0" y="0" width="100" height="50" />
          </clipPath>
          <clipPath id="ss-bottom">
            <rect x="0" y="50" width="100" height="50" />
          </clipPath>
        </defs>

        <text
          x="50"
          y="51"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Helvetica, Arial, sans-serif"
          fontWeight="700"
          fontSize="74"
          clipPath="url(#ss-top)"
          fill="var(--color-gold)"
        >
          S
        </text>
        <text
          x="50"
          y="51"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="Helvetica, Arial, sans-serif"
          fontWeight="700"
          fontSize="74"
          clipPath="url(#ss-bottom)"
          fill="#ffffff"
        >
          S
        </text>
      </svg>
      {showWordmark && (
        <span className="font-display text-2xl leading-none tracking-[0.04em] text-white">
          SIDESTREET
        </span>
      )}
    </span>
  );
}
