import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compliance & Disclosures — SEBI, IRDAI & Regulatory Information",
  description:
    "Saarthi Finance compliance and disclosure page. SEBI registration details, SEBI RIA disclosures, IRDAI POSP information, privacy policy, terms of use, and grievance redressal mechanism.",
};

const sections = [
  { id: "sebi", label: "SEBI Disclosures" },
  { id: "irdai", label: "IRDAI & Insurance" },
  { id: "risks", label: "Risk Disclosures" },
  { id: "fees", label: "Fee Disclosures" },
  { id: "privacy", label: "Privacy Policy" },
  { id: "terms", label: "Terms of Use" },
  { id: "grievance", label: "Grievance Redressal" },
];

export default function CompliancePage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <>
      {/* Page header */}
      <section className="gradient-navy text-ink pt-28 pb-12">
        <div className="container-base">
          <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
            Compliance &amp; Disclosures
          </h1>
          <p className="text-ink-dim text-lg max-w-2xl leading-relaxed">
            Saarthi Finance is committed to full regulatory compliance and
            transparent disclosure. This page contains all required regulatory
            information, risk disclosures, and our policies.
          </p>
          <p className="text-ink-muted text-sm mt-4">
            Last updated: November 2024
          </p>
        </div>
      </section>

      <div className="container-base py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Sidebar navigation */}
          <aside
            className="lg:col-span-1"
            aria-label="Compliance sections navigation"
          >
            <nav className="sticky top-24">
              <p className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-3">
                On This Page
              </p>
              <ul className="space-y-1.5" role="list">
                {sections.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="block text-sm text-ink-dim hover:text-ink py-1 border-l-2 border-transparent hover:border-brand pl-3 transition-all"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main compliance content */}
          <main
            className="lg:col-span-3 space-y-12"
            aria-label="Compliance and disclosure content"
          >
            {/* ── SEBI Disclosures ── */}
            <article id="sebi" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink mb-4 pb-3 border-b border-dark-border">
                SEBI Disclosures
              </h2>

              <div className="bg-dark-card border border-dark-border rounded-2xl p-5 mb-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-ink-muted mb-0.5">SEBI Registration Number</p>
                    <p className="font-bold text-ink">INA000XXXXXX</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted mb-0.5">Registration Type</p>
                    <p className="font-bold text-ink">Individual / Non-Individual</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted mb-0.5">Valid Till</p>
                    <p className="font-bold text-ink">Perpetual (post 2020)</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted mb-0.5">Registered Name</p>
                    <p className="font-bold text-ink">Saarthi Finance Advisory LLP</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted mb-0.5">AMFI ARN</p>
                    <p className="font-bold text-ink">XXXXXXX</p>
                  </div>
                  <div>
                    <p className="text-xs text-ink-muted mb-0.5">Registered Address</p>
                    <p className="font-bold text-ink">Mumbai, Maharashtra</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-ink-dim leading-relaxed">
                <p>
                  Saarthi Finance Advisory LLP is registered with the Securities and
                  Exchange Board of India (SEBI) as a Registered Investment Adviser
                  (RIA) under the SEBI (Investment Advisers) Regulations, 2013. The
                  registration can be verified on the SEBI website at{" "}
                  <a
                    href="https://www.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline"
                  >
                    www.sebi.gov.in
                  </a>
                  .
                </p>
                <p>
                  As a SEBI Registered Investment Adviser, Saarthi Finance is bound by
                  the provisions of the SEBI (Investment Advisers) Regulations, 2013,
                  and subsequent amendments. This includes maintaining fiduciary duty
                  towards clients, separating advisory and distribution activities,
                  maintaining adequate qualifications and experience, and operating
                  within the prescribed code of conduct.
                </p>
                <p>
                  Investment advice provided by Saarthi Finance is based on analysis
                  of each client&apos;s individual risk profile, financial situation, and
                  investment objectives. Past performance of any recommended product is
                  not indicative of future results.
                </p>
                <p>
                  <strong className="text-ink">Applicable Regulation:</strong> SEBI (Investment Advisers)
                  Regulations, 2013; SEBI Circular No. SEBI/HO/IMD/DF1/CIR/P/2020/182
                  dated September 23, 2020, and subsequent circulars.
                </p>
              </div>
            </article>

            {/* ── IRDAI & Insurance ── */}
            <article id="irdai" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink mb-4 pb-3 border-b border-dark-border">
                IRDAI &amp; Insurance Disclosures
              </h2>
              <div className="space-y-4 text-sm text-ink-dim leading-relaxed">
                <p>
                  Insurance advisory services are facilitated by Saarthi Finance
                  Advisory LLP as an IRDAI-authorised Point of Salesperson (POSP). Our
                  POSP code is XXXXXXXX. We are authorised to facilitate life and
                  general insurance products from registered insurers under IRDAI.
                </p>
                <p>
                  <strong className="text-ink">Important:</strong> Insurance is a subject matter of
                  solicitation. Buying an insurance policy is purely voluntary. All
                  policy documents must be read carefully before purchase. For IRDAI
                  Bima Sugam (insurance portal) and related services, visit{" "}
                  <a
                    href="https://www.irdai.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline"
                  >
                    www.irdai.gov.in
                  </a>
                  .
                </p>
                <p>
                  Claim settlement is the sole responsibility of the insurer. Saarthi
                  Finance facilitates the advisory and application process but does not
                  participate in claim settlement.
                </p>
              </div>
            </article>

            {/* ── Risk Disclosures ── */}
            <article id="risks" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink mb-4 pb-3 border-b border-dark-border">
                Risk Disclosures
              </h2>
              <div className="bg-dark-card border border-dark-border rounded-2xl p-5 mb-5 text-sm text-trade-warn leading-relaxed">
                <strong>Standard Risk Warning:</strong> Investment in securities
                market is subject to market risks. Read all related documents
                carefully before investing. Past performance is not an indicator of
                future returns. There is no assurance or guarantee of returns.
              </div>
              <div className="space-y-4 text-sm text-ink-dim leading-relaxed">
                <p>
                  Mutual fund investments are subject to market risks. NAV of schemes
                  fluctuates based on market conditions. Investors may receive less than
                  their invested amount. Please read the Scheme Information Document
                  (SID), Key Information Memorandum (KIM), and Statement of Additional
                  Information (SAI) of the respective scheme carefully before investing.
                </p>
                <p>
                  Equity investments involve higher risk compared to debt instruments.
                  The value of investments may go down as well as up. Investors are
                  advised to invest in accordance with their risk appetite and financial
                  goals. Advisory services provided by Saarthi Finance are based on
                  publicly available information and research.
                </p>
                <p>
                  Saarthi Finance does not promise or guarantee any specific level of
                  returns on investments. Investment recommendations are based on each
                  client&apos;s individual circumstances and should not be construed as
                  general advice applicable to all investors.
                </p>
              </div>
            </article>

            {/* ── Fee Disclosures ── */}
            <article id="fees" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink mb-4 pb-3 border-b border-dark-border">
                Fee Disclosures
              </h2>
              <div className="space-y-4 text-sm text-ink-dim leading-relaxed">
                <p>
                  Saarthi Finance operates on a fee-only advisory model. Fees are
                  charged directly to clients and disclosed upfront in the Investment
                  Advisory Agreement prior to commencement of services.
                </p>
                <p>
                  <strong className="text-ink">Fee Structure:</strong> Advisory fees are structured as either
                  (a) a fixed annual fee per client/family, or (b) a percentage of
                  Assets Under Advisory (AUA), as permitted under SEBI (Investment
                  Advisers) Regulations. The applicable fee will be specified in your
                  service agreement.
                </p>
                <p>
                  Saarthi Finance does not accept commissions, referral fees, or any
                  other form of remuneration from product manufacturers (mutual fund
                  houses, insurance companies, etc.) for advice provided to clients.
                  Where distribution services are provided separately (AMFI ARN),
                  complete disclosure is made.
                </p>
                <p>
                  Recovery &amp; regularisation services (IEPF claims, dematerialisation)
                  are charged on a project basis. Fees are disclosed and agreed before
                  commencement of work.
                </p>
              </div>
            </article>

            {/* ── Privacy Policy ── */}
            <article id="privacy" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink mb-4 pb-3 border-b border-dark-border">
                Privacy Policy
              </h2>
              <div className="space-y-4 text-sm text-ink-dim leading-relaxed">
                <p>
                  Saarthi Finance Advisory LLP (&ldquo;we&rdquo;, &ldquo;our&rdquo;) is committed to
                  protecting the privacy and confidentiality of your personal
                  information. This policy describes how we collect, use, store, and
                  protect your data.
                </p>
                <h3 className="font-semibold text-ink text-base mt-4">
                  Information We Collect
                </h3>
                <p>
                  We collect personal information necessary to provide our advisory
                  services, including name, PAN, address, financial details, and
                  contact information. We collect information you provide through our
                  website, consultation forms, and direct communication.
                </p>
                <h3 className="font-semibold text-ink text-base mt-4">
                  How We Use Your Information
                </h3>
                <p>
                  Your information is used solely to provide and improve our advisory
                  services, meet regulatory requirements (KYC), communicate with you
                  regarding your account and services, and send relevant educational
                  content (with your consent).
                </p>
                <h3 className="font-semibold text-ink text-base mt-4">
                  Data Protection
                </h3>
                <p>
                  We do not sell, trade, or share your personal information with third
                  parties except as required for service delivery (e.g., KYC with
                  depositories, RTAs) or as required by law (SEBI, IRDAI, Income Tax
                  authorities). All data is stored securely with appropriate access
                  controls.
                </p>
              </div>
            </article>

            {/* ── Terms of Use ── */}
            <article id="terms" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink mb-4 pb-3 border-b border-dark-border">
                Terms of Use
              </h2>
              <div className="space-y-4 text-sm text-ink-dim leading-relaxed">
                <p>
                  By accessing and using this website, you agree to the following
                  terms. The content on this website is for informational and
                  educational purposes only and does not constitute financial, legal,
                  or tax advice.
                </p>
                <p>
                  All educational content is provided in good faith based on
                  information available at the time of publication. Regulations and
                  tax laws change frequently; please verify current rules with relevant
                  authorities or a qualified professional.
                </p>
                <p>
                  Saarthi Finance is not responsible for decisions made based on the
                  general educational content on this website without appropriate
                  personalised advice. Advisory services are provided under separate
                  written agreements.
                </p>
                <p>
                  Unauthorised reproduction of website content without written
                  permission is prohibited. The Saarthi Finance brand, logo, and
                  trademarks are the intellectual property of Saarthi Finance
                  Advisory LLP.
                </p>
              </div>
            </article>

            {/* ── Grievance Redressal ── */}
            <article id="grievance" className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-ink mb-4 pb-3 border-b border-dark-border">
                Grievance Redressal
              </h2>
              <div className="space-y-4 text-sm text-ink-dim leading-relaxed">
                <p>
                  Saarthi Finance has a structured grievance redressal mechanism.
                  Clients with complaints or concerns are requested to follow the
                  process below:
                </p>

                <div className="bg-dark-card rounded-2xl p-5 border border-dark-border space-y-4">
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Step 1: Contact Us Directly
                    </h3>
                    <p className="text-ink-dim">
                      Email:{" "}
                      <a
                        href="mailto:grievance@saarthi-finance.in"
                        className="text-brand underline"
                      >
                        grievance@saarthi-finance.in
                      </a>
                      <br />
                      We will acknowledge within 2 business days and resolve
                      within 30 days.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Step 2: SEBI SCORES Portal
                    </h3>
                    <p className="text-ink-dim">
                      If not resolved satisfactorily, register your complaint
                      on the SEBI SCORES portal:{" "}
                      <a
                        href="https://scores.sebi.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand underline"
                      >
                        scores.sebi.gov.in
                      </a>
                      . SEBI SCORES is the official investor complaint
                      management system.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Step 3: SEBI ODR / SMART ODR
                    </h3>
                    <p className="text-ink-dim">
                      For dispute resolution, you may also use the Online
                      Dispute Resolution (ODR) platform:{" "}
                      <a
                        href="https://smartodr.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand underline"
                      >
                        smartodr.in
                      </a>
                    </p>
                  </div>
                </div>

                <p>
                  <strong className="text-ink">Principal Officer for Grievances:</strong><br />
                  Name: [Principal Officer Name]<br />
                  Email:{" "}
                  <a
                    href="mailto:grievance@saarthi-finance.in"
                    className="text-brand underline"
                  >
                    grievance@saarthi-finance.in
                  </a>
                  <br />
                  Tel: +91 98765 43210
                </p>
              </div>
            </article>

            {/* Bottom link */}
            <div className="pt-6 border-t border-dark-border flex flex-wrap gap-3">
              <Link href={`/${lang}`} className="btn-secondary text-sm">
                ← Back to Home
              </Link>
              <Link href={`/${lang}/contact`} className="btn-primary text-sm">
                Book Consultation
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
