import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale, type Locale } from "./config";

export { locales, defaultLocale };
export type { Locale };

export default getRequestConfig(async ({ requestLocale }) => {
  const awaitedLocale = await requestLocale;
  const locale =
    awaitedLocale && locales.includes(awaitedLocale as Locale)
      ? (awaitedLocale as Locale)
      : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
