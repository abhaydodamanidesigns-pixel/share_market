import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { getDictionary } from "@/src/dictionaries";

export const metadata: Metadata = {
  title: "Book a Free Consultation — Contact Saarthi Finance",
  description:
    "Book a free 30-minute consultation with a SEBI-registered investment adviser. Discuss your financial goals, insurance needs, or recovery case — no commitment required.",
};

export default async function ContactPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const dict = await getDictionary(lang);
  const contact = dict.contact;

  return (
    <>
      <HeroSection
        variant="dark"
        eyebrow={contact.hero.eyebrow}
        headline={contact.hero.headline}
        headlineAccent={contact.hero.headlineAccent}
        subtext={contact.hero.subtext}
        ctaLabel={contact.hero.ctaLabel}
        ctaHref="#consultation-form"
        showTrustBadges={false}
      />

      <section
        className="section-padding bg-dark-surface"
        aria-labelledby="consultation-types-heading"
      >
        <div className="container-base">
          <div className="text-center mb-10">
            <h2
              id="consultation-types-heading"
              className="section-heading"
            >
              {contact.consultationTypes.heading}
            </h2>
            <p className="section-subheading mx-auto text-center mt-3">
              {contact.consultationTypes.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contact.consultationTypes.items.map(({ icon, title, description, duration }) => (
              <div key={title} className="card text-center group cursor-default">
                <span className="text-3xl mb-3 block" aria-hidden="true">
                  {icon}
                </span>
                <h3 className="font-semibold text-ink mb-1.5">{title}</h3>
                <p className="text-xs text-ink-muted mb-2 leading-relaxed">
                  {description}
                </p>
                <span className="badge bg-dark-elevated text-brand">
                  {duration} session
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="consultation-form"
        className="section-padding bg-dark-panel"
        aria-labelledby="form-heading"
      >
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-dark-surface rounded-3xl p-8 shadow-card border border-dark-border">
                <h2
                  id="form-heading"
                  className="text-2xl font-bold text-ink mb-2"
                >
                  {contact.form.heading}
                </h2>
                <p className="text-ink-dim text-sm mb-6">
                  {contact.form.subtext}
                </p>
                <ContactForm dict={contact.formLabels} />
              </div>
            </div>

            <aside aria-label="Contact information and what to expect">
              <div className="space-y-6">
                <div className="card">
                  <h3 className="font-semibold text-ink mb-4">
                    {contact.whatToExpect.heading}
                  </h3>
                  <ol className="space-y-3">
                    {contact.whatToExpect.items.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-ink-dim">
                        <span className="w-5 h-5 rounded-full bg-dark-elevated text-ink-dim font-bold text-xs flex-shrink-0 flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="card">
                  <h3 className="font-semibold text-ink mb-4">
                    {contact.directContact.heading}
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="mailto:hello@saarthi-finance.in"
                      className="flex items-center gap-3 text-sm text-ink-dim hover:text-ink transition-colors"
                    >
                      <span
                        className="w-8 h-8 rounded-lg bg-dark-elevated flex items-center justify-center"
                        aria-hidden="true"
                      >
                        ✉️
                      </span>
                      hello@saarthi-finance.in
                    </a>
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 text-sm text-ink-dim hover:text-ink transition-colors"
                    >
                      <span
                        className="w-8 h-8 rounded-lg bg-dark-elevated flex items-center justify-center"
                        aria-hidden="true"
                      >
                        📞
                      </span>
                      +91 98765 43210
                    </a>
                    <div className="flex items-start gap-3 text-sm text-ink-dim">
                      <span
                        className="w-8 h-8 rounded-lg bg-dark-elevated flex items-center justify-center flex-shrink-0"
                        aria-hidden="true"
                      >
                        📍
                      </span>
                      <address className="not-italic text-ink-muted text-xs leading-relaxed whitespace-pre-line">
                        {contact.directContact.address}
                      </address>
                    </div>
                  </div>
                </div>

                <div className="bg-dark-card rounded-2xl p-5 border border-dark-border">
                  <p className="text-xs font-bold text-brand uppercase tracking-wide mb-2">
                    {contact.directContact.regulatoryTitle}
                  </p>
                  <p className="text-xs text-ink-dim leading-relaxed whitespace-pre-line">
                    {contact.directContact.regulatoryDetails}
                  </p>
                  <p className="text-xs text-ink-muted mt-2 leading-relaxed">
                    {contact.directContact.grievanceNote}
                  </p>
                </div>

                <Link
                  href={`/${lang}/compliance`}
                  className="text-sm text-brand hover:text-ink flex items-center gap-1.5 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {contact.directContact.viewCompliance}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <TrustSection
        title={contact.trust.title}
        subtitle={contact.trust.subtitle}
        variant="light"
      />
    </>
  );
}
