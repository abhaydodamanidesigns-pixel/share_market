/**
 * InfiniteTrustTicker
 * ────────────────────────────────────────────────────────────────────────────
 * A slow-moving, premium institutional ribbon.
 *
 * HOW THE SEAMLESS LOOP WORKS
 * ───────────────────────────
 * The moving track holds two identical copies of the item list side-by-side.
 * The track's total width is therefore exactly 2× the content width.
 * The CSS @keyframes moves the track by  translateX(-50%) — which is exactly
 * one full copy's worth of distance.  When the animation resets to 0, the
 * visual position is indistinguishable from the end-state, so there is no
 * jump or blank gap.
 *
 *   ┌──────────────────────────────────────────────────────────────────┐
 *   │  [ Copy A — 50% of track ]  [ Copy B — 50% of track — aria-hidden ] │
 *   └──────────────────────────────────────────────────────────────────┘
 *        ←─────────── translateX(-50%) ────────────→
 *
 * ACCESSIBILITY
 * ─────────────
 * • The outer <section> has role="marquee" and aria-label so AT announces it.
 * • Copy A is read once by screen readers.
 * • Copy B carries aria-hidden="true" — screen readers skip the duplicate.
 * • Each item's emoji is wrapped in <span aria-hidden> so AT uses the text.
 *
 * THEME
 * ─────
 * All colours use the global CSS variable tokens defined in globals.css, so
 * the ticker is correct in both Light and Dark mode with no extra logic.
 */

/* ── Ticker items ────────────────────────────────────────────────────────── */
interface TickerItem {
  emoji: string;
  label: string;
}

const TICKER_ITEMS: TickerItem[] = [
  { emoji: "👨‍👩‍👧‍👦", label: "Securing Indian Families"    },
  { emoji: "📈",         label: "Goal-Based Investing"       },
  { emoji: "🛡️",        label: "Unbiased Term Insurance"    },
  { emoji: "📜",         label: "IEPF Claim Experts"         },
  { emoji: "🔄",         label: "Seamless Asset Transmission" },
];

/* ── Vertical divider between items ─────────────────────────────────────── */
function Divider() {
  return (
    <span
      aria-hidden="true"
      style={{
        display:         "block",
        width:           "1px",
        height:          "14px",
        flexShrink:      0,
        backgroundColor: "var(--color-dark-border)",
        opacity:         0.6,
        margin:          "0 2rem",
      }}
    />
  );
}

/* ── Single item ─────────────────────────────────────────────────────────── */
function TickerItemNode({ emoji, label }: TickerItem) {
  return (
    <span
      className="inline-flex items-center gap-2.5 whitespace-nowrap"
      style={{
        fontSize:      "0.72rem",            /* slightly smaller than text-sm */
        fontWeight:    600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color:         "var(--color-ink-dim)",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "1rem", lineHeight: 1 }}>
        {emoji}
      </span>
      {label}
    </span>
  );
}

/* ── One full copy of all items with dividers ────────────────────────────── */
function TickerRow({ ariaHidden }: { ariaHidden?: true }) {
  return (
    <div
      className="flex items-center"
      aria-hidden={ariaHidden}
      /* Extra leading/trailing padding so the first item isn't flush
         against the edge-fade mask after translateX wraps */
      style={{ padding: "0 3rem" }}
    >
      {TICKER_ITEMS.map((item, i) => (
        <span key={item.label} className="inline-flex items-center">
          <TickerItemNode {...item} />
          {/* Divider after every item — including the last, because Copy B
              immediately follows Copy A so a divider is still needed there */}
          <Divider />
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function InfiniteTrustTicker() {
  return (
    <section
      aria-label="Saarthi Finance — lifecycle mission highlights"
      role="marquee"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-dark-surface)",
        borderTop:       "1px solid var(--color-dark-border)",
        borderBottom:    "1px solid var(--color-dark-border)",
        /* Transition so it switches cleanly with the global theme toggle */
        transition: "background-color 400ms cubic-bezier(0.4,0,0.2,1), border-color 400ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* ── Left edge fade mask — hides the hard cut-off ── */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width:      "6rem",
          background: "linear-gradient(to right, var(--color-dark-surface) 10%, transparent 100%)",
        }}
      />

      {/* ── Right edge fade mask ── */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width:      "6rem",
          background: "linear-gradient(to left, var(--color-dark-surface) 10%, transparent 100%)",
        }}
      />

      {/*
       * ── Moving track ──────────────────────────────────────────────────────
       * width: max-content keeps the flex row from wrapping.
       * animation: ticker 35s linear infinite — slow, deliberate pace.
       * hover:[animation-play-state:paused] is Tailwind's arbitrary CSS
       * property syntax; Tailwind compiles it to:
       *   .hover\:...:hover { animation-play-state: paused }
       * Users can hover anywhere on the ribbon to freeze and read a service.
       */}
      <div
        className="flex items-center w-max animate-ticker hover:[animation-play-state:paused]"
        style={{ paddingBlock: "0.75rem" }}
        /* Intentionally no aria role here — the outer <section> is the AT anchor */
      >
        {/* Copy A — read by screen readers */}
        <TickerRow />

        {/* Copy B — visually identical, hidden from screen readers */}
        <TickerRow ariaHidden />
      </div>
    </section>
  );
}
