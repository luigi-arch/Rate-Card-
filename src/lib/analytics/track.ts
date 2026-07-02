/**
 * Lightweight, privacy-conscious client tracker for the rate-card page.
 *
 * - One `session_id` per visit (sessionStorage), so "time on site" is per-visit.
 * - Events are queued in memory and flushed with `navigator.sendBeacon` to
 *   `/api/track` (falls back to `fetch` + keepalive) on an interval, on tab-hide,
 *   and on page-hide.
 * - Metadata only: labels/section ids/field names — never typed input values,
 *   never click coordinates (no heatmap).
 */

export type AnalyticsEvent = {
  event_type:
    | "session_start"
    | "heartbeat"
    | "scroll_depth"
    | "section_view"
    | "click"
    | "cta_click"
    | "select"
    | "form_field";
  name?: string;
  detail?: Record<string, unknown>;
  scroll_pct?: number;
};

const SESSION_KEY = "ss_rc_session";
const ENDPOINT = "/api/track";
const FLUSH_MS = 8000;
const MAX_QUEUE = 40;

let queue: Record<string, unknown>[] = [];
let sessionId = "";
let started = false;

// Active-time accounting: only count time while the tab is visible.
let activeMs = 0;
let lastTick = 0;

function now(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

function ensureSession(): string {
  if (sessionId) return sessionId;
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) {
      sessionId = existing;
      return sessionId;
    }
  } catch {
    /* sessionStorage unavailable */
  }
  sessionId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `s_${Date.now()}_${Math.floor(now())}`;
  try {
    sessionStorage.setItem(SESSION_KEY, sessionId);
  } catch {
    /* ignore */
  }
  return sessionId;
}

function accrue() {
  if (lastTick) {
    activeMs += now() - lastTick;
    lastTick = 0;
  }
}

function baseFields() {
  return {
    session_id: ensureSession(),
    path: location.pathname,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent.slice(0, 500),
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    active_ms: Math.round(activeMs),
  };
}

const cap = (v: unknown, max = 200) =>
  typeof v === "string" ? v.slice(0, max) : v;

/** Queue an event; auto-flush when the queue is large. */
export function track(ev: AnalyticsEvent) {
  if (typeof window === "undefined") return;
  accrue();
  lastTick = now();
  queue.push({
    ...baseFields(),
    event_type: ev.event_type,
    name: ev.name != null ? cap(ev.name) : null,
    detail: ev.detail ?? {},
    scroll_pct: ev.scroll_pct ?? null,
  });
  if (queue.length >= MAX_QUEUE) flush();
}

/** Send whatever is queued. Uses sendBeacon so it survives page unload. */
export function flush() {
  if (typeof window === "undefined" || queue.length === 0) return;
  const batch = queue;
  queue = [];
  const payload = JSON.stringify({ events: batch });
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      const ok = navigator.sendBeacon(ENDPOINT, blob);
      if (ok) return;
    }
  } catch {
    /* fall through to fetch */
  }
  // Fallback — keepalive lets it complete during unload.
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    /* best-effort */
  });
}

/** Wire up global timers/visibility. Call once on mount; returns a cleanup fn. */
export function startTracking(): () => void {
  if (started || typeof window === "undefined") return () => {};
  started = true;
  ensureSession();
  lastTick = now();

  track({ event_type: "session_start" });

  const interval = window.setInterval(() => {
    accrue();
    lastTick = now();
    track({ event_type: "heartbeat" });
    flush();
  }, FLUSH_MS);

  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      accrue();
      flush();
    } else {
      lastTick = now();
    }
  };
  const onPageHide = () => {
    accrue();
    flush();
  };

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onPageHide);

  return () => {
    window.clearInterval(interval);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onPageHide);
    started = false;
  };
}
