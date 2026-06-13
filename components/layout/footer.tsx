import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Mail, MapPin, Heart } from "lucide-react";
import { Separator } from "@/components/ui/Separator";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-[#1a5c5c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Bloc marque */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="FMT e.V. Logo"
                width={52}
                height={52}
                className="rounded-full"
              />
              <div>
                <p className="font-bold text-xl">FMT e.V.</p>
                <p className="text-teal-300 text-sm">Fondation Mefo Tuèbu</p>
              </div>
            </div>
            <p className="text-teal-200 text-sm leading-relaxed mb-4">{t("tagline")}</p>
            <p className="text-teal-300 text-xs leading-relaxed">{t("legal")}</p>
          </div>

          {/* Liens de navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-300 mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {(["about", "projects", "news", "events", "partners"] as const).map((item) => (
                <li key={item}>
                  <Link
                    href={`/${locale}#${item}`}
                    className="text-teal-100 hover:text-white text-sm transition-colors"
                  >
                    {tNav(item)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-teal-300 mb-5">
              {tNav("contact")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#f39237] mt-0.5 shrink-0" />
                <p className="text-teal-100 text-sm">Deutschland</p>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-[#f39237] mt-0.5 shrink-0" />
                <a
                  href="mailto:contact@fmt-ev.org"
                  className="text-teal-100 hover:text-white text-sm transition-colors"
                >
                  contact@fmt-ev.org
                </a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-teal-700" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-teal-300 text-xs">
            © {new Date().getFullYear()} FMT e.V. — {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/legal`} className="text-teal-300 hover:text-white text-xs transition-colors">
              {t("legal_notice")}
            </Link>
            <Link href={`/${locale}/privacy`} className="text-teal-300 hover:text-white text-xs transition-colors">
              {t("privacy")}
            </Link>
          </div>
          <p className="text-teal-400 text-xs flex items-center gap-1">
            Made with <Heart size={12} className="text-[#f39237]" /> for humanity
          </p>
        </div>
      </div>
    </footer>
  );
}
