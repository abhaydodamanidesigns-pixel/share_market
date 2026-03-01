import Link from "next/link";
import type { Dictionary } from "@/src/dictionaries";

export default function Footer({
  locale = "en",
  dict,
}: {
  locale?: string;
  dict: Dictionary;
}) {
  const serviceLinks = dict.footer.serviceLinks;
  const companyLinks = dict.footer.companyLinks;
  const legalLinks = dict.footer.legalLinks;
  return (
    <footer
      className="bg-navy-900 text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main footer content */}
      <div className="container-base py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 mb-4"
              aria-label={dict.common.homeAriaLabel}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gold-500 text-navy-900 font-bold text-base">
                S
              </span>
              <span className="font-bold text-lg tracking-tight text-white">
                {dict.common.brandName}
              </span>
            </Link>

            <p className="text-navy-200 text-sm leading-relaxed mb-5">
              {dict.footer.tagline}
            </p>

            {/* SEBI registration badge */}
            <div className="inline-block bg-navy-800 border border-navy-700 rounded-xl px-4 py-3">
              <p className="text-xs text-navy-300 font-medium">
                {dict.footer.sebiRegNo}
              </p>
              <p className="text-sm font-bold text-gold-400 mt-0.5">
                INA000XXXXXX
              </p>
              <p className="text-xs text-navy-300 mt-1">
                {dict.footer.amfiArn}
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              {dict.footer.ourServices}
            </h3>
            <ul className="space-y-2.5" role="list">
              {serviceLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={`/${locale}${path}`}
                    className="text-navy-300 hover:text-gold-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              {dict.footer.company}
            </h3>
            <ul className="space-y-2.5" role="list">
              {companyLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={`/${locale}${path}`}
                    className="text-navy-300 hover:text-gold-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              {dict.footer.legalCompliance}
            </h3>
            <ul className="space-y-2.5" role="list">
              {legalLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    href={`/${locale}${path}`}
                    className="text-navy-300 hover:text-gold-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact block */}
            <div className="mt-6 pt-5 border-t border-navy-700">
              <p className="text-xs text-navy-400 mb-1 uppercase tracking-wide font-medium">
                {dict.footer.getInTouch}
              </p>
              <a
                href="mailto:hello@saarthi-finance.in"
                className="text-sm text-navy-300 hover:text-gold-400 transition-colors"
              >
                hello@saarthi-finance.in
              </a>
              <p className="text-sm text-navy-300 mt-1">
                +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance disclaimer */}
      <div className="border-t border-navy-800">
        <div className="container-base py-6">
          <p className="text-xs text-navy-400 leading-relaxed mb-3">
            {dict.footer.disclaimer}
          </p>
          <p className="text-xs text-navy-400 leading-relaxed">
            {dict.footer.disclaimerInsurance}
          </p>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-navy-800 bg-navy-950">
        <div className="container-base py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-navy-400">
          <p>
            © {new Date().getFullYear()} {dict.common.brandName}. {dict.footer.copyright}
          </p>
          <p>
            {dict.footer.designedFor}{" "}
            <a
              href="https://www.sebi.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-300 hover:text-gold-400 transition-colors"
            >
              SEBI
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.irdai.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-300 hover:text-gold-400 transition-colors"
            >
              IRDAI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
