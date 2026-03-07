"use client";

export default function NewsletterForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      aria-label="Newsletter subscription form"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="email-input" className="sr-only">
        Email address
      </label>
      <input
        id="email-input"
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 rounded-xl border border-dark-border bg-dark-card text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand"
        required
        aria-label="Email address for newsletter"
      />
      <button type="submit" className="btn-primary flex-shrink-0">
        Subscribe
      </button>
    </form>
  );
}
