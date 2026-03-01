import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "Insurance Advisory — Protect Your Family's Financial Future",
  description:
    "Unbiased insurance advisory for Indian families. Term life, health, and critical illness insurance guidance from IRDAI-authorised advisers. No commission bias — your protection first.",
};

export default async function ProtectPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const protect = dict.protect;

  return (
    <>
      <HeroSection
        variant="dark"
        eyebrow={protect.hero.eyebrow}
        headline={protect.hero.headline}
        headlineAccent={protect.hero.headlineAccent}
        subtext={protect.hero.subtext}
        ctaLabel={protect.hero.ctaLabel}
        ctaHref={`/${lang}/contact`}
        secondaryCtaLabel={protect.hero.secondaryCtaLabel}
        secondaryCtaHref={`/${lang}/resources/insurance-guide`}
        showTrustBadges={false}
      />

      {/* Problem statement */}
      <section
        className="section-padding bg-white"
        aria-labelledby="protect-problem-heading"
      >
        <div className="container-base">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="protect-problem-heading" className="section-heading mb-4">
              {protect.problem.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {protect.problem.para1}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {protect.problem.para2}
            </p>
          </div>
        </div>
      </section>

      {/* Insurance types */}
      <section
        className="section-padding bg-surface-50"
        aria-labelledby="insurance-types-heading"
      >
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 id="insurance-types-heading" className="section-heading">
              {protect.insuranceTypes.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {protect.insuranceTypes.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {protect.insuranceTypes.items.map(({ icon, title, description, keyPoints }) => (
              <div key={title} className="card">
                <div className="flex items-start gap-4">
                  <span
                    className="text-3xl bg-amber-50 w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <div>
                    <h3 className="font-semibold text-navy-900 text-lg mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {description}
                    </p>
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5 pl-1">
                  {keyPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs text-gray-700"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="section-padding bg-white" aria-labelledby="who-protect-heading">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="who-protect-heading" className="section-heading mb-4">
                {protect.whoNeeds.heading}
              </h2>
              <div className="space-y-4">
                {protect.whoNeeds.items.map(({ title, text }) => (
                  <div key={title} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-2" aria-hidden="true" />
                    <div>
                      <span className="font-semibold text-navy-900 text-sm">{title}:</span>{" "}
                      <span className="text-sm text-gray-600">{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
              <h3 className="font-bold text-navy-900 text-xl mb-4">
                {protect.whoNeeds.underInsuredBox.heading}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {protect.whoNeeds.underInsuredBox.para1}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {protect.whoNeeds.underInsuredBox.para2}
              </p>
              <Link href={`/${lang}/contact`} className="btn-primary w-full justify-center">
                {protect.whoNeeds.underInsuredBox.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessTimeline
        steps={protect.process.steps}
        layout="vertical"
        title={protect.process.title}
        subtitle={protect.process.subtitle}
      />

      {/* Crosslinks */}
      <section className="py-10 bg-surface-50">
        <div className="container-base">
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-sm text-gray-500 self-center">{protect.crosslinks.label}</span>
            <Link href={`/${lang}/invest`} className="badge bg-emerald-50 text-emerald-700 py-1.5 px-4">
              {protect.crosslinks.investment}
            </Link>
            <Link href={`/${lang}/learn`} className="badge bg-blue-50 text-blue-700 py-1.5 px-4">
              {protect.crosslinks.education}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        items={protect.faq.items}
        title={protect.faq.title}
      />

      {/* CTA */}
      <CTASection
        title={protect.cta.title}
        subtitle={protect.cta.subtitle}
        variant="dark"
        note={protect.cta.note}
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
      />
    </>
  );
}
