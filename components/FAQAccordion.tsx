"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  items,
  title = "Frequently Asked Questions",
  subtitle,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      className="section-padding bg-surface-50"
      aria-labelledby="faq-heading"
    >
      <div className="container-base">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 id="faq-heading" className="section-heading">
            {title}
          </h2>
          {subtitle && (
            <p className="section-subheading mx-auto text-center mt-3">
              {subtitle}
            </p>
          )}
        </div>

        {/* Accordion list */}
        <div
          className="max-w-3xl mx-auto space-y-3"
          role="list"
          aria-label="FAQ items"
        >
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const headingId = `faq-heading-${idx}`;

            return (
              <div
                key={idx}
                role="listitem"
                className={`bg-white rounded-2xl border transition-shadow ${
                  isOpen
                    ? "border-navy-200 shadow-card"
                    : "border-gray-100 shadow-sm"
                }`}
              >
                {/* Question button */}
                <button
                  id={headingId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(idx)}
                  className="w-full flex items-start justify-between gap-4 text-left px-6 py-4 rounded-2xl group"
                >
                  <span className="font-semibold text-navy-900 text-sm md:text-base leading-snug">
                    {item.question}
                  </span>
                  {/* Chevron */}
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform mt-0.5 ${
                      isOpen ? "bg-navy-900 rotate-180" : "bg-gray-100"
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-gray-500"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer panel */}
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    className="px-6 pb-5"
                  >
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
