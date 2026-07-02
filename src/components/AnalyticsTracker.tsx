"use client";

import { useEffect, useRef } from "react";
import { useSelection } from "@/context/selection";
import { startTracking, track } from "@/lib/analytics/track";

/**
 * Mounts inside <SelectionProvider>. Emits journey `select` events as the brief
 * builds, plus global engagement listeners (tracked-element clicks by label, scroll
 * depth, section views, form-field focus/complete/abandon). Metadata only — no typed
 * values, no click coordinates. Renders nothing.
 */

function labelFor(el: Element): string {
  const tracked = el.closest("[data-track]") as HTMLElement | null;
  if (tracked?.dataset.track) return tracked.dataset.track;
  const clickable = el.closest("button, a") as HTMLElement | null;
  if (!clickable) return "";
  const aria = clickable.getAttribute("aria-label");
  if (aria) return aria;
  return (clickable.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
}

function sectionOf(el: Element): string | undefined {
  return (el.closest("section[id]") as HTMLElement | null)?.id;
}

export default function AnalyticsTracker() {
  const { selected, formatEngaged, selectedPackage, selectedAddOns } = useSelection();

  // --- global listeners (mount once) ---
  useEffect(() => {
    const stop = startTracking();

    // Clicks on tracked elements — label + section only, never coordinates.
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const tracked = target.closest("[data-track]") as HTMLElement | null;
      const clickable = target.closest("button, a");
      if (!tracked && !clickable) return;
      const name = labelFor(target);
      if (!name) return;
      track({
        event_type: tracked ? "cta_click" : "click",
        name,
        detail: { section: sectionOf(target) ?? "" },
      });
    };
    document.addEventListener("click", onClick, { capture: true });

    // Scroll depth milestones (once each).
    const hit = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const m of [25, 50, 75, 100]) {
        if (pct >= m && !hit.has(m)) {
          hit.add(m);
          track({ event_type: "scroll_depth", name: `${m}%`, scroll_pct: m });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Section views (once per section).
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          const id = (en.target as HTMLElement).id;
          if (id && !seen.has(id)) {
            seen.add(id);
            track({ event_type: "section_view", name: id });
          }
        }
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("section[id]").forEach((s) => io.observe(s));

    // Form fields — name + whether filled on blur; never the typed value.
    const isField = (el: EventTarget | null): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement;
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target;
      if (!isField(el) || !el.closest("form")) return;
      track({ event_type: "form_field", name: el.name || el.id || el.type, detail: { phase: "focus" } });
    };
    const onFocusOut = (e: FocusEvent) => {
      const el = e.target;
      if (!isField(el) || !el.closest("form")) return;
      const filled = Boolean(el.value && el.value.trim());
      track({
        event_type: "form_field",
        name: el.name || el.id || el.type,
        detail: { phase: filled ? "complete" : "abandon" },
      });
    };
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);

    return () => {
      document.removeEventListener("click", onClick, { capture: true } as EventListenerOptions);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      stop();
    };
  }, []);

  // --- journey funnel: emit `select` events on brief transitions ---
  const prev = useRef({ headaches: false, format: false, pkg: false, addOns: 0 });
  useEffect(() => {
    const p = prev.current;
    if (selected.length > 0 && !p.headaches) {
      p.headaches = true;
      track({ event_type: "select", name: "headaches", detail: { count: selected.length } });
    }
    if (selected.length === 0 && p.headaches) p.headaches = false;

    if (formatEngaged && !p.format) {
      p.format = true;
      track({ event_type: "select", name: "format_engaged" });
    }

    const hasPkg = selectedPackage !== null;
    if (hasPkg && !p.pkg) {
      p.pkg = true;
      track({ event_type: "select", name: "package", detail: { package: selectedPackage ?? "" } });
    }
    if (!hasPkg && p.pkg) p.pkg = false;

    if (selectedAddOns.length > p.addOns) {
      track({ event_type: "select", name: "addon", detail: { count: selectedAddOns.length } });
    }
    p.addOns = selectedAddOns.length;
  }, [selected, formatEngaged, selectedPackage, selectedAddOns]);

  return null;
}
