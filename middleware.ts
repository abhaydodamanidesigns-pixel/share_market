import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "hi", "kn"] as const;
const DEFAULT_LOCALE = "en";

function getLocale(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && SUPPORTED_LOCALES.includes(first as (typeof SUPPORTED_LOCALES)[number])) {
    return first;
  }
  return null;
}

function hasLocale(pathname: string): boolean {
  return getLocale(pathname) !== null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // favicon, etc.
  ) {
    return NextResponse.next();
  }

  // Redirect root "/" to "/en"
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  // If path has no valid locale prefix, prepend default locale
  if (!hasLocale(pathname)) {
    const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  const locale = getLocale(pathname);
  // Validate locale; redirect to default if invalid
  if (!locale || !SUPPORTED_LOCALES.includes(locale as (typeof SUPPORTED_LOCALES)[number])) {
    const remainder = pathname.replace(/^\/[^/]+/, "") || "";
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}${remainder}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
