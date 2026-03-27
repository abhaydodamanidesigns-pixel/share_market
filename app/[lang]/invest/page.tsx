import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "Market Insights & Fund Facilitation — Saarthi Finance",
  description:
    "Goal-aligned market insights and fund facilitation for Indian families. Financial education, goal-based planning, and transparent guidance. No commissions, no conflicts of interest.",
};

export default async function InvestPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const invest = dict.invest;

  return (
    <>
      <HeroSection
        variant="dark"
        eyebrow={invest.hero.eyebrow}
        headline={invest.hero.headline}
        headlineAccent={invest.hero.headlineAccent}
        subtext={invest.hero.subtext}
        ctaLabel={invest.hero.ctaLabel}
        ctaHref={`/${lang}/contact`}
        secondaryCtaLabel={invest.hero.secondaryCtaLabel}
        secondaryCtaHref={`/${lang}/learn`}
        showTrustBadges={false}
      />

      {/* Regulatory disclosure banner */}
      <div className="bg-dark-card border-b border-dark-border">
        <div className="container-base py-3">
          <p className="text-xs text-trade-warn text-center">
            {invest.educationalDisclaimer}
          </p>
        </div>
      </div>

      {/* Problem explanation */}
      <section
        className="section-padding bg-dark-surface"
        aria-labelledby="problem-heading"
      >
        <div className="container-base">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="problem-heading" className="section-heading mb-4">
              {invest.problem.heading}
            </h2>
            <p className="text-ink-dim leading-relaxed mb-4">
              {invest.problem.para1}
            </p>
            <p className="text-ink-dim leading-relaxed">
              {invest.problem.para2}
            </p>
          </div>
        </div>
      </section>

      {/* Service highlights */}
      <section
        className="section-padding bg-dark-panel"
        aria-labelledby="services-heading"
      >
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="section-heading">
              {invest.services.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {invest.services.items.map(({ icon, title, description }) => (
              <div key={title} className="card">
                <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
                <h3 className="font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-dim leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who this is for */}
      <section
        className="section-padding bg-dark-surface"
        aria-labelledby="who-heading"
      >
        <div className="container-base">
          <div className="text-center mb-10">
            <h2 id="who-heading" className="section-heading">
              {invest.whoItsFor.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {invest.whoItsFor.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invest.whoItsFor.items.map(({ profile, description }) => (
              <div
                key={profile}
                className="flex gap-4 bg-dark-surface rounded-2xl p-5 border border-dark-border"
              >
                <div className="w-2 rounded-full bg-brand-accent flex-shrink-0 self-stretch" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-ink mb-1.5">{profile}</h3>
                  <p className="text-sm text-ink-dim leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessTimeline
        steps={invest.process.steps}
        layout="vertical"
        title={invest.process.title}
        subtitle={invest.process.subtitle}
      />

      {/* Internal links */}
      <section className="py-10 bg-dark-panel">
        <div className="container-base">
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-sm text-ink-muted self-center">
              {invest.relatedServices.label}
            </span>
            <Link href={`/${lang}/protect`} className="badge bg-dark-card text-trade-warn py-1.5 px-4">
              {invest.relatedServices.insurance}
            </Link>
            <Link href={`/${lang}/learn`} className="badge bg-dark-card text-brand py-1.5 px-4">
              {invest.relatedServices.learn}
            </Link>
            <Link href={`/${lang}/recover`} className="badge bg-dark-card text-trade-loss py-1.5 px-4">
              {invest.relatedServices.recover}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        items={invest.faq.items}
        title={invest.faq.title}
        subtitle={invest.faq.subtitle}
      />

      {/* CTA */}
      <CTASection
        title={invest.cta.title}
        subtitle={invest.cta.subtitle}
        variant="dark"
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
      />
    </>
  );
}
