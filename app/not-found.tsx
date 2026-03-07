import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl font-bold text-ink">404</h1>
      <h2 className="text-xl font-semibold text-ink">Page not found</h2>
      <p className="text-ink-dim text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/en"
        className="px-5 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand-hover transition-colors"
      >
        Go to home
      </Link>
    </div>
  );
}
