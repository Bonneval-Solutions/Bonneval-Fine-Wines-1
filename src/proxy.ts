import { NextRequest, NextResponse } from "next/server";
import { getLocale, normalizeLocale } from "./i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isIgnored =
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/slice-simulator") ||
    pathname.includes(".");

  if (isIgnored) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const pathLocale = first ? normalizeLocale(first) : null;

  if (pathLocale) {
    if (first !== pathLocale) {
      const rest = segments.slice(1).join("/");
      const url = request.nextUrl.clone();
      url.pathname = rest ? `/${pathLocale}/${rest}` : `/${pathLocale}`;
      return NextResponse.redirect(url, 308);
    }
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", pathLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
