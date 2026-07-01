"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { toEmbedUrl } from "@/lib/embed";

/**
 * "See example" overlay: an iPhone mockup that plays an uploaded MP4 (muted, looping)
 * or shows an embed (YouTube/Vimeo/Instagram). Clicking an uploaded video — or the
 * "Open ↗" button — navigates to the chosen link. Built from scratch (no modal lib):
 * a portal to <body>, ESC + backdrop close, scroll-lock, and a11y dialog semantics.
 */
export default function ExampleModal({
  title,
  videoUrl,
  embedUrl,
  link,
  onClose,
}: {
  title: string;
  videoUrl?: string;
  embedUrl?: string;
  link?: string;
  onClose: () => void;
}) {
  // This component only ever mounts from a client-side click (it's rendered behind an
  // open flag that starts false), so `document` is always available here.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const href = link || embedUrl || videoUrl;
  const open = () => {
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — example`}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-black/75 p-6 backdrop-blur-sm animate-fade-in"
    >
      {/* header */}
      <div
        className="flex w-full max-w-sm items-center justify-between text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display text-xl tracking-wide">{title}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="press flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:text-white"
        >
          ✕
        </button>
      </div>

      {/* iPhone mockup */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative aspect-[9/19] w-[270px] rounded-[2.6rem] border-[10px] border-zinc-900 bg-black shadow-2xl ring-1 ring-white/10 sm:w-[300px]"
      >
        {/* notch */}
        <div className="absolute left-1/2 top-0 z-10 h-6 w-1/3 -translate-x-1/2 rounded-b-2xl bg-zinc-900" />
        {/* screen */}
        <div className="h-full w-full overflow-hidden rounded-[1.9rem] bg-black">
          {videoUrl ? (
            <button
              type="button"
              onClick={open}
              className="group relative block h-full w-full"
              aria-label={href ? `Watch ${title}` : title}
            >
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
              {href && (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-1.5 bg-gradient-to-t from-black/70 to-transparent pb-5 pt-10 text-xs font-bold uppercase tracking-wide text-white opacity-90 transition-opacity group-hover:opacity-100">
                  Tap to watch ↗
                </span>
              )}
            </button>
          ) : embedUrl ? (
            <iframe
              src={toEmbedUrl(embedUrl)}
              title={`${title} — example`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-6 text-center text-sm text-white/60">
              No example available yet.
            </div>
          )}
        </div>
      </div>

      {/* open link */}
      {href && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
          className="press rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-[1.03]"
        >
          Open ↗
        </button>
      )}
    </div>,
    document.body
  );
}
