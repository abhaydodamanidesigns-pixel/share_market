import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import ArticleCard from "@/components/ArticleCard";
import CTASection from "@/components/CTASection";
import NewsletterForm from "@/components/NewsletterForm";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "Financial Resources & Educational Blog — Guides for Indian Families",
  description:
    "Free financial education articles, guides, and resources for Indian families. Mutual funds, insurance, IEPF, tax planning, estate planning — written by SEBI-registered advisers.",
};

export default async function ResourcesPage({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const resources = dict.resources;

  return (
    <>
      <HeroSection
        variant="light"
        eyebrow={resources.hero.eyebrow}
        headline={resources.hero.headline}
        headlineAccent={resources.hero.headlineAccent}
        subtext={resources.hero.subtext}
        ctaLabel={resources.hero.ctaLabel}
        ctaHref="#articles"
        secondaryCtaLabel={resources.hero.secondaryCtaLabel}
        secondaryCtaHref={`/${lang}/contact`}
        showTrustBadges={false}
      />

      {/* Featured article */}
      <section className="section-padding bg-dark-surface" aria-labelledby="featured-heading">
        <div className="container-base">
          <div className="bg-dark-card rounded-3xl p-8 md:p-12 border border-dark-border">
            <span className="badge bg-dark-elevated text-brand-accent mb-3">{resources.featured.badge}</span>
            <h2 id="featured-heading" className="text-2xl md:text-3xl font-bold text-ink mb-3 mt-2">
              {resources.featured.heading}
            </h2>
            <p className="text-ink-dim leading-relaxed mb-6 max-w-2xl">
              {resources.featured.excerpt}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href={`/${lang}/resources/understanding-iepf-claims`}
                className="btn-primary"
              >
                {resources.featured.ctaLabel}
              </Link>
              <div className="flex items-center gap-3 text-sm text-ink-muted">
                <span>📖 {resources.featured.meta}</span>
                <span>·</span>
                <span>15 Nov 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section
        id="articles"
        className="section-padding bg-dark-panel"
        aria-labelledby="articles-heading"
      >
        <div className="container-base">
          <div className="mb-8">
            <h2 id="articles-heading" className="section-heading mb-2">
              {resources.articles.heading}
            </h2>
            <p className="text-ink-dim">
              {resources.articles.items.length} {resources.articles.count}{" "}
              {resources.articles.categories.length - 1} {resources.articles.topicAreas}
            </p>
          </div>

          {/* Category filter (visual only — no JS filter for SSR) */}
          <div
            className="flex flex-wrap gap-2 mb-8"
            role="list"
            aria-label="Article categories"
          >
            {resources.articles.categories.map(({ label, count }) => (
              <span
                key={label}
                role="listitem"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-dark-card border border-dark-border text-brand cursor-default"
              >
                {label}
                <span className="text-xs text-ink-muted font-normal">
                  ({count})
                </span>
              </span>
            ))}
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.articles.items.map((article) => (
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

      {/* Newsletter / notification opt-in (static) */}
      <section
        className="section-padding bg-dark-surface"
        aria-labelledby="newsletter-heading"
      >
        <div className="container-base">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-3xl mb-3 block" aria-hidden="true">📬</span>
            <h2 id="newsletter-heading" className="section-heading mb-3">
              {resources.newsletter.heading}
            </h2>
            <p className="text-ink-dim mb-6">
              {resources.newsletter.subtext}
            </p>
            <NewsletterForm />
            <p className="text-xs text-ink-muted mt-3">
              {resources.newsletter.privacyNote}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={resources.cta.title}
        subtitle={resources.cta.subtitle}
        variant="dark"
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
      />
    </>
  );
}
