interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon?: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  /** Horizontal layout (default) or vertical */
  layout?: "horizontal" | "vertical";
}

export default function ProcessTimeline({
  steps,
  title = "How We Work Together",
  subtitle = "A clear, structured process so you always know what to expect.",
  layout = "horizontal",
}: ProcessTimelineProps) {
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="process-heading"
    >
      <div className="container-base">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 id="process-heading" className="section-heading">
            {title}
          </h2>
          <p className="section-subheading mx-auto text-center mt-4">{subtitle}</p>
        </div>

        {layout === "horizontal" ? (
          /* ── Horizontal timeline ── */
          <ol
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            aria-label="Process steps"
          >
            {steps.map((step, idx) => (
              <li key={step.number} className="relative flex flex-col">
                {/* Connector line (desktop only, between cards) */}
                {idx < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-navy-200 to-transparent z-0"
                    aria-hidden="true"
                    style={{ transform: "translateX(1rem)" }}
                  />
                )}

                {/* Step circle */}
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-navy-900 text-white font-bold text-lg flex items-center justify-center shadow-card">
                    {step.icon ?? step.number}
                  </span>
                  <div className="h-px flex-1 bg-navy-100 lg:hidden" aria-hidden="true" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-navy-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        ) : (
          /* ── Vertical timeline ── */
          <ol
            className="relative max-w-2xl mx-auto space-y-0"
            aria-label="Process steps"
          >
            {steps.map((step, idx) => (
              <li key={step.number} className="relative flex gap-6 pb-10 last:pb-0">
                {/* Vertical connector */}
                {idx < steps.length - 1 && (
                  <div
                    className="absolute left-6 top-12 bottom-0 w-px bg-navy-100"
                    aria-hidden="true"
                  />
                )}

                {/* Step circle */}
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-navy-900 text-white font-bold text-lg flex items-center justify-center shadow-card z-10">
                  {step.icon ?? step.number}
                </span>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="text-lg font-semibold text-navy-900 mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
