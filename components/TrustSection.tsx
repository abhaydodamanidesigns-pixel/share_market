"use client";

import { motion } from "framer-motion";

// ── SVG icons for each trust pillar ──────────────────────────────────────────
function IconGradCap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
        d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-7-3.5l7 3.5 7-3.5" />
    </svg>
  );
}
function IconTrending({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
function IconLayers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
function IconHeart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
  );
}
function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function IconSupport({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

const ITEM_ICONS = [IconGradCap, IconTrending, IconLayers, IconHeart, IconCheck, IconSupport];

// ── Types ─────────────────────────────────────────────────────────────────────
interface TrustItem {
  icon?: string; // unused — we map by index
  title: string;
  description: string;
  detail?: string;
}

interface TrustSectionProps {
  items?: TrustItem[];
  title?: string;
  subtitle?: string;
  variant?: "dark" | "light";
  disclaimerText?: string;
  scoresLabel?: string;
}

const defaultTrustItems: TrustItem[] = [
  { title: "Financial Education",    description: "Market Insights Platform", detail: "Education-first approach" },
  { title: "Asset Facilitation",     description: "Insurance Education",      detail: "Facilitation partner" },
  { title: "Market Insights",        description: "Fund Facilitation",        detail: "Goal-aligned guidance" },
  { title: "Client-First",           description: "Fiduciary Ethics",         detail: "Your interest, always first" },
  { title: "Transparent Operations", description: "Zero Commission Conflicts",detail: "Fully fee-transparent" },
  { title: "Investor Support",       description: "Dedicated Support Portal", detail: "support.saarthi-finance.in" },
];

// ── Animation helpers ─────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Animation variants ────────────────────────────────────────────────────────
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT_EXPO } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function TrustSection({
  items = defaultTrustItems,
  title = "Transparent. Trusted. Education-First.",
  subtitle = "We operate with complete transparency so you can focus on what matters — your financial wellbeing.",
  variant = "light",
  disclaimerText = "We are a financial education and facilitation platform. All content is for informational purposes only. For any concerns, contact",
  scoresLabel = "our support team",
}: TrustSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`section-padding ${isDark ? "mesh-bg-dark" : "bg-dark-surface"}`}
      aria-labelledby="trust-section-heading"
    >
      <div className="container-base">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 id="trust-section-heading" className="section-heading">
            {title}
          </h2>
          <p className="section-subheading mx-auto text-center mt-4">{subtitle}</p>
        </div>

        {/* Trust grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          role="list"
          aria-label="Platform credentials"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {items.map(({ title: itemTitle, description, detail }, i) => {
            const Icon = ITEM_ICONS[i % ITEM_ICONS.length];
            return (
              <motion.div
                key={itemTitle}
                role="listitem"
                variants={cardVariants}
                className="glass-card rounded-2xl p-5 text-center hover:shadow-card-hover transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-dark-elevated flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-brand-accent" />
                </div>
                <p className="font-semibold text-sm text-ink">{itemTitle}</p>
                <p className="text-xs mt-1 text-ink-dim">{description}</p>
                {detail && (
                  <p className="text-xs mt-1.5 font-medium text-brand-accent">{detail}</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Educational disclaimer note */}
        <p className="text-center text-xs mt-8 max-w-2xl mx-auto leading-relaxed text-ink-muted">
          {disclaimerText}{" "}
          <a
            href="mailto:hello@saarthi-finance.in"
            className="underline text-brand hover:text-brand-accent transition-colors"
          >
            {scoresLabel}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
