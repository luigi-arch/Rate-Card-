import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/admin-auth";
import { getAdminClient } from "@/lib/supabase/admin";
import AnalyticsDashboard, {
  type AnalyticsData,
} from "@/components/cms/AnalyticsDashboard";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Row = {
  session_id: string;
  event_type: string;
  name: string | null;
  active_ms: number | null;
  scroll_pct: number | null;
  created_at: string;
  detail: Record<string, unknown> | null;
};

function aggregate(rows: Row[]): AnalyticsData {
  const sessions = new Map<
    string,
    { activeMs: number; scroll: number; types: Set<string>; names: Set<string> }
  >();
  const topClicks = new Map<string, number>();
  const fields = new Map<string, { complete: number; abandon: number; focus: number }>();

  for (const r of rows) {
    let s = sessions.get(r.session_id);
    if (!s) {
      s = { activeMs: 0, scroll: 0, types: new Set(), names: new Set() };
      sessions.set(r.session_id, s);
    }
    s.activeMs = Math.max(s.activeMs, r.active_ms ?? 0);
    s.scroll = Math.max(s.scroll, r.scroll_pct ?? 0);
    s.types.add(r.event_type);
    if (r.name) s.names.add(`${r.event_type}:${r.name}`);

    if ((r.event_type === "click" || r.event_type === "cta_click") && r.name) {
      topClicks.set(r.name, (topClicks.get(r.name) ?? 0) + 1);
    }
    if (r.event_type === "form_field" && r.name) {
      const f = fields.get(r.name) ?? { complete: 0, abandon: 0, focus: 0 };
      const phase = (r.detail?.phase as string) ?? "";
      if (phase === "complete") f.complete++;
      else if (phase === "abandon") f.abandon++;
      else f.focus++;
      fields.set(r.name, f);
    }
  }

  const all = [...sessions.values()];
  const total = all.length || 1;
  const has = (pred: (s: (typeof all)[number]) => boolean) => all.filter(pred).length;

  const funnel = [
    { label: "Visited", count: all.length },
    { label: "Picked headaches", count: has((s) => s.names.has("select:headaches")) },
    { label: "Diagnosed", count: has((s) => s.names.has("cta_click:Diagnose me")) },
    { label: "Viewed prescription", count: has((s) => s.names.has("cta_click:Get my prescription")) },
    {
      label: "Built brief",
      count: has(
        (s) =>
          s.names.has("select:format_engaged") ||
          s.names.has("select:package") ||
          s.names.has("select:addon")
      ),
    },
    {
      label: "Reached brief form",
      count: has((s) => s.names.has("section_view:contact") || s.types.has("form_field")),
    },
  ];

  const scrollBuckets = [25, 50, 75, 100].map((m) => ({
    label: `${m}%`,
    count: has((s) => s.scroll >= m),
  }));

  const avgActiveMs = all.reduce((a, s) => a + s.activeMs, 0) / total;

  return {
    sessionCount: all.length,
    eventCount: rows.length,
    avgActiveSeconds: Math.round(avgActiveMs / 1000),
    funnel,
    scrollBuckets,
    topClicks: [...topClicks.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, count]) => ({ name, count })),
    formFields: [...fields.entries()]
      .map(([name, f]) => ({ name, ...f }))
      .sort((a, b) => b.complete + b.abandon - (a.complete + a.abandon)),
  };
}

export default async function AnalyticsPage() {
  if (!(await isAdminAuthed())) redirect("/admin/login");

  const supabase = getAdminClient();
  let data: AnalyticsData | null = null;
  let error: string | null = null;

  if (!supabase) {
    error = "SUPABASE_SERVICE_ROLE_KEY is not set — analytics can't be read.";
  } else {
    const { data: rows, error: err } = await supabase
      .from("analytics_events")
      .select("session_id,event_type,name,active_ms,scroll_pct,created_at,detail")
      .order("created_at", { ascending: false })
      .limit(10000);
    if (err) error = err.message;
    else data = aggregate((rows ?? []) as Row[]);
  }

  return <AnalyticsDashboard data={data} error={error} />;
}
