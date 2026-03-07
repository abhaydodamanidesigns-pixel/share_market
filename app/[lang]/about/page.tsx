import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "About Us — Our Mission, Team & Approach to Financial Advisory",
  description:
    "Learn about Saarthi Finance — a SEBI-registered investment adviser built for Indian families. Our mission, values, regulatory credentials, and the team behind your financial lifecycle partner.",
};

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const about = dict.about;

  return (
    <>
      <HeroSection
        variant="dark"
        eyebrow={about.hero.eyebrow}
        headline={about.hero.headline}
        headlineAccent={about.hero.headlineAccent}
        subtext={about.hero.subtext}
        ctaLabel={about.hero.ctaLabel}
        ctaHref="#team"
        secondaryCtaLabel={about.hero.secondaryCtaLabel}
        secondaryCtaHref={`/${lang}/contact`}
        showTrustBadges={false}
      />

      <section
        className="section-padding bg-dark-surface"
        aria-labelledby="mission-heading"
      >
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge bg-dark-card text-brand mb-3">{about.mission.badge}</span>
              <h2 id="mission-heading" className="section-heading mt-2 mb-4">
                {about.mission.heading}
              </h2>
              <p className="text-ink-dim leading-relaxed mb-4">
                {about.mission.para1}
              </p>
              <p className="text-ink-dim leading-relaxed mb-4">
                {about.mission.para2}
              </p>
              <p className="text-ink-dim leading-relaxed">
                {about.mission.para3}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {about.mission.stats.map(({ number, label }) => (
                <div
                  key={label}
                  className="bg-dark-card border border-dark-border rounded-2xl p-6 text-center"
                >
                  <p className="text-3xl font-bold text-ink mb-1">{number}</p>
                  <p className="text-sm text-ink-dim">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-dark-panel"
        aria-labelledby="values-heading"
      >
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 id="values-heading" className="section-heading">
              {about.values.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {about.values.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.values.items.map(({ icon, title, description }) => (
              <div key={title} className="card">
                <span className="text-3xl mb-3 block" aria-hidden="true">{icon}</span>
                <h3 className="font-semibold text-ink mb-2">{title}</h3>
                <p className="text-sm text-ink-dim leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="team"
        className="section-padding bg-dark-surface"
        aria-labelledby="team-heading"
      >
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 id="team-heading" className="section-heading">
              {about.team.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {about.team.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.team.members.map(({ name, role, credentials, bio, initials }) => (
              <div key={name} className="card text-center">
                <div
                  className="w-16 h-16 rounded-full bg-dark-elevated text-ink-dim font-bold text-xl flex items-center justify-center mx-auto mb-4"
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <h3 className="font-bold text-ink text-lg">{name}</h3>
                <p className="text-brand text-sm font-medium mt-1">{role}</p>
                <p className="text-xs text-brand-accent font-semibold mt-1 mb-3">
                  {credentials}
                </p>
                <p className="text-sm text-ink-dim leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-padding bg-dark-panel"
        aria-labelledby="timeline-heading"
      >
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 id="timeline-heading" className="section-heading">
              {about.journey.heading}
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <ol className="relative space-y-0" aria-label="Company milestones">
              {about.journey.milestones.map(({ year, event }, idx) => (
                <li
                  key={year}
                  className="flex gap-6 pb-8 last:pb-0 relative"
                >
                  {idx < about.journey.milestones.length - 1 && (
                    <div
                      className="absolute left-6 top-10 bottom-0 w-px bg-dark-border"
                      aria-hidden="true"
                    />
                  )}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center z-10">
                    {year.slice(2)}
                  </div>
                  <div className="pt-2">
                    <p className="text-xs font-bold text-brand-accent mb-0.5">{year}</p>
                    <p className="text-sm text-ink-dim leading-relaxed">{event}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <TrustSection
        title={about.trust.title}
        subtitle={about.trust.subtitle}
        variant="light"
      />

      <CTASection
        title={about.cta.title}
        subtitle={about.cta.subtitle}
        variant="dark"
        ctaLabel={dict.common.bookConsultation}
        ctaHref={`/${lang}/contact`}
      />
    </>
  );
}
