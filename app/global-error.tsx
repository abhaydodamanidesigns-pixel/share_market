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
      <body className="antialiased min-h-screen flex flex-col items-center justify-center gap-4 px-4 bg-gray-50">
        <h1 className="text-xl font-semibold text-navy-900">Something went wrong</h1>
        <p className="text-gray-600 text-center max-w-md">
          A critical error occurred. Please try refreshing the page.
        </p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-navy-900 text-white rounded-xl font-medium hover:bg-navy-800 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
