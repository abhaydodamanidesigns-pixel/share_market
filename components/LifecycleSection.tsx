import Link from "next/link";
import type { Dictionary } from "@/src/dictionaries";

const LIFECYCLE_STAGE_META = [
  {
    step: "01",
    href: "/learn",
    icon: "📚",
    color: "from-blue-50 to-indigo-50 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    step: "02",
    href: "/invest",
    icon: "📈",
    color: "from-emerald-50 to-teal-50 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    step: "03",
    href: "/protect",
    icon: "🛡️",
    color: "from-amber-50 to-orange-50 border-amber-100",
    iconBg: "bg-amber-100",
  },
  {
    step: "04",
    href: "/recover",
    icon: "🔄",
    color: "from-rose-50 to-pink-50 border-rose-100",
    iconBg: "bg-rose-100",
  },
];

export default function LifecycleSection({
  dict,
  locale = "en",
}: {
  dict: Dictionary;
  locale?: string;
}) {
  const lifecycleStages = dict.lifecycle.stages.map((stage, i) => ({
    ...LIFECYCLE_STAGE_META[i],
    href: `/${locale}${LIFECYCLE_STAGE_META[i].href}`,
    label: stage.label,
    description: stage.description,
    features: stage.features,
  }));
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="lifecycle-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge bg-gold-50 text-gold-700 mb-3">
            {dict.lifecycle.badge}
          </span>
          <h2
            id="lifecycle-heading"
            className="section-heading mt-2"
          >
            {dict.lifecycle.heading}
          </h2>
          <p className="section-subheading mx-auto text-center mt-4">
            {dict.lifecycle.subtitle}
          </p>
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifecycleStages.map(
            ({ step, label, href, icon, color, iconBg, description, features }) => (
              <article
                key={step}
                className={`relative rounded-2xl border bg-gradient-to-br p-6 ${color} flex flex-col group hover:shadow-card-hover transition-shadow duration-300`}
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-xs font-bold text-gray-300">
                  {step}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${iconBg}`}
                  aria-hidden="true"
                >
                  {icon}
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-navy-900 mb-2">
                  {label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
                  {description}
                </p>

                {/* Feature list */}
                <ul className="space-y-1.5 mb-5">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-xs text-gray-700"
                    >
                      <svg
                        className="w-3.5 h-3.5 text-navy-400 flex-shrink-0 mt-0.5"
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
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA link */}
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 text-navy-700 font-semibold text-sm group-hover:text-navy-900 transition-colors"
                  aria-label={`${dict.lifecycle.explore} our ${label} services`}
                >
                  {dict.lifecycle.explore} {label}
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
                </Link>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
