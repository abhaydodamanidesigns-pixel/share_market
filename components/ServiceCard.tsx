import Link from "next/link";

interface ServiceCardProps {
  /** Icon or emoji for the service */
  icon: string;
  /** Service name */
  title: string;
  /** Brief description */
  description: string;
  /** Link to service page */
  href: string;
  /** Optional color accent (tailwind background class) */
  accentClass?: string;
  /** Optional tag/label */
  tag?: string;
  /** Optional "Learn more" link label for i18n */
  learnMoreLabel?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  href,
  accentClass = "bg-dark-card",
  tag,
  learnMoreLabel = "Learn more",
}: ServiceCardProps) {
  return (
    <article className="card group cursor-default flex flex-col h-full">
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${accentClass}`}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Tag */}
      {tag && (
        <span className="badge bg-dark-elevated text-brand-accent mb-2">{tag}</span>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold text-ink mb-2">{title}</h3>

      {/* Description */}
      <p className="text-ink-dim text-sm leading-relaxed mb-5 flex-1">
        {description}
      </p>

      {/* CTA link */}
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-brand font-semibold text-sm group-hover:text-ink transition-colors"
        aria-label={`${learnMoreLabel} about ${title}`}
      >
        {learnMoreLabel}
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </article>
  );
}
