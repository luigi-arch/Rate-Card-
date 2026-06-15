import { CLIENTS } from "@/lib/content";

export default function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="border-b border-line py-14">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="eyebrow mb-8 text-center">Trusted by leading brands</p>
      </div>
      <div className="marquee relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
        <div className="marquee-track gap-3 px-3">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap rounded-xl border border-line bg-surface px-6 py-3.5 font-display text-base font-bold text-muted"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
