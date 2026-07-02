import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

/**
 * Ingest endpoint for the client analytics tracker (navigator.sendBeacon / fetch).
 * Inserts metadata-only events into `analytics_events` via the anon client (RLS
 * allows insert-only). Never trusts client-supplied lengths — everything is capped.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_TYPES = new Set([
  "session_start",
  "heartbeat",
  "scroll_depth",
  "section_view",
  "click",
  "cta_click",
  "select",
  "form_field",
]);

const str = (v: unknown, max: number): string | null => {
  if (typeof v !== "string") return null;
  const t = v.trim().slice(0, max);
  return t.length ? t : null;
};

const int = (v: unknown, min: number, max: number): number | null => {
  const n = typeof v === "number" ? v : Number(v);
  if (!Number.isFinite(n)) return null;
  return Math.min(max, Math.max(min, Math.round(n)));
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const events = (body as { events?: unknown[] })?.events;
  if (!Array.isArray(events) || events.length === 0) {
    return new NextResponse(null, { status: 204 });
  }

  const rows = events
    .slice(0, 50)
    .map((e) => {
      const ev = e as Record<string, unknown>;
      const type = str(ev.event_type, 40);
      const session = str(ev.session_id, 100);
      if (!type || !EVENT_TYPES.has(type) || !session) return null;

      // Keep the JSON detail small and string-only-ish; never store typed values.
      let detail: Record<string, unknown> = {};
      if (ev.detail && typeof ev.detail === "object" && !Array.isArray(ev.detail)) {
        const entries = Object.entries(ev.detail as Record<string, unknown>).slice(0, 12);
        detail = Object.fromEntries(
          entries.map(([k, v]) => [
            k.slice(0, 40),
            typeof v === "string" ? v.slice(0, 200) : typeof v === "number" || typeof v === "boolean" ? v : String(v).slice(0, 200),
          ])
        );
      }

      return {
        session_id: session,
        event_type: type,
        name: str(ev.name, 200),
        detail,
        path: str(ev.path, 300),
        referrer: str(ev.referrer, 500),
        user_agent: str(ev.user_agent, 500),
        viewport: str(ev.viewport, 20),
        active_ms: int(ev.active_ms, 0, 86_400_000),
        scroll_pct: int(ev.scroll_pct, 0, 100),
        source: "rate-card-landing",
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  if (rows.length === 0) return new NextResponse(null, { status: 204 });

  const supabase = getSupabaseClient();
  if (!supabase) return new NextResponse(null, { status: 204 });

  const { error } = await supabase.from("analytics_events").insert(rows);
  if (error) console.warn("[track] insert failed:", error.message);
  return new NextResponse(null, { status: 204 });
}
