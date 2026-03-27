"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /**
   * dark  → gradient-navy (blends between bg tokens — self-switches)
   * light → bg-dark-surface token (self-switches)
   * gold  → bg-dark-card token with top border (self-switches)
   */
  variant?: "dark" | "light" | "gold";
  note?: string;
}

export default function CTASection({
  title = "Ready to Take the First Step?",
  subtitle =
    "Book a free 30-minute consultation. No commitment. No jargon. Just an honest conversation about your financial goals.",
  ctaLabel = "Book Free Consultation",
  ctaHref = "/contact",
  secondaryLabel = "Explore Our Services",
  secondaryHref = "/learn",
  variant = "dark",
  note = "No commitment required · Free first session · Education-first approach",
}: CTASectionProps) {
  /*
   * All three variants use Tailwind classes backed by CSS variables.
   * bg-dark-surface, bg-dark-card etc. now point to var(--color-dark-surface)
   * which holds the light value (#F8FAFC) in light mode and the dark value
   * (#111827) in dark mode — automatically, with zero extra logic here.
   */
  const sectionClass = {
    dark:  "gradient-navy",
    light: "bg-dark-surface",
    gold:  "bg-dark-card border-t border-dark-border",
  }[variant];

  return (
    <section
      className={`section-padding ${sectionClass}`}
      aria-labelledby="cta-heading"
    >
      <div className="container-base text-center">

        <motion.h2
          id="cta-heading"
          className="section-heading text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
        >
          {title}
        </motion.h2>

        <motion.p
          className="section-subheading text-lg max-w-xl mx-auto mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT_EXPO }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href={ctaHref} className="btn-accent">
              {ctaLabel}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </Link>
          </motion.div>

          {secondaryLabel && secondaryHref && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {/* btn-secondary uses var(--color-dark-border) and var(--color-ink) — self-switching */}
              <Link href={secondaryHref} className="btn-secondary">
                {secondaryLabel}
              </Link>
            </motion.div>
          )}
        </motion.div>

        {note && (
          <p className="text-xs mt-6" style={{ color: "var(--color-ink-muted)" }}>
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
