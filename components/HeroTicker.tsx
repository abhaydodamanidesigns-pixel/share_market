const TICKER_ITEMS = [
  "Mutual Funds",
  "Term Insurance",
  "Stock Advisory",
  "Asset Recovery",
  "Wealth Management",
  "IEPF Claims",
  "Tax Planning",
  "Retirement Planning",
  "SEBI Registered",
  "IRDAI Authorised",
];

// Triplicate so the -50% shift always lands on an identical copy (seamless loop)
const REPEATED = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

export default function HeroTicker() {
  return (
    <div
      className="w-full overflow-hidden border-y border-dark-border"
      style={{ background: "rgba(10, 14, 26, 0.96)" }}
      aria-hidden="true"
    >
      <div className="ticker-track flex whitespace-nowrap py-3">
        {REPEATED.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-6 text-xs font-semibold uppercase tracking-[0.15em]"
          >
            {/* diamond separator */}
            <svg
              width="8"
              height="8"
              viewBox="0 0 8 8"
              fill="currentColor"
              className="text-brand-accent opacity-50 flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M4 0L8 4L4 8L0 4Z" />
            </svg>
            <span className="text-ink-dim">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
