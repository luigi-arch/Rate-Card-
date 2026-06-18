"use client";

/**
 * From-scratch line diagrams for each service — designed to convey the offering
 * (not generic icons or photo placeholders). Line-art with gold accents to match
 * the site. All inline SVG so they stay crisp and themeable.
 */

const GOLD = "var(--color-gold)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 96 64"
      fill="none"
      className="h-20 w-auto"
      aria-hidden
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/* Carousel — a stack of swipeable slides with image + copy and pager dots. */
function Carousel() {
  return (
    <Frame>
      <rect x="8" y="18" width="18" height="30" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="70" y="18" width="18" height="30" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.3" />
      <rect x="32" y="11" width="32" height="40" rx="4" stroke={GOLD} strokeWidth="2.4" />
      <rect x="37" y="16" width="22" height="13" rx="2" stroke={GOLD} strokeWidth="1.6" fill={GOLD} fillOpacity="0.18" />
      <line x1="37" y1="35" x2="59" y2="35" stroke="currentColor" strokeWidth="2.2" />
      <line x1="37" y1="41" x2="52" y2="41" stroke="currentColor" strokeWidth="2.2" opacity="0.45" />
      <path d="M25 29l-4 4 4 4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <path d="M71 29l4 4-4 4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="44" cy="57" r="1.5" fill={GOLD} />
      <circle cx="49" cy="57" r="1.5" fill="currentColor" opacity="0.3" />
      <circle cx="54" cy="57" r="1.5" fill="currentColor" opacity="0.3" />
    </Frame>
  );
}

/* Static — a single designed post: graphic shape, headline + copy, logo mark. */
function Static() {
  return (
    <Frame>
      <rect x="28" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="40" cy="22" r="7" stroke={GOLD} strokeWidth="1.8" fill={GOLD} fillOpacity="0.18" />
      <path d="M52 17l8 0M52 23l6 0" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="34" y="36" width="28" height="5" rx="2.5" fill="currentColor" />
      <line x1="34" y1="46" x2="60" y2="46" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <line x1="34" y1="51" x2="50" y2="51" stroke="currentColor" strokeWidth="2" opacity="0.45" />
    </Frame>
  );
}

/* Stories — a phone with story progress bars and an interactive poll sticker. */
function Stories() {
  return (
    <Frame>
      <rect x="34" y="5" width="28" height="54" rx="6" stroke="currentColor" strokeWidth="2.4" />
      <rect x="38" y="10" width="7" height="2" rx="1" fill={GOLD} />
      <rect x="47" y="10" width="7" height="2" rx="1" fill="currentColor" opacity="0.3" />
      <rect x="56" y="10" width="2" height="2" rx="1" fill="currentColor" opacity="0.3" />
      <circle cx="41" cy="18" r="2.6" stroke={GOLD} strokeWidth="1.6" />
      <rect x="38" y="34" width="20" height="13" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <line x1="48" y1="34" x2="48" y2="47" stroke="currentColor" strokeWidth="1.8" />
      <path d="M40.5 40.5l2 2 3.5-3.5" stroke={GOLD} strokeWidth="1.8" />
      <path d="M28 28l-3 3 3 3" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <path d="M68 28l3 3-3 3" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </Frame>
  );
}

/* Giveaway — a gift with a bow, a hanging prize tag and sparkles. */
function Giveaway() {
  return (
    <Frame>
      <rect x="30" y="28" width="30" height="24" rx="2" stroke="currentColor" strokeWidth="2.2" />
      <rect x="26" y="21" width="38" height="8" rx="2" stroke="currentColor" strokeWidth="2.2" />
      <path d="M45 21v31" stroke={GOLD} strokeWidth="2.2" />
      <path d="M45 21c-6-8-13-2-9 1M45 21c6-8 13-2 9 1" stroke={GOLD} strokeWidth="2.2" />
      <path d="M64 15h12l4 5-4 5H64z" stroke={GOLD} strokeWidth="1.8" fill={GOLD} fillOpacity="0.15" />
      <circle cx="68" cy="20" r="1.4" fill={GOLD} />
      <path d="M20 16l1.3 3.4 3.4 1.3-3.4 1.3L20 25.4l-1.3-3.4L15.3 20.7l3.4-1.3z" fill={GOLD} />
    </Frame>
  );
}

/* Banner Ads — a website frame with highlighted banner ad placements. */
function Banners() {
  return (
    <Frame>
      <rect x="12" y="9" width="72" height="46" rx="4" stroke="currentColor" strokeWidth="2.2" />
      <line x1="12" y1="19" x2="84" y2="19" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <circle cx="17.5" cy="14" r="1.3" fill="currentColor" opacity="0.4" />
      <circle cx="22.5" cy="14" r="1.3" fill="currentColor" opacity="0.4" />
      <circle cx="27.5" cy="14" r="1.3" fill="currentColor" opacity="0.4" />
      <rect x="18" y="24" width="60" height="9" rx="2" stroke={GOLD} strokeWidth="2" fill={GOLD} fillOpacity="0.18" />
      <line x1="18" y1="41" x2="44" y2="41" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="18" y1="47" x2="40" y2="47" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="56" y="39" width="22" height="11" rx="2" stroke={GOLD} strokeWidth="1.8" fill={GOLD} fillOpacity="0.12" />
    </Frame>
  );
}

/* Generic fallback — a simple content card (never the photo-placeholder glyph). */
function Generic() {
  return (
    <Frame>
      <rect x="30" y="10" width="36" height="44" rx="4" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="38" cy="20" r="3" fill={GOLD} />
      <line x1="36" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="2.2" />
      <line x1="36" y1="39" x2="60" y2="39" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <line x1="36" y1="46" x2="52" y2="46" stroke="currentColor" strokeWidth="2" opacity="0.45" />
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
  const Cmp = (icon && MAP[icon]) || Generic;
  return <Cmp />;
}
