"use client";

/**
 * Lightweight line-diagram illustrations for the service cards — matching the
 * site's existing line-art style (stroked glyphs with gold accents). No photos
 * or screenshots; everything is inline SVG so it stays crisp and themeable.
 */

const GOLD = "var(--color-gold)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 88 56"
      fill="none"
      className="h-16 w-auto"
      aria-hidden
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

function Carousel() {
  return (
    <Frame>
      <rect x="8" y="16" width="20" height="28" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <rect x="60" y="16" width="20" height="28" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.35" />
      <rect x="30" y="9" width="28" height="36" rx="4" stroke={GOLD} strokeWidth="2.4" />
      <circle cx="39" cy="20" r="3" stroke={GOLD} strokeWidth="2" />
      <path d="M32 33l6-6 5 4 5-5 5 6" stroke="currentColor" strokeWidth="2" />
      <g stroke="currentColor" strokeWidth="2">
        <path d="M40 51h8" opacity="0.3" />
      </g>
      <circle cx="40" cy="51" r="1.4" fill={GOLD} />
      <circle cx="44" cy="51" r="1.4" fill="currentColor" opacity="0.35" />
      <circle cx="48" cy="51" r="1.4" fill="currentColor" opacity="0.35" />
    </Frame>
  );
}

function Static() {
  return (
    <Frame>
      <rect x="24" y="8" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="37" cy="21" r="3.5" stroke={GOLD} strokeWidth="2" />
      <path d="M27 41l11-11 7 6 6-6 8 8" stroke={GOLD} strokeWidth="2.2" />
    </Frame>
  );
}

function Stories() {
  const cols = [10, 35, 60];
  return (
    <Frame>
      {cols.map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="8"
            width="18"
            height="40"
            rx="4"
            stroke={i === 1 ? GOLD : "currentColor"}
            strokeWidth={i === 1 ? 2.4 : 2}
            opacity={i === 1 ? 1 : 0.5}
          />
          <circle
            cx={x + 9}
            cy="16"
            r="3"
            stroke={i === 1 ? GOLD : "currentColor"}
            strokeWidth="1.8"
            opacity={i === 1 ? 1 : 0.5}
          />
        </g>
      ))}
      <path d="M40 30l5 3-5 3z" fill={GOLD} />
    </Frame>
  );
}

function Giveaway() {
  return (
    <Frame>
      <rect x="26" y="24" width="36" height="22" rx="2" stroke="currentColor" strokeWidth="2.2" />
      <rect x="22" y="16" width="44" height="9" rx="2" stroke="currentColor" strokeWidth="2.2" />
      <path d="M44 16v30" stroke={GOLD} strokeWidth="2.2" />
      <path d="M44 16c-6-9-14-3-9 0M44 16c6-9 14-3 9 0" stroke={GOLD} strokeWidth="2.2" />
      <path d="M70 12l1.5 4 4 1.5-4 1.5L70 23l-1.5-4-4-1.5 4-1.5z" fill={GOLD} />
    </Frame>
  );
}

function Banners() {
  return (
    <Frame>
      <rect x="10" y="9" width="68" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="10" y="23" width="54" height="10" rx="2.5" stroke={GOLD} strokeWidth="2.4" />
      <rect x="10" y="37" width="62" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="58" cy="28" r="1.6" fill={GOLD} />
    </Frame>
  );
}

const MAP: Record<string, () => React.ReactElement> = {
  carousel: Carousel,
  static: Static,
  stories: Stories,
  giveaway: Giveaway,
  banners: Banners,
};

export default function ServiceIllustration({ icon }: { icon?: string }) {
  const Cmp = (icon && MAP[icon]) || Static;
  return <Cmp />;
}
