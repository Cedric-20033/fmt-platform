import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "./language-switcher";

const NAV_ITEMS = ["about", "projects", "news", "events", "partners"] as const;

export async function Navbar() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("nav"),
  ]);

  const navLink = (anchor: string) => `/${locale}#${anchor}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20">
        <div className="flex items-center justify-between h-full">
          <Link href={`/${locale}`} className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo.png"
              alt="FMT e.V. Logo"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
            <div className="hidden sm:block">
              <p className="text-[#2b8a8a] font-bold text-lg leading-tight">FMT e.V.</p>
              <p className="text-gray-500 text-xs leading-tight">Fondation Mefo Tuèbu</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item}
                href={navLink(item)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#2b8a8a] rounded-lg hover:bg-[#e6f4f4] transition-colors"
              >
                {t(item)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Button asChild size="sm" variant="accent">
              <Link href={`/${locale}#donate`}>{t("donate")}</Link>
            </Button>
          </div>

          <details className="group relative lg:hidden">
            <summary className="list-none cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 [&::-webkit-details-marker]:hidden">
              <span className="sr-only"><Menu size={22} className="block group-open:hidden" /></span>
              
              <X size={22} className="hidden group-open:block" />
            </summary>

            <div className="fixed left-0 right-0 top-20 z-[90] bg-white border-t border-gray-100 shadow-2xl">
              <div className="max-w-7xl mx-auto px-4 py-4 flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item}
                    href={navLink(item)}
                    className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#2b8a8a] hover:bg-[#e6f4f4] rounded-lg transition-colors"
                  >
                    {t(item)}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between gap-4">
                  <LanguageSwitcher />
                  <Button asChild size="sm" variant="accent">
                    <Link href={`/${locale}#donate`}>{t("donate")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
