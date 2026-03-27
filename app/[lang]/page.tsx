import type { Metadata } from "next";
import Link from "next/link";
import AnimatedHeroBanner from "@/components/AnimatedHeroBanner";
import TrustSection from "@/components/TrustSection";
import LifecycleSection from "@/components/LifecycleSection";
import ServiceCard from "@/components/ServiceCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import ArticleCard from "@/components/ArticleCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "Saarthi Finance — Financial Education & Lifecycle Partner for Families",
  description:
    "A financial education and facilitation platform helping Indian families learn, invest wisely, protect their wealth, and recover lost assets. Book a free consultation today.",
};

// ── SVG inline icons (server-safe ReactNodes) ─────────────────────────────────
// Why-choose-us
const WHY_CHOOSE_ICONS = [
  // Conflict-free — scale/balance
  <svg key="scale" className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
  </svg>,
  // Education — graduation cap
  <svg key="grad" className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m-7-3.5l7 3.5 7-3.5" />
  </svg>,
  // Family-centred — home
  <svg key="home" className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>,
  // Transparent — check circle
  <svg key="check" className="w-6 h-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
];

// Service icon keys — resolved to SVGs inside ServiceCard (client component)
const SERVICE_ICON_KEYS  = ["book", "chart", "shield", "refresh"] as const;
const SERVICE_ACCENT_CLASSES = [
  "bg-blue-900/40",
  "bg-green-900/40",
  "bg-amber-900/40",
  "bg-red-900/40",
];
const SERVICE_HREFS = ["/learn", "/invest", "/protect", "/recover"];

// Article metadata (no emojis — use category styling in ArticleCard)
const ARTICLE_SLUGS = [
  "understanding-iepf-claims",
  "term-insurance-basics",
  "physical-shares-demat",
] as const;

const ARTICLE_META = [
  { readTime: "8 min", date: "2024-11-15", coverEmoji: "" },
  { readTime: "6 min", date: "2024-10-28", coverEmoji: "" },
  { readTime: "7 min", date: "2024-10-10", coverEmoji: "" },
];

// Process step icon keys — resolved to SVGs inside ProcessTimeline (client component)
const PROCESS_ICONS = ["target", "map", "cog", "users"] as const;

export default async function HomePage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = params.lang;
  const dict = await getDictionary(lang);

  const processSteps = dict.home.process.steps.map((step, i) => ({
    number: i + 1,
    icon: PROCESS_ICONS[i],
    title: step.title,
    description: step.description,
  }));

  const featuredArticles = dict.home.featuredArticles.map((article, i) => ({
    slug:       ARTICLE_SLUGS[i],
    category:   article.category,
    title:      article.title,
    excerpt:    article.excerpt,
    readTime:   ARTICLE_META[i].readTime,
    date:       ARTICLE_META[i].date,
    coverEmoji: ARTICLE_META[i].coverEmoji,
  }));

  const whyChooseUs = dict.home.whyChooseUs.map((item, i) => ({
    icon:        WHY_CHOOSE_ICONS[i],
    title:       item.title,
    description: item.description,
  }));

  const services = dict.home.serviceCards.map((card, i) => ({
    icon:        SERVICE_ICON_KEYS[i],
    title:       card.title,
    description: card.description,
    href:        `/${lang}${SERVICE_HREFS[i]}`,
    accentClass: SERVICE_ACCENT_CLASSES[i],
    tag:         card.tag,
  }));

  return (
    <>
      {/* 1. Hero */}
      <AnimatedHeroBanner
        eyebrow={dict.home.hero.eyebrow}
        headline={dict.home.hero.headline}
        headlineAccent={dict.home.hero.headlineAccent}
        subtext={dict.home.hero.subtext}
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
        secondaryCtaLabel={dict.common.exploreServices}
        secondaryCtaHref={`/${lang}/learn`}
      />

      {/* 2. Trust indicators */}
      <TrustSection
        title={dict.trust.title}
        subtitle={dict.trust.subtitle}
        items={dict.trust.items}
        disclaimerText={dict.trust.disclaimer}
        scoresLabel={dict.trust.scores}
      />

      {/* 3. Lifecycle overview */}
      <LifecycleSection dict={dict} locale={lang} />

      {/* 4. Service overview cards */}
      <section
        className="section-padding mesh-bg-dark"
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
                  className="glass-card rounded-2xl p-5"
                >
                  <span className="block mb-3" aria-hidden="true">{icon}</span>
                  <h3 className="font-semibold text-ink text-sm mb-1.5">{title}</h3>
                  <p className="text-xs text-ink-dim leading-relaxed">{description}</p>
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
