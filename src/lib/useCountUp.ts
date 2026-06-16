"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up-on-scroll for stat strings like "160K+", "1.5M+", "50%", "€2,500".
 * Parses an optional prefix, a number (with K/M/B suffix or commas) and an
 * optional trailing suffix, then tweens 0 -> number once when it enters view.
 * Non-numeric strings (e.g. "4.9 / 5") pass through unchanged.
 */
export function useCountUp(target: string, durationMs = 1400) {
  const ref = useRef<HTMLElement | null>(null);
  const [display, setDisplay] = useState<string>(() => initial(target));

  useEffect(() => {
    const parsed = parse(target);
    // Non-numeric strings: initial state already renders `target` as-is.
    if (!parsed) return;

    const el = ref.current;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || typeof IntersectionObserver === "undefined") {
      // Show the final value without animating (async to avoid sync setState).
      const id = requestAnimationFrame(() => setDisplay(target));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;
    let started = false;
    const { prefix, value, suffix, decimals } = parsed;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setDisplay(format(prefix, value * eased, suffix, decimals));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);

  return { ref, display };
}

interface Parsed {
  prefix: string;
  value: number;
  suffix: string;
  decimals: number;
}

function parse(raw: string): Parsed | null {
  // single number with optional K/M/B and a trailing token (%, +, etc.)
  const m = raw.match(/^([^\d-]*)([\d,]+(?:\.\d+)?)\s*([KMB])?([^\d]*)$/);
  if (!m) return null;
  const [, prefix, numStr, scaleLetter, rest] = m;
  // reject things with more digits after (ratios like "4.9 / 5")
  if (/\d/.test(rest)) return null;
  const base = parseFloat(numStr.replace(/,/g, ""));
  if (Number.isNaN(base)) return null;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    prefix: prefix ?? "",
    value: base,
    suffix: `${scaleLetter ?? ""}${rest ?? ""}`,
    decimals,
  };
}

function format(prefix: string, value: number, suffix: string, decimals: number) {
  const n = value.toFixed(decimals);
  const withCommas = decimals === 0 ? Number(n).toLocaleString("en-US") : n;
  return `${prefix}${withCommas}${suffix}`;
}

function initial(target: string) {
  const parsed = parse(target);
  if (!parsed) return target;
  return format(parsed.prefix, 0, parsed.suffix, parsed.decimals);
}
