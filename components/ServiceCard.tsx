"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ── Icon components ─────────────────────────────────────────────────────── */
function IconBook({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}
type IconProps = { className?: string; style?: React.CSSProperties };

function IconTrendingUp({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}
function IconShield({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function IconRefresh({ className, style }: IconProps) {
  return (
    <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

type IconKey = "book" | "chart" | "shield" | "refresh";

const ICON_MAP: Record<IconKey, (p: IconProps) => JSX.Element> = {
  book:    IconBook,
  chart:   IconTrendingUp,
  shield:  IconShield,
  refresh: IconRefresh,
};

/* Icon accent tints — semi-transparent so they adapt to both bg colours */
const ICON_ACCENT: Record<string, { color: string; bg: string }> = {
  book:    { color: "var(--color-brand)",    bg: "rgba(59,130,246,0.12)"  },
  chart:   { color: "var(--color-positive)", bg: "rgba(21,128,61,0.12)"   },
  shield:  { color: "#D97706",               bg: "rgba(217,119,6,0.12)"   },
  refresh: { color: "var(--color-negative)", bg: "rgba(185,28,28,0.12)"   },
};

/* ── Animation ─────────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardReveal = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ── Props ─────────────────────────────────────────────────────────────── */
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  accentClass?: string;
  tag?: string;
  learnMoreLabel?: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENT
   ─────────────────────────────────────────────────────────────────────────
   Background, border, and text all use CSS variable-backed tokens so the
   card is transparent to the theme — no dark: modifier needed.
   ═══════════════════════════════════════════════════════════════════════════ */
export default function ServiceCard({
  icon,
  title,
  description,
  href,
  tag,
  learnMoreLabel = "Learn more",
}: ServiceCardProps) {
  const Icon    = ICON_MAP[icon as IconKey] ?? IconBook;
  const accent  = ICON_ACCENT[icon] ?? ICON_ACCENT.book;
  const cardRef = useRef<HTMLElement>(null);

  return (
    <motion.article
      ref={cardRef}
      className="relative flex flex-col h-full rounded-2xl p-6 cursor-default"
      style={{
        backgroundColor: "var(--color-dark-card)",
        border:          "1px solid var(--color-dark-border)",
        boxShadow:       "var(--shadow-card)",
        transition: [
          "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1)",
          "box-shadow       300ms cubic-bezier(0.4, 0, 0.2, 1)",
          "border-color     300ms cubic-bezier(0.4, 0, 0.2, 1)",
        ].join(", "),
      }}
      variants={cardReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => {
        const el = cardRef.current as HTMLElement | null;
        if (el) {
          el.style.backgroundColor = "var(--color-dark-hover)";
          el.style.borderColor     = "var(--color-ink-muted)";
          el.style.boxShadow       = "var(--shadow-card-hover)";
        }
      }}
      onHoverEnd={() => {
        const el = cardRef.current as HTMLElement | null;
        if (el) {
          el.style.backgroundColor = "var(--color-dark-card)";
          el.style.borderColor     = "var(--color-dark-border)";
          el.style.boxShadow       = "var(--shadow-card)";
        }
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
        style={{ backgroundColor: accent.bg }}
        aria-hidden="true"
      >
        <Icon className="w-6 h-6" style={{ color: accent.color } as React.CSSProperties} />
      </div>

      {/* Tag */}
      {tag && (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2"
          style={{
            backgroundColor: "var(--color-dark-hover)",
            color:           "var(--color-brand)",
          }}
        >
          {tag}
        </span>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-ink)" }}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--color-ink-dim)" }}>
        {description}
      </p>

      {/* CTA link */}
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
        style={{ color: "var(--color-brand)" }}
        aria-label={`${learnMoreLabel} about ${title}`}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-brand-accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-brand)";        }}
      >
        {learnMoreLabel}
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.article>
  );
}
