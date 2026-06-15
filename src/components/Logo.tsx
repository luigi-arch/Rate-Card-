export default function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* crown */}
        <path
          d="M6 7.5 L9.5 10 L12.5 6 L17 9.5 L21.5 6 L24.5 10 L28 7.5 L26.5 12 L7.5 12 Z"
          fill="var(--color-gold)"
        />
        {/* badge */}
        <rect x="6" y="13" width="22" height="18" rx="5" fill="var(--color-gold)" />
        <path
          d="M21.4 19.1c-.5-1.2-1.7-2-3.4-2-2 0-3.4 1.1-3.4 2.8 0 1.5 1 2.3 3 2.8l1 .25c1 .25 1.4.5 1.4 1.05 0 .6-.6 1-1.6 1-1.1 0-1.8-.45-2.1-1.4l-2 .85c.5 1.5 1.9 2.4 4 2.4 2.3 0 3.8-1.15 3.8-3 0-1.5-.9-2.35-3-2.85l-1-.25c-1-.25-1.4-.5-1.4-1 0-.55.5-.9 1.4-.9.9 0 1.5.4 1.8 1.2z"
          fill="#0a0a0b"
        />
      </svg>
      {showWordmark && (
        <span className="font-display text-[1.15rem] font-extrabold tracking-tight text-white">
          SIDESTREET
        </span>
      )}
    </span>
  );
}
