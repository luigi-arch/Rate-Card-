import { CLIENTS } from "@/lib/content";

export default function Clients() {
  const row = [...CLIENTS, ...CLIENTS];
  return (
    <section className="bg-white py-14 text-zinc-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
          Trusted by leading brands
        </p>
      </div>
      <div className="marquee relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
        <div className="marquee-track gap-3 px-3">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="whitespace-nowrap rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-3.5 font-display text-base font-bold text-zinc-700"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
