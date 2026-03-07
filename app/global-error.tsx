"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-IN">
      <body className="antialiased min-h-screen flex flex-col items-center justify-center gap-4 px-4 bg-dark-bg">
        <h1 className="text-xl font-semibold text-ink">Something went wrong</h1>
        <p className="text-ink-dim text-center max-w-md">
          A critical error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand-hover transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
