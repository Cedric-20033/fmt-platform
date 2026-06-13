import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/i18n/request";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

/** Segments de route soumis à authentification */
const PROTECTED_SEGMENTS = ["admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/");
  // segments[1] = locale, segments[2] = segment de route
  const isProtected = PROTECTED_SEGMENTS.some((s) => segments[2] === s);

  if (isProtected) {
    // TODO : valider la session Supabase et appliquer le RBAC (phase 2)
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
