import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "Financial Education Hub — Learn About Money, Investing & Planning",
  description:
    "Free financial education for Indian families. Understand mutual funds, insurance, tax planning, and how to build a financial plan. Curated guides by SEBI-registered advisers.",
};

const educationIcons = ["🏦", "📊", "🛡️", "💰", "🏠", "👨‍👩‍👧‍👦", "📜", "🔄"];
const levelColors: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-rose-50 text-rose-700",
};

export default async function LearnPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const learn = dict.learn;

  const educationTopics = learn.educationTopics.map((t, i) => ({
    ...t,
    icon: educationIcons[i],
  }));

  return (
    <>
      <HeroSection
        variant="dark"
        eyebrow={learn.hero.eyebrow}
        headline={learn.hero.headline}
        headlineAccent={learn.hero.headlineAccent}
        subtext={learn.hero.subtext}
        ctaLabel={learn.hero.ctaLabel}
        ctaHref={`/${lang}/resources`}
        secondaryCtaLabel={learn.hero.secondaryCtaLabel}
        secondaryCtaHref={`/${lang}/contact`}
        showTrustBadges={false}
      />

      {/* Why financial education matters */}
      <section className="section-padding bg-white" aria-labelledby="why-learn-heading">
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="why-learn-heading" className="section-heading mb-4">
                {learn.whyHeading}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {learn.whyPara1}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {learn.whyPara2}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {learn.whyPara3}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {learn.stats.map(({ number, label }) => (
                <div
                  key={label}
                  className="bg-navy-50 rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl font-bold text-navy-900 mb-1">{number}</p>
                  <p className="text-sm text-gray-600">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topic grid */}
      <section
        className="section-padding bg-surface-50"
        aria-labelledby="topics-heading"
      >
        <div className="container-base">
          <div className="text-center mb-10">
            <h2 id="topics-heading" className="section-heading">
              {learn.topicsHeading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {learn.topicsSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {educationTopics.map(({ icon, title, description, href, level }) => (
              <Link
                key={href}
                href={`/${lang}${href}`}
                className="card flex flex-col group"
                aria-label={`${title} — ${level}`}
              >
                <span className="text-3xl mb-3" aria-hidden="true">{icon}</span>
                <span className={`badge mb-2 ${levelColors[level]}`}>{level}</span>
                <h3 className="font-semibold text-navy-900 text-sm mb-2 group-hover:text-navy-700 transition-colors">
                  {title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed flex-1">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured articles */}
      <section
        className="section-padding bg-white"
        aria-labelledby="featured-articles-heading"
      >
        <div className="container-base">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <h2 id="featured-articles-heading" className="section-heading">
                {learn.featuredHeading}
              </h2>
              <p className="section-subheading mt-2">
                {learn.featuredSubheading}
              </p>
            </div>
            <Link href={`/${lang}/resources`} className="btn-secondary text-sm flex-shrink-0">
              {learn.allArticles}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learn.featuredArticles.map((article) => (
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

      {/* FAQ */}
      <FAQAccordion
        items={learn.faqItems}
        title={learn.faqTitle}
        subtitle={learn.faqSubtitle}
      />

      {/* CTA */}
      <CTASection
        title={learn.ctaTitle}
        subtitle={learn.ctaSubtitle}
        variant="dark"
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
      />
    </>
  );
}
