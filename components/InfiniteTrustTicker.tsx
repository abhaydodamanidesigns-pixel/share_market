/**
 * InfiniteTrustTicker
 * ────────────────────────────────────────────────────────────────────────────
 * Lifecycle Mission ribbon — seamless infinite scroll, full light/dark support.
 *
 * HOW THE SEAMLESS LOOP WORKS
 * ───────────────────────────
 * The track contains TWO identical copies of the item list side-by-side.
 * Total track width = 2× one copy.
 * The @keyframes ticker-scroll shifts by translateX(-50%) = exactly one copy.
 * When the animation resets to 0 the viewport position is visually identical
 * to the end-state → zero jump, zero blank gap.
 *
 * THEME
 * ─────
 * Every colour uses a semantic CSS variable defined in globals.css:
 *   --bg-surface    → white / deep-slate   (controlled by :root / .dark)
 *   --text-secondary → slate / silver
 *   --border         → light-gray / dark-slate
 * No hardcoded hex values anywhere → light/dark mode works automatically.
 *
 * ANIMATION
 * ─────────
 * Uses .ticker-track class (defined in globals.css) so the keyframe is
 * guaranteed to be in the stylesheet regardless of Tailwind purging.
 * Hover pauses the animation so users can read individual items.
 *
 * ACCESSIBILITY
 * ─────────────
 * • Outer <section> has role="marquee" + aria-label for screen readers.
 * • Copy A is readable by AT.
 * • Copy B has aria-hidden="true" — screen readers skip the duplicate.
 * • Emojis are wrapped in aria-hidden <span> so AT uses the text label.
 */

/* ── Content ─────────────────────────────────────────────────────────────── */
interface TickerItem {
  emoji: string;
  label: string;
}

const TICKER_ITEMS: TickerItem[] = [
  { emoji: "👨‍👩‍👧‍👦", label: "Securing Indian Families"     },
  { emoji: "📈",    label: "Goal-Based Investing"        },
  { emoji: "🛡️",   label: "Unbiased Term Insurance"     },
  { emoji: "📜",    label: "IEPF Claim Experts"          },
  { emoji: "🔄",    label: "Seamless Asset Transmission" },
];

/* ── Vertical divider ────────────────────────────────────────────────────── */
function Divider() {
  return (
    <span
      aria-hidden="true"
      style={{
        display:         "inline-block",
        width:           "1px",
        height:          "12px",
        flexShrink:      0,
        backgroundColor: "var(--border)",
        opacity:         0.7,
        margin:          "0 2rem",
        verticalAlign:   "middle",
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
        fontSize:      "0.7rem",
        fontWeight:    600,
        letterSpacing: "0.09em",
        textTransform: "uppercase",
        color:         "var(--text-secondary)",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: "1rem", lineHeight: 1 }}>
        {emoji}
      </span>
      {label}
    </span>
  );
}

/* ── One full copy of all items + dividers ───────────────────────────────── */
function TickerRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="inline-flex items-center flex-shrink-0"
      aria-hidden={ariaHidden ?? undefined}
      /* Padding on each end so items don't sit flush against the fade mask */
      style={{ padding: "0 2.5rem" }}
    >
      {TICKER_ITEMS.map((item) => (
        <span key={item.label} className="inline-flex items-center">
          <TickerItemNode {...item} />
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
      role="marquee"
      aria-label="Saarthi Finance — lifecycle mission highlights"
      style={{
        position:        "relative",
        /* overflow-hidden MUST be on this element — stops the scrolling track
           from creating a horizontal scrollbar on mobile */
        overflow:        "hidden",
        backgroundColor: "var(--bg-surface)",
        borderTop:       "1px solid var(--border)",
        borderBottom:    "1px solid var(--border)",
        /* Smooth colour transition when the user toggles the theme */
        transition:      [
          "background-color 400ms cubic-bezier(0.4,0,0.2,1)",
          "border-color     400ms cubic-bezier(0.4,0,0.2,1)",
        ].join(", "),
      }}
    >
      {/* ── Left edge fade-out mask ── */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          left:          0,
          top:           0,
          bottom:        0,
          width:         "5rem",
          zIndex:        10,
          pointerEvents: "none",
          background:    "linear-gradient(to right, var(--bg-surface) 10%, transparent 100%)",
          transition:    "background 400ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/* ── Right edge fade-out mask ── */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          right:         0,
          top:           0,
          bottom:        0,
          width:         "5rem",
          zIndex:        10,
          pointerEvents: "none",
          background:    "linear-gradient(to left, var(--bg-surface) 10%, transparent 100%)",
          transition:    "background 400ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      {/*
       * ── Moving track ──────────────────────────────────────────────────────
       * .ticker-track is defined in globals.css with @keyframes ticker-scroll.
       * Using a CSS class (not a Tailwind utility) guarantees the keyframe
       * exists in the stylesheet regardless of Tailwind's content scanning.
       *
       * "w-max" (Tailwind) = width: max-content — lets the flex row expand
       * beyond the viewport without wrapping, which is required for the scroll.
       */}
      <div
        className="ticker-track w-max flex items-center"
        style={{ paddingBlock: "0.7rem" }}
      >
        {/* Copy A — read by screen readers */}
        <TickerRow />

        {/* Copy B — identical, hidden from screen readers */}
        <TickerRow ariaHidden />
      </div>
    </section>
  );
}
