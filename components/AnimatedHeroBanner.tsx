"use client";

/**
 * AnimatedHeroBanner
 * ──────────────────────────────────────────────────────────────────────────
 * Premium hero with:
 *  • Ambient mesh gradient background (3 slowly-drifting radial blobs)
 *  • Left column — staggered entrance, dual CTAs, trust chips
 *  • Right column — glassmorphic portfolio dashboard (bar chart + donut + micro-cards)
 *
 * RESPONSIVE BEHAVIOUR
 * ────────────────────
 * Mobile  (<lg): stacked layout, text centred, dashboard shown at 80% scale
 *                below the CTAs. No min-h-screen — section is content-height.
 * Desktop (≥lg): side-by-side grid, text left-aligned, card at full size.
 *                min-h-screen restored so the hero fills the viewport.
 *
 * All colours use CSS variables — fully cascade-safe for light/dark mode.
 */

import Link from "next/link";
import { motion } from "framer-motion";

/* ── Types ──────────────────────────────────────────────────────────────── */
export interface AnimatedHeroBannerProps {
  eyebrow:           string;
  headline:          string;
  headlineAccent:    string;
  subtext:           string;
  ctaLabel:          string;
  ctaHref:           string;
  secondaryCtaLabel: string;
  secondaryCtaHref:  string;
  portfolioLabel?:   string;
  portfolioValue?:   string;
  portfolioGrowth?:  string;
}

/* ── Animation constants ─────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/* ── Bar chart data ──────────────────────────────────────────────────────── */
const BARS = [
  { heightPct: 45, delay: "0.4s"  },
  { heightPct: 72, delay: "0.55s" },
  { heightPct: 58, delay: "0.7s"  },
  { heightPct: 88, delay: "0.85s" },
  { heightPct: 64, delay: "1.0s"  },
];

/* ── Donut chart (r=38, circumference ≈ 239) ────────────────────────────── */
const DONUT_R = 38;
const DONUT_C = Math.round(2 * Math.PI * DONUT_R); // 239
const DONUT_SEGMENTS = [
  { pct: 0.45, color: "var(--color-brand)",   delay: "0.9s",  label: "Mutual Funds" },
  { pct: 0.28, color: "#A78BFA",              delay: "1.1s",  label: "Insurance"    },
  { pct: 0.17, color: "var(--color-positive)",delay: "1.3s",  label: "Equity"       },
  { pct: 0.10, color: "#F59E0B",              delay: "1.5s",  label: "Other"        },
];

/* ── Floating micro-cards ────────────────────────────────────────────────── */
const MICRO_CARDS = [
  { emoji: "🔒",    label: "Fiduciary Duty First",  animation: "animate-bob-up",   delay: "0s"   },
  { emoji: "👨‍👩‍👧‍👦", label: "Securing Families",     animation: "animate-bob-down", delay: "0.6s" },
  { emoji: "₹",    label: "IEPF Claims Reclaimed", animation: "animate-bob-up",   delay: "1.2s" },
];

/* ── Trust chips ─────────────────────────────────────────────────────────── */
const TRUST_CHIPS = ["SEBI RIA", "IRDAI POSP", "AMFI Registered", "Fiduciary First"];

/* ══════════════════════════════════════════════════════════════════════════
   DONUT CHART
   ══════════════════════════════════════════════════════════════════════════ */
function DonutChart() {
  let cumulativePct = 0;

  return (
    <div className="relative flex flex-col items-center flex-shrink-0">
      <svg
        width={90}
        height={90}
        viewBox="0 0 100 100"
        aria-label="Portfolio allocation donut chart"
        role="img"
      >
        {/* Track ring */}
        <circle
          cx={50} cy={50} r={DONUT_R}
          fill="none"
          stroke="var(--color-dark-border)"
          strokeWidth={10}
        />
        {DONUT_SEGMENTS.map((seg, i) => {
          const dashLen    = Math.round(seg.pct * DONUT_C);
          const gapLen     = DONUT_C - dashLen;
          const rotationDeg = -90 + cumulativePct * 360;
          cumulativePct += seg.pct;
          return (
            <circle
              key={i}
              cx={50} cy={50} r={DONUT_R}
              fill="none"
              stroke={seg.color}
              strokeWidth={10}
              strokeLinecap="butt"
              strokeDasharray={`${dashLen} ${gapLen}`}
              strokeDashoffset={DONUT_C}
              transform={`rotate(${rotationDeg} 50 50)`}
              style={{ animation: `drawChart 0.8s cubic-bezier(0.4,0,0.2,1) ${seg.delay} forwards` }}
            />
          );
        })}
        <text x={50} y={47} textAnchor="middle" fontSize={9} fontWeight={600}
          fill="var(--color-ink-dim)" fontFamily="Inter, system-ui, sans-serif">Mix</text>
        <text x={50} y={58} textAnchor="middle" fontSize={8}
          fill="var(--color-ink-muted)" fontFamily="Inter, system-ui, sans-serif">2025</text>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-1.5">
        {DONUT_SEGMENTS.map((seg) => (
          <span
            key={seg.label}
            className="inline-flex items-center gap-1"
            style={{ fontSize: "0.55rem", color: "var(--color-ink-dim)", fontWeight: 600 }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            {seg.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   DASHBOARD CARD
   ══════════════════════════════════════════════════════════════════════════ */
function DashboardCard({
  portfolioLabel,
  portfolioValue,
  portfolioGrowth,
}: {
  portfolioLabel?: string;
  portfolioValue?: string;
  portfolioGrowth?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1     }}
      transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
      className="relative w-full mx-auto"
      /* max-w narrows the card on mobile so it looks purposefully compact */
      style={{ maxWidth: "min(340px, 100%)" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-3xl blur-3xl"
        style={{ background: "var(--ambient-glow)", transform: "scale(1.15)" }}
      />

      {/* Glass shell */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background:          "var(--glass-bg)",
          border:              "1px solid var(--glass-border)",
          backdropFilter:      "blur(20px)",
          WebkitBackdropFilter:"blur(20px)",
          boxShadow:           "var(--shadow-card-hover)",
        }}
      >
        {/* Card header */}
        <div
          className="px-4 pt-4 pb-3 lg:px-5 lg:pt-5 lg:pb-4"
          style={{ borderBottom: "1px solid var(--glass-border)", background: "var(--glass-inner)" }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{ color: "var(--color-ink-muted)" }}
          >
            {portfolioLabel ?? "Total AUM Facilitated"}
          </p>
          <div className="flex items-end gap-3">
            <p className="text-xl lg:text-2xl font-bold tabular-nums" style={{ color: "var(--color-ink)" }}>
              {portfolioValue ?? "₹ 24.6 Cr"}
            </p>
            <span className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-positive)" }}>
              {portfolioGrowth ?? "+18.4%"}
            </span>
          </div>
        </div>

        {/* Charts */}
        <div className="px-4 py-3 lg:px-5 lg:py-4 flex flex-col gap-4">
          {/* Bar chart */}
          <div>
            <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--color-ink-muted)" }}>
              Monthly Investments
            </p>
            <div className="flex items-end gap-1.5 h-16 lg:h-20">
              {BARS.map((bar, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md"
                  style={{
                    height:          `${bar.heightPct}%`,
                    background:      i === 3 ? "var(--color-brand)" : "var(--bar-color-a)",
                    animation:       `barGrow 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${bar.delay} both`,
                    transformOrigin: "bottom",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Donut + micro-cards */}
          <div className="flex items-start gap-3">
            <DonutChart />
            <div className="flex flex-col gap-1.5 flex-1 min-w-0">
              {MICRO_CARDS.map(({ emoji, label, animation, delay }) => (
                <div key={label} className={animation} style={{ animationDelay: delay }}>
                  <div
                    className="flex items-center gap-2 rounded-xl px-2.5 py-1.5"
                    style={{
                      background:     "var(--micro-card-bg)",
                      border:         "1px solid var(--micro-card-border)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span style={{ fontSize: "0.875rem", lineHeight: 1, flexShrink: 0 }} aria-hidden="true">
                      {emoji}
                    </span>
                    <span
                      className="text-xs font-semibold leading-tight truncate"
                      style={{ color: "var(--color-ink-dim)" }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════════════ */
export default function AnimatedHeroBanner({
  eyebrow,
  headline,
  headlineAccent,
  subtext,
  ctaLabel,
  ctaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  portfolioLabel,
  portfolioValue,
  portfolioGrowth,
}: AnimatedHeroBannerProps) {
  return (
    <section
      /*
       * MOBILE:  content-driven height (py-16), no min-h-screen → no phantom space
       * DESKTOP: min-h-screen + flex items-center → hero fills the viewport
       */
      className="relative overflow-hidden py-16 sm:py-20 lg:min-h-screen lg:flex lg:items-center lg:py-0"
      style={{ background: "var(--color-dark-bg)" }}
      aria-labelledby="hero-headline"
    >
      {/* ── Ambient mesh blobs ─────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute animate-mesh-1"
          style={{
            width: "55%", height: "55%", top: "-10%", left: "-5%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, var(--hero-blob-1) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute animate-mesh-2"
          style={{
            width: "45%", height: "45%", top: "20%", right: "-5%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, var(--hero-blob-2) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute animate-mesh-3"
          style={{
            width: "40%", height: "40%", bottom: "-10%", left: "30%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse at center, var(--hero-blob-3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="container-base w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left — text column ─────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            /*
             * Mobile: centred text + centred flex children
             * Desktop: left-aligned
             */
            className="flex flex-col items-center lg:items-start gap-5 lg:gap-6
                       text-center lg:text-left"
          >
            {/* Eyebrow badge */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                           text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "var(--color-dark-card)",
                  border:     "1px solid var(--color-dark-border)",
                  color:      "var(--color-brand)",
                  boxShadow:  "var(--shadow-card)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                  style={{ background: "var(--color-positive)" }}
                  aria-hidden="true"
                />
                {eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-headline"
              variants={itemVariants}
              className="text-hero"
              style={{ color: "var(--color-ink)" }}
            >
              {headline}{" "}
              <span className="hero-accent-text">{headlineAccent}</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed lg:max-w-lg"
              style={{ color: "var(--color-ink-dim)" }}
            >
              {subtext}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4 pt-1"
            >
              <Link href={ctaHref} className="btn-primary group" style={{ minWidth: "9rem" }}>
                {ctaLabel}
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href={secondaryCtaHref} className="btn-secondary" style={{ minWidth: "9rem" }}>
                {secondaryCtaLabel}
              </Link>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center lg:justify-start gap-2 lg:gap-3"
            >
              {TRUST_CHIPS.map((label) => (
                <span
                  key={label}
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: "var(--color-dark-card)",
                    border:     "1px solid var(--color-dark-border)",
                    color:      "var(--color-ink-dim)",
                  }}
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — dashboard card ──────────────────────────────────── */}
          {/*
           * Always rendered (never hidden). On mobile it sits naturally below
           * the text column at a slightly narrower max-width (340 px cap inside
           * DashboardCard). On desktop it gets the full second grid column.
           */}
          <div className="flex justify-center lg:block">
            <DashboardCard
              portfolioLabel={portfolioLabel}
              portfolioValue={portfolioValue}
              portfolioGrowth={portfolioGrowth}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
