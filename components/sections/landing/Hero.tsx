import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";

const STATS = [
  { key: "stat_projects", value: "12" },
  { key: "stat_beneficiaries", value: "3 400+" },
  { key: "stat_countries", value: "6" },
  { key: "stat_volunteers", value: "85" },
] as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#f9f7f5] via-[#e6f4f4] to-[#f9f7f5]">
      {/* Formes décoratives d'arrière-plan */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #2b8a8a 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, #f39237 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="max-w-3xl">
          {/* Badge d'introduction */}
          <Badge variant="default" className="mb-6 text-xs">
            <Heart size={12} className="mr-1.5 text-[#f39237]" />
            {t("badge")}
          </Badge>

          <Reveal from="up" delay={0.1}>
            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              <span className="text-[#2b8a8a]">Prévention</span>
              {" · "}
              <span className="text-[#f39237]">Éducation</span>
              {" · "}
              <span className="text-[#2b8a8a]">Intégration</span>
            </h1>
          
            <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl">
              {t("subheadline")}
            </p>
          
            {/* Appels à l'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href={`/${locale}#projects`}>
                  {t("cta_primary")}
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={`/${locale}#donate`}>{t("cta_secondary")}</Link>
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Statistiques */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {STATS.map(({ key, value }, index) => (
            <Reveal key={key} from="up" delay={index * 0.15}>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white shadow-sm text-center">
                <p className="text-3xl font-bold text-[#2b8a8a]">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{t(key)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
