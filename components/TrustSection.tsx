interface TrustItem {
  icon: string;
  title: string;
  description: string;
  detail?: string;
}

const defaultTrustItems: TrustItem[] = [
  {
    icon: "🏛️",
    title: "SEBI Registered",
    description: "Investment Adviser",
    detail: "Reg. No. INA000XXXXXX",
  },
  {
    icon: "🛡️",
    title: "IRDAI Authorised",
    description: "Insurance POSP",
    detail: "POSP Code: XXXXXXXX",
  },
  {
    icon: "📋",
    title: "AMFI Registered",
    description: "Mutual Fund Distributor",
    detail: "ARN: XXXXXXX",
  },
  {
    icon: "🔒",
    title: "Client-First",
    description: "Fiduciary Ethics",
    detail: "Your interest, always first",
  },
  {
    icon: "🏢",
    title: "BSE Member",
    description: "Member ID: XXXXXX",
    detail: "For advisory reference only",
  },
  {
    icon: "📞",
    title: "SEBI Grievance",
    description: "SCORES Portal",
    detail: "scores.gov.in",
  },
];

interface TrustSectionProps {
  items?: TrustItem[];
  title?: string;
  subtitle?: string;
  variant?: "dark" | "light";
  disclaimerText?: string;
  scoresLabel?: string;
}

export default function TrustSection({
  items = defaultTrustItems,
  title = "Regulated. Transparent. Trustworthy.",
  subtitle = "We operate under strict regulatory oversight so you can focus on what matters — your financial wellbeing.",
  variant = "light",
  disclaimerText = "Registration with SEBI does not guarantee the quality of advice or returns. Investors should independently evaluate advice. For grievances, contact ",
  scoresLabel = "SCORES",
}: TrustSectionProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`section-padding ${isDark ? "gradient-navy" : "bg-dark-surface"}`}
      aria-labelledby="trust-section-heading"
    >
      <div className="container-base">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="trust-section-heading"
            className="section-heading"
          >
            {title}
          </h2>
          <p className="section-subheading mx-auto text-center mt-4">
            {subtitle}
          </p>
        </div>

        {/* Trust grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          role="list"
          aria-label="Regulatory credentials"
        >
          {items.map(({ icon, title: itemTitle, description, detail }) => (
            <div
              key={itemTitle}
              role="listitem"
              className="rounded-2xl p-5 text-center transition-shadow hover:shadow-card bg-dark-card border border-dark-border"
            >
              <span
                className="text-3xl mb-3 block"
                aria-hidden="true"
              >
                {icon}
              </span>
              <p className="font-semibold text-sm text-ink">
                {itemTitle}
              </p>
              <p className="text-xs mt-1 text-ink-dim">
                {description}
              </p>
              {detail && (
                <p className="text-xs mt-1.5 font-medium text-brand-accent">
                  {detail}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* SEBI disclaimer note */}
        <p className="text-center text-xs mt-8 max-w-2xl mx-auto leading-relaxed text-ink-muted">
          {disclaimerText}{" "}
          <a
            href="https://scores.sebi.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-brand"
          >
            {scoresLabel}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
