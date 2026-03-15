import Link from "next/link";
import HeroMarketAnimation from "@/components/HeroMarketAnimation";

interface HeroSectionProps {
  /** Eyebrow label shown above the headline */
  eyebrow?: string;
  /** Main H1 headline — split into two lines via JSX if needed */
  headline: string;
  /** Bold/accent portion of headline (rendered in cyan) */
  headlineAccent?: string;
  /** Supporting paragraph text */
  subtext: string;
  /** Primary CTA label */
  ctaLabel?: string;
  /** Primary CTA href */
  ctaHref?: string;
  /** Secondary CTA label */
  secondaryCtaLabel?: string;
  /** Secondary CTA href */
  secondaryCtaHref?: string;
  /** Whether to show the trust badges row below the CTAs */
  showTrustBadges?: boolean;
  /** Optional: render on a lighter background (for inner pages) */
  variant?: "dark" | "light";
  /** Label for "Regulated & Recognised" section */
  regulatedLabel?: string;
  /** Labels for trust badges (SEBI, IRDAI, AMFI, Client-First) */
  trustBadgeLabels?: string[];
}

const TRUST_BADGE_ICONS = ["🏛️", "🛡️", "✅", "🔒"];

export default function HeroSection({
  eyebrow = "SEBI Registered · IRDAI Authorised",
  headline,
  headlineAccent,
  subtext,
  ctaLabel = "Book a Free Consultation",
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
  showTrustBadges = true,
  variant = "dark",
  regulatedLabel = "Regulated & Recognised",
  trustBadgeLabels = [
    "SEBI Registered Adviser",
    "IRDAI Authorised POSP",
    "AMFI Registered",
    "Client-First Ethics",
  ],
}: HeroSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden ${
        isDark ? "gradient-hero text-ink" : "bg-dark-panel text-ink"
      }`}
      aria-label="Hero section"
    >
      {/* Decorative background shapes */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Primary glow — top-right, lime (XTrady base-two) */}
        <div
          className={`absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[130px] ${
            isDark ? "bg-brand-accent" : "bg-brand"
          }`}
          style={isDark ? { mixBlendMode: "screen" } : undefined}
        />
        {/* Secondary glow — bottom-left, teal (XTrady base) */}
        <div
          className={`absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full opacity-[0.10] blur-[110px] ${
            isDark ? "bg-brand" : "bg-brand-accent"
          }`}
          style={isDark ? { mixBlendMode: "screen" } : undefined}
        />
        {/* Subtle centre lime radial glow — mirrors XTrady hero::before */}
        {isDark && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(203,255,71,0.05),transparent)]" />
        )}
      </div>

      <div className="container-base relative z-10">
        {/* Two-column layout: text left, animation right (xl+ only) */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:gap-16">
          {/* Text content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            {/* Eyebrow */}
            {eyebrow && (
              <p
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full bg-dark-card border border-dark-border"
                style={{ color: "#14FF99" }}
              >
                {eyebrow}
              </p>
            )}

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 text-ink"
            >
              {headline}{" "}
              {headlineAccent && (
                <span className="gradient-text-accent">{headlineAccent}</span>
              )}
            </h1>

            {/* Subtext */}
            <p
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl text-ink-dim"
            >
              {subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              {ctaLabel && ctaHref && (
                <Link href={ctaHref} className="btn-accent">
                  {ctaLabel}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}

              {secondaryCtaLabel && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="btn-secondary border-dark-border text-ink hover:bg-dark-hover"
                >
                  {secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Trading animation — desktop only */}
          <div
            id="hero-market-animation"
            className="hidden xl:block flex-shrink-0 w-[360px] h-[280px] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(28,28,28,0.7)",
              border: "1px solid rgba(45,47,47,0.8)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6), 0 0 40px rgba(20,255,153,0.04)",
            }}
          >
            <HeroMarketAnimation />
          </div>
        </div>

        {/* Trust badges */}
        {showTrustBadges && (
          <div className="mt-12 pt-8 border-t border-dark-border">
            <p
              className="text-xs font-medium uppercase tracking-wider mb-4 text-ink-muted"
            >
              {regulatedLabel}
            </p>
            <div className="flex flex-wrap gap-4">
              {TRUST_BADGE_ICONS.map((icon, i) => (
                <div
                  key={trustBadgeLabels[i]}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-dark-card text-ink border border-dark-border"
                >
                  <span aria-hidden="true">{icon}</span>
                  {trustBadgeLabels[i]}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
