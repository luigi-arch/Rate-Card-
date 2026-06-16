"use client";

import { AUDIENCE } from "@/lib/content";
import { useCountUp } from "@/lib/useCountUp";

/* ---- a single count-up number ---- */
export function CountStat({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const { ref, display } = useCountUp(value);
  return (
    <span
      ref={ref as React.Ref<HTMLSpanElement>}
      className={className}
    >
      {display}
    </span>
  );
}

/* ---- brand glyphs ---- */
function IGIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
    </svg>
  );
}
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.5 3c.32 2.2 1.78 3.84 3.9 4.06v2.45c-1.45.04-2.79-.4-3.9-1.16v5.9a5.35 5.35 0 1 1-5.35-5.35c.3 0 .6.03.9.08v2.52a2.86 2.86 0 1 0 2.01 2.73V3h2.44z" />
    </svg>
  );
}
function FBIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M13.5 21v-7h2.3l.43-3h-2.73V9.06c0-.86.27-1.45 1.5-1.45h1.36V4.94c-.66-.09-1.4-.13-2.06-.13-2.07 0-3.49 1.26-3.49 3.58V11H8.5v3h2.31v7h2.69z" />
    </svg>
  );
}

const PLATFORM: Record<
  string,
  { icon: React.FC<{ className?: string }>; handle: string; accent: string; ring: string }
> = {
  Instagram: { icon: IGIcon, handle: "@sidestreetmalta", accent: "text-[#E1306C]", ring: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
  TikTok: { icon: TikTokIcon, handle: "@sidestreet", accent: "text-fg", ring: "from-[#25F4EE] to-[#FE2C55]" },
  Facebook: { icon: FBIcon, handle: "/sidestreetmalta", accent: "text-[#1877F2]", ring: "from-[#1877F2] to-[#1877F2]" },
};

/* ---- the headline stat bar (social "insights") ---- */
export function StatBar({ dark = false }: { dark?: boolean }) {
  return (
    <dl
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4 ${
        dark ? "bg-white/10" : "bg-line"
      }`}
    >
      {AUDIENCE.headline.map((s) => (
        <div
          key={s.label}
          className={`flex flex-col items-center px-4 py-6 text-center ${
            dark ? "bg-ink" : "bg-paper"
          }`}
        >
          <CountStat
            value={s.value}
            className={`font-display text-4xl leading-none sm:text-5xl ${
              dark ? "text-white" : "text-fg"
            }`}
          />
          <dt className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
            {s.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

/* ---- the per-platform follower cards ---- */
export function PlatformCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {AUDIENCE.channels.map((c) => {
        const p = PLATFORM[c.name];
        const Icon = p?.icon ?? IGIcon;
        return (
          <div
            key={c.name}
            className="hover-lift card flex items-center gap-4 p-5"
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br p-[2px] ${
                p?.ring ?? "from-line to-line"
              }`}
            >
              <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-paper">
                <Icon className={`h-6 w-6 ${p?.accent ?? "text-fg"}`} />
              </span>
            </span>
            <div className="min-w-0">
              <CountStat
                value={c.value}
                className="font-display text-3xl leading-none text-fg"
              />
              <p className="truncate text-xs text-muted">{p?.handle ?? c.name}</p>
            </div>
            <span className="ml-auto text-[0.6rem] font-bold uppercase tracking-[0.14em] text-muted-2">
              {c.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
