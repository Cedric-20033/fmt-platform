/**
 * Configuration centralisee du routage i18n.
 */
import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

const routing = defineRouting({
  locales,
  defaultLocale,
});

export default routing;
