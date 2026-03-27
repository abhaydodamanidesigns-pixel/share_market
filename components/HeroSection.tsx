"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Premium easing ─────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── Staggered item variant factory ──────────────────────────────────────── */
const itemVariant = (delay: number) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  },
});

const badgeVariant = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE, delay: 0.75 } },
};

/* ── Badge icon components ─────────────────────────────────────────────── */
function IconBook({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
function IconTrendingUp({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
function IconLayers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
function IconAward({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}
function ArrowRight() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

const BADGE_ICONS = [IconBook, IconTrendingUp, IconLayers, IconAward];

/* ═══════════════════════════════════════════════════════════════════════════
   SVG LIVE CHART — The "animated financial draw" right column
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Key data points for the trendline (viewport: 360 × 220).
 * Values represent a steady wealth-growth trajectory with realistic variance.
 */
const CHART_DATA = [
  [0,   185], [30,  170], [60,  178], [90,  145],
  [120, 155], [155, 120], [185, 130], [215, 95],
  [248, 105], [275, 72],  [305, 82],  [332, 55],
  [360, 42],
] as [number, number][];

/** Build a smooth cubic-bezier SVG path string from the data points */
function buildSmoothPath(points: [number, number][]): string {
  if (points.length < 2) return "";
  const d: string[] = [`M ${points[0][0]},${points[0][1]}`];
  for (let i = 1; i < points.length; i++) {
    const prev  = points[i - 1];
    const curr  = points[i];
    const cpX   = (prev[0] + curr[0]) / 2;
    d.push(`C ${cpX},${prev[1]} ${cpX},${curr[1]} ${curr[0]},${curr[1]}`);
  }
  return d.join(" ");
}

/** Area fill path: trendline + back along bottom */
function buildAreaPath(points: [number, number][], h = 220): string {
  const line = buildSmoothPath(points);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L ${last[0]},${h} L ${first[0]},${h} Z`;
}

const TRENDLINE_PATH = buildSmoothPath(CHART_DATA);
const AREA_PATH      = buildAreaPath(CHART_DATA);

/* Highlight dots at key inflection points */
const MARKER_POINTS = [CHART_DATA[3], CHART_DATA[7], CHART_DATA[11]] as [number, number][];

/* ── HeroChart component ─────────────────────────────────────────────────── */
function HeroChart() {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(800); // initial estimate
  const [ready, setReady] = useState(false);

  /* Measure real path length after mount for accurate dash offset */
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
      setReady(true);
    }
  }, []);

  return (
    <div className="relative w-full h-full" aria-hidden="true">

      {/* ── Ambient pulse — blurred radial glow behind the chart ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          style={{
            width:  "260px",
            height: "260px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.28) 0%, transparent 70%)",
            filter: "blur(48px)",
            animation: "ambientPulse 8s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Chart container ── */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">

        {/* Header row */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-medium" style={{ color: "var(--color-ink-muted)" }}>
              Portfolio Value
            </p>
            <p
              className="text-xl font-bold tabular-nums"
              style={{ color: "var(--color-ink)" }}
            >
              ₹ 42,30,000
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ backgroundColor: "rgba(21,128,61,0.12)", color: "var(--color-positive)" }}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
            +18.4% YTD
          </span>
        </div>

        {/* SVG Chart */}
        <svg
          viewBox="0 0 360 220"
          preserveAspectRatio="none"
          className="w-full flex-1"
          style={{ minHeight: "120px" }}
        >
          <defs>
            {/* Area fill gradient */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(59,130,246,0.20)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0.00)" />
            </linearGradient>
            {/* Grid line color */}
          </defs>

          {/* Subtle horizontal grid lines */}
          {[55, 100, 145, 190].map((y) => (
            <line
              key={y}
              x1="0" y1={y} x2="360" y2={y}
              stroke="var(--color-dark-border)"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              opacity="0.5"
            />
          ))}

          {/* Area fill — renders at full immediately, no animation needed */}
          <path
            d={AREA_PATH}
            fill="url(#areaGradient)"
            opacity="0.6"
          />

          {/* ── THE TRENDLINE — draws from left to right on load ── */}
          <path
            ref={pathRef}
            d={TRENDLINE_PATH}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={ready ? {
              strokeDasharray: pathLength,
              strokeDashoffset: 0,
              animation: `drawChart 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both`,
              /* Set initial dashoffset via JS to pathLength then let CSS reset it */
            } : {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
              animation: `drawChart 1.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards`,
            }}
          />

          {/* Marker dots at key inflection points */}
          {MARKER_POINTS.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="var(--color-dark-bg)"
              stroke="var(--color-brand)"
              strokeWidth="2"
              className="chart-marker"
              style={{ animationDelay: `${1.4 + i * 0.12}s` }}
            />
          ))}

          {/* End-point live dot */}
          <circle
            cx={CHART_DATA[CHART_DATA.length - 1][0]}
            cy={CHART_DATA[CHART_DATA.length - 1][1]}
            r="5"
            fill="var(--color-brand)"
            className="chart-marker"
            style={{ animationDelay: "1.8s" }}
          />
          {/* Live pulse ring */}
          <circle
            cx={CHART_DATA[CHART_DATA.length - 1][0]}
            cy={CHART_DATA[CHART_DATA.length - 1][1]}
            r="10"
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="1"
            opacity="0.4"
            className="chart-marker"
            style={{
              animationDelay: "1.9s",
              animation: "ambientPulse 2.5s ease-in-out 1.9s infinite",
            }}
          />
        </svg>

        {/* Footer row — bottom stats */}
        <div
          className="flex items-center justify-between pt-2 mt-1"
          style={{ borderTop: "1px solid var(--color-dark-border)" }}
        >
          {[
            { label: "1M",   value: "+2.1%" },
            { label: "3M",   value: "+5.8%" },
            { label: "6M",   value: "+11.2%" },
            { label: "YTD",  value: "+18.4%" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-xs tabular-nums" style={{ color: "var(--color-ink-muted)" }}>
                {label}
              </p>
              <p
                className="text-xs font-semibold tabular-nums"
                style={{ color: "var(--color-positive)" }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION PROPS
   ═══════════════════════════════════════════════════════════════════════════ */
interface HeroSectionProps {
  eyebrow?: string;
  headline: string;
  /** The accented portion rendered with brand gradient (e.g. "Indian Families") */
  headlineAccent?: string;
  subtext: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  showTrustBadges?: boolean;
  regulatedLabel?: string;
  trustBadgeLabels?: string[];
  /** Legacy API compat — theme is now global */
  variant?: "dark" | "light";
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO SECTION COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export default function HeroSection({
  eyebrow = "Financial Education · Market Insights · Asset Facilitation",
  headline,
  headlineAccent,
  subtext,
  ctaLabel = "Book a Free Consultation",
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
  showTrustBadges = true,
  regulatedLabel = "Trusted & Transparent",
  trustBadgeLabels = [
    "Financial Education",
    "Market Insights",
    "Asset Facilitation",
    "Wealth Frameworks",
  ],
}: HeroSectionProps) {
  return (
    <section
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden"
      style={{ backgroundColor: "var(--color-dark-bg)" }}
      aria-label="Hero section"
    >
      {/* Dark mode: ambient blue spotlight radial behind hero text */}
      <div className="hero-spotlight absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Subtle corner glows — work in both modes at low opacity */}
      <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 65%)" }}
        aria-hidden="true"
      />
      <div className="absolute bottom-0 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(29,78,216,0.04) 0%, transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="container-base relative z-10">
        <div className="flex flex-col xl:flex-row xl:items-center xl:gap-16">

          {/* ── LEFT: Text content — staggered reveal ── */}
          <div className="flex-1 min-w-0 max-w-3xl">

            {/* Eyebrow — delay 0ms */}
            {eyebrow && (
              <motion.p
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase
                           tracking-widest mb-5 px-3 py-1.5 rounded-full border"
                style={{
                  backgroundColor: "var(--color-dark-hover)",
                  color:           "var(--color-brand)",
                  borderColor:     "var(--color-dark-border)",
                }}
                variants={itemVariant(0)}
                initial="hidden"
                animate="visible"
              >
                {eyebrow}
              </motion.p>
            )}

            {/* Headline — delay 150ms */}
            <motion.h1
              className="text-hero font-extrabold leading-none mb-5"
              style={{ color: "var(--color-ink)" }}
              variants={itemVariant(0.15)}
              initial="hidden"
              animate="visible"
            >
              {headline}{" "}
              {headlineAccent && (
                <span className="hero-accent-text">{headlineAccent}</span>
              )}
            </motion.h1>

            {/* Sub-headline — delay 300ms */}
            <motion.p
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
              style={{ color: "var(--color-ink-dim)" }}
              variants={itemVariant(0.3)}
              initial="hidden"
              animate="visible"
            >
              {subtext}
            </motion.p>

            {/* CTAs — delay 450ms */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              variants={itemVariant(0.45)}
              initial="hidden"
              animate="visible"
            >
              {ctaLabel && ctaHref && (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link href={ctaHref} className="btn-primary inline-flex">
                    {ctaLabel}
                    <ArrowRight />
                  </Link>
                </motion.div>
              )}
              {secondaryCtaLabel && secondaryCtaHref && (
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Link href={secondaryCtaHref} className="btn-secondary inline-flex">
                    {secondaryCtaLabel}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* ── RIGHT: Animated financial chart — desktop only ── */}
          <motion.div
            variants={itemVariant(0.2)}
            initial="hidden"
            animate="visible"
            className="hidden xl:block flex-shrink-0 w-[380px] h-[260px] rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-dark-card)",
              border:          "1px solid var(--color-dark-border)",
              boxShadow:       "var(--shadow-card-hover)",
            }}
          >
            <HeroChart />
          </motion.div>
        </div>

        {/* ── Trust badges ── */}
        {showTrustBadges && (
          <motion.div
            className="mt-12 pt-8"
            style={{ borderTop: "1px solid var(--color-dark-border)" }}
            variants={badgeVariant}
            initial="hidden"
            animate="visible"
          >
            <p
              className="text-xs font-medium uppercase tracking-wider mb-4"
              style={{ color: "var(--color-ink-muted)" }}
            >
              {regulatedLabel}
            </p>
            <div className="flex flex-wrap gap-3">
              {trustBadgeLabels.map((label, i) => {
                const Icon = BADGE_ICONS[i] ?? IconBook;
                return (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border"
                    style={{
                      backgroundColor: "var(--color-dark-card)",
                      borderColor:     "var(--color-dark-border)",
                      color:           "var(--color-ink)",
                      boxShadow:       "var(--shadow-card)",
                    }}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {label}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
