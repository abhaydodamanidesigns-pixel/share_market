import type { Dictionary } from "@/src/dictionaries";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function TestimonialsSection({ dict }: { dict: Dictionary }) {
  const testimonials = dict.home.testimonials.items.map((item) => ({
    ...item,
    initials: getInitials(item.name),
  }));
  return (
    <section
      className="section-padding bg-surface-50"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-base">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge bg-navy-50 text-navy-700 mb-3">
            {dict.home.testimonials.badge}
          </span>
          <h2
            id="testimonials-heading"
            className="section-heading mt-2"
          >
            {dict.home.testimonials.heading}
          </h2>
          <p className="section-subheading mx-auto text-center mt-4">
            {dict.home.testimonials.subheading}
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" role="list">
          {testimonials.map(({ quote, name, role, initials }) => (
            <blockquote
              key={name}
              role="listitem"
              className="card flex flex-col"
            >
              {/* Quote mark */}
              <span
                className="text-4xl text-gold-300 font-serif leading-none mb-3"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Quote text */}
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">
                {quote}
              </p>

              {/* Attribution */}
              <footer className="flex items-center gap-3 pt-4 border-t border-gray-100">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full bg-navy-100 text-navy-700 font-bold text-sm flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div>
                  <cite className="font-semibold text-navy-900 text-sm not-italic">
                    {name}
                  </cite>
                  <p className="text-xs text-gray-500 mt-0.5">{role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-400 mt-8">
          {dict.home.testimonials.disclaimer}
        </p>
      </div>
    </section>
  );
}
