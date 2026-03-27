import Link from "next/link";
import type { Dictionary } from "@/src/dictionaries";

// ── SVG icons ────────────────────────────────────────────────────────────────
function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function Footer({
  locale = "en",
  dict,
}: {
  locale?: string;
  dict: Dictionary;
}) {
  const serviceLinks = dict.footer.serviceLinks;
  const companyLinks = dict.footer.companyLinks;
  const legalLinks   = dict.footer.legalLinks;

  return (
    <footer
      className="bg-dark-bg text-ink"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div className="container-base py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand column ── */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 mb-4"
              aria-label={dict.common.homeAriaLabel}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand text-white font-bold text-base">
                S
              </span>
              <span className="font-bold text-lg tracking-tight text-ink">
                {dict.common.brandName}
              </span>
            </Link>

            <p className="text-ink-dim text-sm leading-relaxed mb-5">
              {dict.footer.tagline}
            </p>

            {/* Educational platform badge — replaces former SEBI reg badge */}
            <div className="inline-block bg-dark-card border border-dark-border rounded-xl px-4 py-3">
              <p className="text-xs text-ink-muted font-medium">
                {dict.footer.platformBadge}
              </p>
              <p className="text-sm font-semibold text-brand-accent mt-0.5">
                {dict.footer.platformNote}
              </p>
            </div>
          </div>

          {/* ── Services ── */}
          <div>
            <h3 className="font-semibold text-ink text-sm uppercase tracking-wider mb-4">
              {dict.footer.ourServices}
            </h3>
            <ul className="space-y-2.5" role="list">
              {serviceLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={`/${locale}${path}`}
                    className="text-ink-dim hover:text-brand-accent text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h3 className="font-semibold text-ink text-sm uppercase tracking-wider mb-4">
              {dict.footer.company}
            </h3>
            <ul className="space-y-2.5" role="list">
              {companyLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={`/${locale}${path}`}
                    className="text-ink-dim hover:text-brand-accent text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h3 className="font-semibold text-ink text-sm uppercase tracking-wider mb-4">
              {dict.footer.legalCompliance}
            </h3>
            <ul className="space-y-2.5" role="list">
              {legalLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={`/${locale}${path}`}
                    className="text-ink-dim hover:text-brand-accent text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact block */}
            <div className="mt-6 pt-5 border-t border-dark-border">
              <p className="text-xs text-ink-muted mb-1 uppercase tracking-wide font-medium">
                {dict.footer.getInTouch}
              </p>
              <a
                href="mailto:hello@saarthi-finance.in"
                className="text-sm text-ink-dim hover:text-brand-accent transition-colors"
              >
                hello@saarthi-finance.in
              </a>
              <p className="text-sm text-ink-dim mt-1">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mandatory educational disclaimer ── */}
      <div className="border-t border-dark-border bg-dark-surface">
        <div className="container-base py-6">
          <div className="flex gap-3 items-start mb-4 p-4 rounded-xl bg-dark-card border border-dark-border">
            <IconInfo className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-ink leading-relaxed">
              We are an educational and facilitation platform. We are not a SEBI-registered Investment Adviser
              or Portfolio Manager. All market insights are for informational purposes only.
            </p>
          </div>
          <p className="text-xs text-ink-muted leading-relaxed mb-3">
            {dict.footer.disclaimer}
          </p>
          <p className="text-xs text-ink-muted leading-relaxed">
            {dict.footer.disclaimerInsurance}
          </p>
        </div>
      </div>

      {/* ── Copyright bar ── */}
      <div className="border-t border-dark-border bg-dark-bg">
        <div className="container-base py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ink-muted">
          <p>
            © {new Date().getFullYear()} {dict.common.brandName}. {dict.footer.copyright}
          </p>
          <p>{dict.footer.designedFor} Indian families.</p>
        </div>
      </div>
    </footer>
  );
}
