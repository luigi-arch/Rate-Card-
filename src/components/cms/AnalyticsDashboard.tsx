import { signOutAction } from "@/app/admin/actions";

export type AnalyticsData = {
  sessionCount: number;
  eventCount: number;
  avgActiveSeconds: number;
  funnel: { label: string; count: number }[];
  scrollBuckets: { label: string; count: number }[];
  topClicks: { name: string; count: number }[];
  formFields: { name: string; complete: number; abandon: number; focus: number }[];
};

function fmtDuration(sec: number): string {
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}m ${s}s`;
}

function Bar({ pct }: { pct: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-paper-2">
      <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
    </div>
  );
}

export default function AnalyticsDashboard({
  data,
  error,
}: {
  data: AnalyticsData | null;
  error: string | null;
}) {
  const base = data?.funnel[0]?.count || 1;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="font-display text-2xl tracking-[0.04em]">
            SIDE<span className="text-gold">STREET</span> ANALYTICS
          </p>
          <p className="text-xs text-muted">How visitors interact with the rate card</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <a href="/admin" className="press rounded-full border border-line px-4 py-2 hover:border-fg">
            ← Back to CMS
          </a>
          <a href="/" target="_blank" className="press rounded-full border border-line px-4 py-2 hover:border-fg">
            View site ↗
          </a>
          <form action={signOutAction}>
            <button className="press rounded-full border border-line px-4 py-2 hover:border-fg">
              Sign out
            </button>
          </form>
        </div>
      </header>

      {error ? (
        <div className="mt-8 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : !data || data.eventCount === 0 ? (
        <div className="mt-8 rounded-xl border border-line bg-surface p-6 text-sm text-muted">
          No analytics captured yet. Visit the live site and interact with it — events
          appear here within a few seconds.
        </div>
      ) : (
        <div className="mt-8 space-y-10">
          {/* stat tiles */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Sessions", value: data.sessionCount.toLocaleString() },
              { label: "Avg. time on site", value: fmtDuration(data.avgActiveSeconds) },
              { label: "Events captured", value: data.eventCount.toLocaleString() },
            ].map((t) => (
              <div key={t.label} className="rounded-2xl border border-line bg-surface p-5">
                <p className="text-xs uppercase tracking-wide text-muted-2">{t.label}</p>
                <p className="mt-1 font-display text-4xl leading-none text-fg">{t.value}</p>
              </div>
            ))}
          </div>

          {/* funnel */}
          <section>
            <h2 className="font-display text-2xl text-fg">Journey funnel</h2>
            <div className="mt-4 space-y-3">
              {data.funnel.map((step) => {
                const pct = Math.round((step.count / base) * 100);
                return (
                  <div key={step.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="font-medium text-fg">{step.label}</span>
                      <span className="text-muted-2">
                        {step.count} · {pct}%
                      </span>
                    </div>
                    <Bar pct={pct} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* scroll depth */}
          <section>
            <h2 className="font-display text-2xl text-fg">Scroll depth</h2>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {data.scrollBuckets.map((b) => {
                const pct = Math.round((b.count / base) * 100);
                return (
                  <div key={b.label} className="rounded-xl border border-line bg-surface p-4 text-center">
                    <p className="font-display text-3xl text-fg">{pct}%</p>
                    <p className="text-xs text-muted-2">reached {b.label}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* top clicks + form fields */}
          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <h2 className="font-display text-2xl text-fg">Top clicks</h2>
              <ul className="mt-4 space-y-2">
                {data.topClicks.length === 0 && (
                  <li className="text-sm text-muted-2">No clicks recorded yet.</li>
                )}
                {data.topClicks.map((c) => (
                  <li
                    key={c.name}
                    className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2 text-sm"
                  >
                    <span className="truncate text-fg">{c.name}</span>
                    <span className="shrink-0 font-semibold text-muted-2">{c.count}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl text-fg">Form fields</h2>
              <p className="mt-1 text-xs text-muted-2">
                Interaction only — no typed values are stored.
              </p>
              <table className="mt-3 w-full text-sm">
                <thead>
                  <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted-2">
                    <th className="py-2">Field</th>
                    <th className="py-2 text-right">Completed</th>
                    <th className="py-2 text-right">Abandoned</th>
                  </tr>
                </thead>
                <tbody>
                  {data.formFields.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-2 text-muted-2">
                        No form activity yet.
                      </td>
                    </tr>
                  )}
                  {data.formFields.map((f) => (
                    <tr key={f.name} className="border-b border-line/60">
                      <td className="py-2 text-fg">{f.name}</td>
                      <td className="py-2 text-right text-fg">{f.complete}</td>
                      <td className="py-2 text-right text-muted-2">{f.abandon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
