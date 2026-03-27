"use client";

import { motion } from "framer-motion";

// ── Step icons keyed by step number ──────────────────────────────────────────
function IconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}
function IconMap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6-10l6-3m0 13l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
    </svg>
  );
}
function IconCog({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

const STEP_ICONS = [IconTarget, IconMap, IconCog, IconUsers];

// ── Animation helper ─────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Types ────────────────────────────────────────────────────────────────────
interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon?: string; // kept for backwards compat; ignored in favour of index icon
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  layout?: "horizontal" | "vertical";
}

// ── StepCard sub-component ────────────────────────────────────────────────────
function StepCard({ step, index, layout }: { step: ProcessStep; index: number; layout: "horizontal" | "vertical" }) {
  const Icon = STEP_ICONS[index % STEP_ICONS.length];

  if (layout === "vertical") {
    return (
      <motion.li
        className="relative flex gap-6 pb-10 last:pb-0"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_OUT_EXPO }}
      >
        {/* Vertical connector */}
        {index < 3 && (
          <div className="absolute left-6 top-12 bottom-0 w-px bg-dark-border" aria-hidden="true" />
        )}
        {/* Step circle */}
        <span className="flex-shrink-0 w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-card z-10">
          <Icon className="w-5 h-5" />
        </span>
        {/* Content */}
        <div className="pt-1">
          <h3 className="text-lg font-semibold text-ink mb-1.5">{step.title}</h3>
          <p className="text-sm text-ink-dim leading-relaxed">{step.description}</p>
        </div>
      </motion.li>
    );
  }

  return (
    <motion.li
      className="relative flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: EASE_OUT_EXPO }}
    >
      {/* Connector line (desktop only) */}
      {index < 3 && (
        <div
          className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-dark-border to-transparent z-0"
          aria-hidden="true"
          style={{ transform: "translateX(1rem)" }}
        />
      )}

      {/* Step circle */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <span className="flex-shrink-0 w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-card">
          <Icon className="w-5 h-5" />
        </span>
        <div className="h-px flex-1 bg-dark-border lg:hidden" aria-hidden="true" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-ink mb-2">{step.title}</h3>
      <p className="text-sm text-ink-dim leading-relaxed">{step.description}</p>
    </motion.li>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProcessTimeline({
  steps,
  title = "How We Work Together",
  subtitle = "A clear, structured process so you always know what to expect.",
  layout = "horizontal",
}: ProcessTimelineProps) {
  return (
    <section className="section-padding bg-dark-surface" aria-labelledby="process-heading">
      <div className="container-base">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 id="process-heading" className="section-heading">{title}</h2>
          <p className="section-subheading mx-auto text-center mt-4">{subtitle}</p>
        </div>

        <ol
          className={
            layout === "horizontal"
              ? "relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              : "relative max-w-2xl mx-auto space-y-0"
          }
          aria-label="Process steps"
        >
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} layout={layout} />
          ))}
        </ol>
      </div>
    </section>
  );
}
