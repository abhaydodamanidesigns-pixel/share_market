import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "IEPF Claim & Share Dematerialisation — Recover Lost Assets",
  description:
    "Specialist assistance to recover shares and dividends from IEPF (Investor Education and Protection Fund), dematerialise physical share certificates, and regularise old investments. Transparent, step-by-step process.",
};

export default async function RecoverPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const recover = dict.recover;

  return (
    <>
      <HeroSection
        variant="dark"
        eyebrow={recover.hero.eyebrow}
        headline={recover.hero.headline}
        headlineAccent={recover.hero.headlineAccent}
        subtext={recover.hero.subtext}
        ctaLabel={recover.hero.ctaLabel}
        ctaHref={`/${lang}/contact`}
        secondaryCtaLabel={recover.hero.secondaryCtaLabel}
        secondaryCtaHref="https://iepf.gov.in"
        showTrustBadges={false}
      />

      {/* Problem statement */}
      <section
        className="section-padding bg-white"
        aria-labelledby="recover-problem-heading"
      >
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="recover-problem-heading" className="section-heading mb-4">
                {recover.problem.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {recover.problem.para1}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {recover.problem.para2}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {recover.problem.para3}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {recover.stats.map(({ number, label, sub }) => (
                <div
                  key={label}
                  className="bg-rose-50 border border-rose-100 rounded-2xl p-5 text-center"
                >
                  <p className="text-2xl font-bold text-navy-900 mb-1">{number}</p>
                  <p className="text-sm font-medium text-navy-700">{label}</p>
                  <p className="text-xs text-gray-500 mt-1">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IEPF Claim Process */}
      <ProcessTimeline
        steps={recover.iepfProcess.steps}
        layout="vertical"
        title={recover.iepfProcess.title}
        subtitle={recover.iepfProcess.subtitle}
      />

      {/* Physical shares section */}
      <section
        id="physical-shares"
        className="section-padding bg-white"
        aria-labelledby="physical-heading"
      >
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 id="physical-heading" className="section-heading">
              {recover.physicalShares.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {recover.physicalShares.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {recover.physicalShares.steps.map(({ number, icon, title, description }) => (
              <div
                key={number}
                className="bg-surface-50 rounded-2xl p-5 border border-gray-100 text-center flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center text-sm mb-3">
                  {number}
                </div>
                <span className="text-2xl mb-2" aria-hidden="true">{icon}</span>
                <h3 className="font-semibold text-navy-900 text-sm mb-2">{title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transmission services */}
      <section
        className="section-padding bg-surface-50"
        aria-labelledby="transmission-heading"
      >
        <div className="container-base">
          <div className="text-center mb-10">
            <h2 id="transmission-heading" className="section-heading">
              {recover.transmission.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {recover.transmission.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recover.transmission.items.map(({ icon, title, description }) => (
              <div key={title} className="card">
                <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
                <h3 className="font-semibold text-navy-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-white">
        <div className="container-base">
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-sm text-gray-500 self-center">{recover.crosslinks.label}</span>
            <Link href={`/${lang}/invest`} className="badge bg-emerald-50 text-emerald-700 py-1.5 px-4">
              {recover.crosslinks.investment}
            </Link>
            <Link href={`/${lang}/protect`} className="badge bg-amber-50 text-amber-700 py-1.5 px-4">
              {recover.crosslinks.insurance}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        items={recover.faq.items}
        title={recover.faq.title}
        subtitle={recover.faq.subtitle}
      />

      {/* CTA */}
      <CTASection
        title={recover.cta.title}
        subtitle={recover.cta.subtitle}
        variant="dark"
        note={recover.cta.note}
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
      />
    </>
  );
}
