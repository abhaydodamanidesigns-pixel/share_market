import Link from "next/link";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Dark / surface / elevated-card background */
  variant?: "dark" | "light" | "gold";
  /** Optional note below CTAs (e.g. "No commitment. Free first session.") */
  note?: string;
}

export default function CTASection({
  title = "Ready to Take the First Step?",
  subtitle =
    "Book a free 30-minute consultation. No commitment. No jargon. Just a honest conversation about your financial goals.",
  ctaLabel = "Book Free Consultation",
  ctaHref = "/contact",
  secondaryLabel = "Learn About Our Services",
  secondaryHref = "/learn",
  variant = "dark",
  note = "No commitment required · Free first session · SEBI Regulated",
}: CTASectionProps) {
  const classes = {
    dark: {
      section: "gradient-navy",
      heading: "text-ink",
      sub:     "text-ink-dim",
      note:    "text-ink-muted",
    },
    light: {
      section: "bg-dark-surface",
      heading: "text-ink",
      sub:     "text-ink-dim",
      note:    "text-ink-muted",
    },
    gold: {
      section: "bg-dark-card border-t border-dark-border",
      heading: "text-ink",
      sub:     "text-ink-dim",
      note:    "text-ink-muted",
    },
  }[variant];

  return (
    <section
      className={`section-padding ${classes.section}`}
      aria-labelledby="cta-heading"
    >
      <div className="container-base text-center">
        <h2
          id="cta-heading"
          className={`text-3xl md:text-4xl font-bold mb-4 ${classes.heading}`}
        >
          {title}
        </h2>

        <p className={`text-lg max-w-xl mx-auto mb-8 leading-relaxed ${classes.sub}`}>
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </Link>

          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="btn-secondary border-dark-border text-ink hover:bg-dark-hover"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>

        {note && (
          <p className={`text-xs mt-6 ${classes.note}`}>{note}</p>
        )}
      </div>
    </section>
  );
}
