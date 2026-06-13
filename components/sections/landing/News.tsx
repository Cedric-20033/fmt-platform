import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";

const NEWS_ITEMS = ["news_1", "news_2", "news_3"] as const;
type NewsItemKey = (typeof NEWS_ITEMS)[number];
type NewsTranslationSuffix = "date" | "title" | "excerpt";
const newsTranslationKey = (
  key: NewsItemKey,
  suffix: NewsTranslationSuffix,
) => `${key}_${suffix}` as const;

export function NewsSection() {
  const t = useTranslations("news");
  const locale = useLocale();

  return (
    <section id="news" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <Badge variant="default" className="mb-4">
              {t("label")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {t("title")}
            </h2>
          </div>
          <Button asChild variant="outline" size="sm" disabled>
            <Link href={`/${locale}/news`}>
              {t("view_all")} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((key) => (
            <Card
              key={key}
              className="hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Bande colorée */}
              <div className="h-1.5 bg-gradient-to-r from-[#2b8a8a] to-[#f39237] rounded-t-xl" />
              <CardHeader className="flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <Calendar size={13} />
                  <span>{t(newsTranslationKey(key, "date"))}</span>
                </div>
                <CardTitle>{t(newsTranslationKey(key, "title"))}</CardTitle>
                <CardDescription>{t(newsTranslationKey(key, "excerpt"))}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 text-[#2b8a8a] hover:px-2"
                  disabled
                >
                  {t("read_more")} <ArrowRight size={14} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
