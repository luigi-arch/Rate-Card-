/**
 * Animated "headache" brain: a pulsing brain with client problems
 * drifting out of it. Pure CSS animation (respects reduced-motion).
 */

const THOUGHTS: {
  label: string;
  className: string; // position
  dur: string;
  delay: string;
  hideOnMobile?: boolean;
}[] = [
  {
    label: "“People don’t understand what we do”",
    className: "left-0 top-4 sm:top-6",
    dur: "5.5s",
    delay: "0s",
  },
  {
    label: "“We feel corporate and out of touch”",
    className: "right-0 top-2 sm:top-4",
    dur: "6.2s",
    delay: "0.6s",
  },
  {
    label: "“People don’t feel our impact”",
    className: "left-2 top-1/2 -translate-y-1/2",
    dur: "5.8s",
    delay: "1.1s",
    hideOnMobile: true,
  },
  {
    label: "“Our leadership feels distant”",
    className: "right-1 top-1/2 -translate-y-1/2",
    dur: "6.6s",
    delay: "0.3s",
    hideOnMobile: true,
  },
  {
    label: "“People don’t know what to do”",
    className: "left-4 bottom-6 sm:bottom-10",
    dur: "6s",
    delay: "1.4s",
  },
  {
    label: "“We need authentic engagement”",
    className: "right-3 bottom-4 sm:bottom-8",
    dur: "5.3s",
    delay: "0.9s",
  },
];

export default function BrainAnimation() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-3xl select-none sm:h-[420px]">
      {/* pulsing glow */}
      <div
        aria-hidden
        className="animate-brain-glow pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 rounded-full blur-3xl sm:h-72 sm:w-72"
        style={{ background: "var(--color-gold)" }}
      />

      {/* radial emanation lines */}
      <svg
        aria-hidden
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-20 sm:h-[360px] sm:w-[360px]"
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x1 = 200 + Math.cos(angle) * 70;
          const y1 = 200 + Math.sin(angle) * 70;
          const x2 = 200 + Math.cos(angle) * 185;
          const y2 = 200 + Math.sin(angle) * 185;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--color-gold)"
              strokeWidth="1"
              strokeDasharray="2 7"
            />
          );
        })}
      </svg>

      {/* brain */}
      <div className="animate-brain-throb absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <svg
          width="220"
          height="190"
          viewBox="0 0 240 200"
          fill="none"
          aria-hidden
          className="h-auto w-[160px] sm:w-[210px]"
        >
          <g
            stroke="var(--color-gold)"
            strokeWidth="3.5"
            fill="rgba(255,182,0,0.06)"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* left hemisphere */}
            <path d="M118 32 C 96 18, 60 22, 50 44 C 30 48, 22 72, 34 88 C 20 100, 26 124, 44 132 C 46 154, 72 166, 94 158 C 106 170, 118 166, 118 150 Z" />
            {/* right hemisphere */}
            <path d="M122 32 C 144 18, 180 22, 190 44 C 210 48, 218 72, 206 88 C 220 100, 214 124, 196 132 C 194 154, 168 166, 146 158 C 134 170, 122 166, 122 150 Z" />
            {/* inner gyri — left */}
            <path d="M72 60 C 86 64, 80 80, 94 84" />
            <path d="M56 98 C 72 98, 70 112, 88 114" />
            <path d="M76 132 C 88 126, 94 136, 106 132" />
            {/* inner gyri — right */}
            <path d="M168 60 C 154 64, 160 80, 146 84" />
            <path d="M184 98 C 168 98, 170 112, 152 114" />
            <path d="M164 132 C 152 126, 146 136, 134 132" />
          </g>
        </svg>

        {/* pain sparks */}
        <span
          className="animate-spark absolute -left-3 -top-2 text-gold"
          style={{ "--dur": "2.2s" } as React.CSSProperties}
          aria-hidden
        >
          <Spark />
        </span>
        <span
          className="animate-spark absolute -right-2 top-2 text-gold"
          style={{ "--dur": "2.8s", "--delay": "0.5s" } as React.CSSProperties}
          aria-hidden
        >
          <Spark />
        </span>
      </div>

      {/* floating thoughts */}
      {THOUGHTS.map((t) => (
        <div
          key={t.label}
          className={`absolute ${t.className} ${
            t.hideOnMobile ? "hidden sm:block" : ""
          }`}
        >
          <span
            className="animate-thought inline-flex max-w-[44vw] items-center gap-2 rounded-full border border-line-strong bg-surface/80 px-3.5 py-2 text-xs font-medium text-muted shadow-lg backdrop-blur-sm sm:max-w-none sm:text-sm"
            style={
              { "--dur": t.dur, "--delay": t.delay } as React.CSSProperties
            }
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {t.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function Spark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2 L4 14 h6 l-1 8 9-12 h-6 z" />
    </svg>
  );
}
