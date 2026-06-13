import Link from "next/link";
import { getLocale } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/Cn";

const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};

interface LanguageSwitcherProps {
  className?: string;
}

export async function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const currentLocale = (await getLocale()) as Locale;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {locales.map((locale: Locale, index: number) => (
        <span key={locale} className="flex items-center">
          <Link
            href={`/${locale}`}
            aria-label={`Switch to ${locale.toUpperCase()}`}
            className={cn(
              "px-2 py-1 text-xs font-semibold rounded transition-colors",
              currentLocale === locale
                ? "bg-[#2b8a8a] text-white"
                : "text-gray-500 hover:text-[#2b8a8a]"
            )}
          >
            {LOCALE_LABELS[locale]}
          </Link>
          {index < locales.length - 1 && (
            <span className="text-gray-300 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
