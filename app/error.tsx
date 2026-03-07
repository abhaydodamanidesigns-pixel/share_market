"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-xl font-semibold text-ink">Something went wrong</h2>
      <p className="text-ink-dim text-center max-w-md">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-5 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand-hover transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
