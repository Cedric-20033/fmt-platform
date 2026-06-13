export const locales = ["fr", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
