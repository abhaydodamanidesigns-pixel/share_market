import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";

// Sample static article data — in production, replace with CMS or MDX
const articles: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    readTime: string;
    coverEmoji: string;
    excerpt: string;
    content: { heading?: string; body: string }[];
    relatedLinks: { href: string; label: string }[];
  }
> = {
  "understanding-iepf-claims": {
    title:
      "How to Claim Your Family's Shares from IEPF — A Step-by-Step Guide",
    category: "Recover",
    date: "2024-11-15",
    readTime: "8 min",
    coverEmoji: "📑",
    excerpt:
      "A complete guide to understanding IEPF, identifying unclaimed shares, and filing your IEPF-5 claim to recover what belongs to your family.",
    content: [
      {
        heading: "What is IEPF?",
        body: "The Investor Education and Protection Fund (IEPF) is a statutory fund established under Section 125 of the Companies Act, 2013. It is administered by the Ministry of Corporate Affairs through the IEPF Authority. Any dividends that remain unclaimed by shareholders for a period of seven consecutive years are required by law to be transferred to this fund by the respective company.",
      },
      {
        heading: "When Are Shares Transferred to IEPF?",
        body: "In 2016, an amendment to the Companies Act introduced a further provision: not just unpaid dividends, but the underlying shares of shareholders who have not claimed dividends for seven consecutive years are also required to be transferred to IEPF. This means that if you (or your family) have not received or claimed dividends from a company for seven years or more, those shares may no longer be in your demat or physical holding — they may have been transferred to IEPF.",
      },
      {
        heading: "How to Check If Your Shares Are in IEPF",
        body: "You can check the IEPF Authority's web portal at iepf.gov.in. Search by your name, folio number, or PAN. Companies are also required to send notice to shareholders before transferring shares, so check your old correspondence. For inherited shares, check the original shareholder's name. Note that the IEPF database may have name variations — our team cross-references multiple databases to ensure nothing is missed.",
      },
      {
        heading: "The IEPF Claim Process (IEPF-5 Form)",
        body: "Step 1: Ensure you have an active demat account in your name. Step 2: Gather required documents — original share certificates (if physical), self-attested identity and address proof, cancelled cheque, demat account statement, and Indemnity Bond on ₹500 stamp paper. Step 3: File Form IEPF-5 on the MCA portal (mca.gov.in). Step 4: After filing, submit physical documents to the respective company's Nodal Officer. Step 5: The company verifies and forwards to IEPF Authority. Step 6: IEPF Authority credits shares to your demat account.",
      },
      {
        heading: "Important Things to Know Before Filing",
        body: "Accuracy in the IEPF-5 form is critical — errors lead to rejection and restart of the process. You can only file one claim per company per year. If the original shareholder has passed away, the claim must be filed by the legal heir with appropriate succession documentation. Physical share certificates must be surrendered to the company's RTA as part of the process. All documents must be self-attested and, in case of legal heirs, attested by a notary.",
      },
      {
        heading: "How Saarthi Finance Can Help",
        body: "The IEPF claim process involves multiple government portals, company Nodal Officers, RTAs, and the IEPF Authority — with coordination between all parties and careful attention to documentation. Our team has handled numerous IEPF claims, including complex multi-generation transmission cases. We handle the entire process on your behalf, from discovery to credit confirmation, with regular status updates throughout.",
      },
    ],
    relatedLinks: [
      {
        href: "/recover",
        label: "Recover & Regularise — Our Full Services",
      },
      {
        href: "/resources/physical-shares-demat",
        label: "Dematerialising Physical Share Certificates",
      },
      {
        href: "/contact",
        label: "Book a Recovery Consultation",
      },
    ],
  },
};

// Generate static metadata
export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const article = articles[params.slug];
  if (!article) {
    return { title: "Article Not Found" };
  }
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default function ArticlePage({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = params;
  const article = articles[slug];

  // 404 fallback
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24">
        <span className="text-6xl mb-4" aria-hidden="true">📄</span>
        <h1 className="text-2xl font-bold text-navy-900 mb-2">
          Article Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          This article doesn&apos;t exist or may have been moved.
        </p>
        <Link href={`/${lang}/resources`} className="btn-primary">
          Browse All Articles
        </Link>
      </div>
    );
  }

  const {
    title,
    category,
    date,
    readTime,
    coverEmoji,
    excerpt,
    content,
    relatedLinks,
  } = article;

  // Prepend lang to internal related links
  const prefixedRelatedLinks = relatedLinks.map(({ href, label }) => ({
    href: href.startsWith("http") ? href : `/${lang}${href}`,
    label,
  }));

  return (
    <>
      {/* Article header */}
      <section className="gradient-navy text-white pt-28 pb-12">
        <div className="container-base">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs text-navy-300">
                <li>
                  <Link href={`/${lang}`} className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/${lang}/resources`}
                    className="hover:text-white transition-colors"
                  >
                    Resources
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white font-medium" aria-current="page">
                  {category}
                </li>
              </ol>
            </nav>

            {/* Category */}
            <span className="badge bg-gold-500/20 text-gold-300 mb-3">
              {category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 mt-2">
              {title}
            </h1>

            {/* Excerpt */}
            <p className="text-lg text-navy-200 leading-relaxed mb-6">{excerpt}</p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-navy-300">
              <span className="text-2xl" aria-hidden="true">{coverEmoji}</span>
              <time dateTime={date}>
                {new Date(date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span aria-hidden="true">·</span>
              <span>{readTime} read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article
        className="section-padding bg-white"
        aria-label={`Article: ${title}`}
      >
        <div className="container-base">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="prose prose-navy max-w-none">
                {content.map(({ heading, body }, idx) => (
                  <section key={idx} className="mb-8">
                    {heading && (
                      <h2 className="text-xl font-bold text-navy-900 mb-3">
                        {heading}
                      </h2>
                    )}
                    <p className="text-gray-700 leading-relaxed">{body}</p>
                  </section>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-10 p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
                <strong>Disclaimer:</strong> This article is for educational
                purposes only and does not constitute legal or financial advice.
                Regulations and procedures may change. Always verify with the
                relevant authority (IEPF, SEBI, company RTA) before taking
                action. For personalised assistance, book a consultation with
                our team.
              </div>
            </div>

            {/* Sidebar */}
            <aside aria-label="Related links and consultation">
              <div className="sticky top-24 space-y-6">
                {/* Related articles */}
                <div className="card">
                  <h3 className="font-semibold text-navy-900 mb-4 text-sm">
                    Related Resources
                  </h3>
                  <ul className="space-y-2.5">
                    {prefixedRelatedLinks.map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-sm text-navy-700 hover:text-navy-900 flex items-center gap-1.5 transition-colors"
                        >
                          <svg
                            className="w-3.5 h-3.5 flex-shrink-0"
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
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Consultation nudge */}
                <div className="bg-navy-50 rounded-2xl p-5 border border-navy-100">
                  <p className="font-semibold text-navy-900 text-sm mb-2">
                    Need help with your specific case?
                  </p>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Our advisers can review your situation and guide you
                    step by step — free for the first session.
                  </p>
                  <Link
                    href={`/${lang}/contact`}
                    className="btn-primary w-full justify-center text-sm"
                  >
                    Book Free Consultation
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <CTASection
        title="Ready to Recover Your Family's Assets?"
        subtitle="Our specialists handle the complete IEPF claim process on your behalf — from discovery to demat credit."
        variant="dark"
        ctaHref={`/${lang}/contact`}
      />
    </>
  );
}
