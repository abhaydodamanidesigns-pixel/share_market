import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import LifecycleSection from "@/components/LifecycleSection";
import ServiceCard from "@/components/ServiceCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import ArticleCard from "@/components/ArticleCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import HeroTicker from "@/components/HeroTicker";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "Saarthi Finance — Your Financial Lifecycle Partner for Families",
  description:
    "A SEBI-registered investment adviser helping Indian families learn, invest wisely, protect their wealth, and recover lost assets. Book a free consultation today.",
};

const processIcons = ["🎯", "🗺️", "⚙️", "🤝"];

const articleSlugs = [
  "understanding-iepf-claims",
  "term-insurance-basics",
  "physical-shares-demat",
] as const;

const articleMeta = [
  { readTime: "8 min", date: "2024-11-15", coverEmoji: "📑" },
  { readTime: "6 min", date: "2024-10-28", coverEmoji: "🛡️" },
  { readTime: "7 min", date: "2024-10-10", coverEmoji: "📜" },
];

const whyChooseUsIcons = ["⚖️", "🎓", "🏠", "📋"];

const serviceIcons = ["📚", "📋", "🛡️", "🔄"];
// Dark icon-bg tints for each service — learn/invest/protect/recover
const serviceAccentClasses = [
  "bg-blue-900/40",
  "bg-green-900/40",
  "bg-amber-900/40",
  "bg-red-900/40",
];
const serviceHrefs = ["/learn", "/invest", "/protect", "/recover"];

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  const processSteps = dict.home.process.steps.map((step, i) => ({
    number: i + 1,
    icon: processIcons[i],
    title: step.title,
    description: step.description,
  }));

  const featuredArticles = dict.home.featuredArticles.map((article, i) => ({
    slug: articleSlugs[i],
    category: article.category,
    title: article.title,
    excerpt: article.excerpt,
    readTime: articleMeta[i].readTime,
    date: articleMeta[i].date,
    coverEmoji: articleMeta[i].coverEmoji,
  }));

  const whyChooseUs = dict.home.whyChooseUs.map((item, i) => ({
    icon: whyChooseUsIcons[i],
    title: item.title,
    description: item.description,
  }));

  const services = dict.home.serviceCards.map((card, i) => ({
    icon: serviceIcons[i],
    title: card.title,
    description: card.description,
    href: `/${lang}${serviceHrefs[i]}`,
    accentClass: serviceAccentClasses[i],
    tag: card.tag,
  }));

  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        eyebrow={dict.home.hero.eyebrow}
        headline={dict.home.hero.headline}
        headlineAccent={dict.home.hero.headlineAccent}
        subtext={dict.home.hero.subtext}
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
        secondaryCtaLabel={dict.common.exploreServices}
        secondaryCtaHref={`/${lang}/learn`}
        showTrustBadges
        regulatedLabel={dict.hero.regulatedRecognised}
        trustBadgeLabels={[
          dict.hero.trustBadges.sebiAdviser,
          dict.hero.trustBadges.irdaiPosp,
          dict.hero.trustBadges.amfiRegistered,
          dict.hero.trustBadges.clientFirstEthics,
        ]}
      />

      {/* 1b. Scrolling services ticker */}
      <HeroTicker />

      {/* 2. Trust indicators */}
      <TrustSection
        title={dict.trust.title}
        subtitle={dict.trust.subtitle}
        items={dict.trust.items.map((item, i) => ({
          icon: ["🏛️", "🛡️", "📋", "🔒", "🏢", "📞"][i],
          ...item,
        }))}
        disclaimerText={dict.trust.disclaimer}
        scoresLabel={dict.trust.scores}
      />

      {/* 3. Lifecycle overview */}
      <LifecycleSection dict={dict} locale={lang} />

      {/* 4. Service overview cards */}
      <section
        className="section-padding bg-dark-panel"
        aria-labelledby="services-heading"
      >
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="section-heading">
              {dict.home.services.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-4">
              {dict.home.services.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.href}
                {...service}
                learnMoreLabel={dict.common.learnMore}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why choose us */}
      <section
        className="section-padding bg-dark-surface"
        aria-labelledby="why-us-heading"
      >
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text column */}
            <div>
              <span className="badge bg-dark-card text-brand-accent mb-3">
                {dict.home.whyUs.badge}
              </span>
              <h2 id="why-us-heading" className="section-heading mt-2 mb-4">
                {dict.home.whyUs.heading}
              </h2>
              <p className="text-ink-dim leading-relaxed mb-6">
                {dict.home.whyUs.description}
              </p>
              <Link href={`/${lang}/about`} className="btn-primary">
                {dict.common.ourStory}
              </Link>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyChooseUs.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="bg-dark-card rounded-2xl p-5 border border-dark-border"
                >
                  <span className="text-2xl mb-3 block" aria-hidden="true">
                    {icon}
                  </span>
                  <h3 className="font-semibold text-ink text-sm mb-1.5">
                    {title}
                  </h3>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Process timeline */}
      <ProcessTimeline
        steps={processSteps}
        title={dict.home.process.title}
        subtitle={dict.home.process.subtitle}
      />

      {/* 7. Featured articles */}
      <section
        className="section-padding bg-dark-panel"
        aria-labelledby="articles-heading"
      >
        <div className="container-base">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 id="articles-heading" className="section-heading">
                {dict.home.articles.heading}
              </h2>
              <p className="section-subheading mt-2">
                {dict.home.articles.subheading}
              </p>
            </div>
            <Link
              href={`/${lang}/resources`}
              className="btn-secondary text-sm px-5 py-2.5 flex-shrink-0"
            >
              {dict.home.articles.viewAllArticles}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                {...article}
                href={`/${lang}/resources/${article.slug}`}
                dict={dict.articleCard}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <TestimonialsSection dict={dict} />

      {/* 9. CTA */}
      <CTASection
        title={dict.cta.title}
        subtitle={dict.cta.subtitle}
        ctaLabel={dict.cta.ctaLabel}
        secondaryLabel={dict.cta.secondaryLabel}
        note={dict.cta.note}
        ctaHref={`/${lang}/contact`}
        secondaryHref={`/${lang}/learn`}
      />
    </>
  );
}
