import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-4xl font-bold text-navy-900">404</h1>
      <h2 className="text-xl font-semibold text-navy-800">Page not found</h2>
      <p className="text-gray-600 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/en"
        className="px-5 py-2.5 bg-navy-900 text-white rounded-xl font-medium hover:bg-navy-800 transition-colors"
      >
        Go to home
      </Link>
    </div>
  );
}
