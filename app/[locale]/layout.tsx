import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n/request";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale: string) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) return {};

  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: `FMT e.V. â€” ${t("headline")}`,
    description: t("subheadline"),
    alternates: {
      languages: Object.fromEntries(locales.map((l: string) => [l, `/${l}`])),
    },
    openGraph: {
      title: "FMT e.V. â€” Fondation Mefo TuÃ¨bu",
      description: t("subheadline"),
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale as Locale} messages={messages}>
      {/* La barre de navigation reste montée entre les navigations pour préserver son état. */}
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
