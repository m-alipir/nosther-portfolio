import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, isLocale } from "@/lib/i18n/config";

export function proxy(request: NextRequest) {
  const storedLocale = request.cookies.get("nosther_locale")?.value;
  const firstLanguage = request.headers
    .get("accept-language")
    ?.split(",")[0]
    ?.trim()
    .toLowerCase();

  const locale = storedLocale && isLocale(storedLocale)
    ? storedLocale
    : firstLanguage?.startsWith("tr")
      ? "tr"
      : defaultLocale;

  return NextResponse.redirect(new URL("/" + locale, request.url));
}

export const config = {
  matcher: ["/"],
};
