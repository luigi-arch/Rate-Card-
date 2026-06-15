"use client";

import { useState } from "react";

/**
 * SideStreet logo.
 * - If `public/logo.svg` exists, it's used automatically (treat as the full lockup).
 * - Otherwise falls back to a hand-built gold-ring split-S monogram + Bebas wordmark.
 * Drop the real file at /public/logo.svg and it swaps in with no code change.
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
  const [useFile, setUseFile] = useState(true);

  if (useFile) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/sidestreet_logo_new.png"
        alt="SideStreet"
        onError={() => setUseFile(false)}
        style={{ height: size }}
        className={`w-auto ${className}`}
      />
    );
  }

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
          r="45"
          fill="none"
          stroke="var(--color-gold)"
          strokeWidth="5"
        />
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
          fill="#0c0c0d"
        >
          S
        </text>
      </svg>
      {showWordmark && (
        <span className="font-display text-2xl leading-none tracking-[0.04em] text-fg">
          SIDESTREET
        </span>
      )}
    </span>
  );
}
