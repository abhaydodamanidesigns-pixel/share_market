import Link from "next/link";

interface HeroSectionProps {
  /** Eyebrow label shown above the headline */
  eyebrow?: string;
  /** Main H1 headline — split into two lines via JSX if needed */
  headline: string;
  /** Bold/accent portion of headline (rendered in gold) */
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
        isDark ? "gradient-navy text-white" : "bg-surface-50 text-navy-900"
      }`}
      aria-label="Hero section"
    >
      {/* Decorative background shapes */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl ${
            isDark ? "bg-gold-400" : "bg-navy-300"
          }`}
        />
        <div
          className={`absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl ${
            isDark ? "bg-blue-400" : "bg-gold-300"
          }`}
        />
      </div>

      <div className="container-base relative z-10">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          {eyebrow && (
            <p
              className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1.5 rounded-full ${
                isDark
                  ? "bg-white/10 text-gold-300 border border-white/10"
                  : "bg-navy-50 text-navy-700 border border-navy-100"
              }`}
            >
              {eyebrow}
            </p>
          )}

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5 ${
              isDark ? "text-white" : "text-navy-900"
            }`}
          >
            {headline}{" "}
            {headlineAccent && (
              <span className="text-gold-400">{headlineAccent}</span>
            )}
          </h1>

          {/* Subtext */}
          <p
            className={`text-lg md:text-xl leading-relaxed mb-8 max-w-2xl ${
              isDark ? "text-navy-200" : "text-gray-600"
            }`}
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
                className={`btn-secondary ${
                  isDark
                    ? "border-white/30 text-white hover:bg-white/10"
                    : ""
                }`}
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>

        {/* Trust badges */}
        {showTrustBadges && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <p
              className={`text-xs font-medium uppercase tracking-wider mb-4 ${
                isDark ? "text-navy-400" : "text-gray-400"
              }`}
            >
              {regulatedLabel}
            </p>
            <div className="flex flex-wrap gap-4">
              {TRUST_BADGE_ICONS.map((icon, i) => (
                <div
                  key={trustBadgeLabels[i]}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${
                    isDark
                      ? "bg-white/8 text-white border border-white/10"
                      : "bg-white text-navy-800 border border-gray-200 shadow-sm"
                  }`}
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
