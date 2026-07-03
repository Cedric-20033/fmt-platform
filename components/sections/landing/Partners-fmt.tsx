import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Typewriter } from "@/components/animations/TypeWriter";

const PARTNERS = [
  { name: "Deutsches Rotes Kreuz", abbr: "DRK" },
  { name: "UNICEF Deutschland", abbr: "UNICEF" },
  { name: "Caritas International", abbr: "Caritas" },
  { name: "Welthungerhilfe", abbr: "WHH" },
  { name: "GIZ", abbr: "GIZ" },
  { name: "AWO International", abbr: "AWO" },
];

export function PartnersSection() {
  const t = useTranslations("partners");

  return (
    <section id="partners" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <Badge variant="default" className="mb-4">
            {t("label")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            <Typewriter text={t("title")}  speed={50} />
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto"><Typewriter text={t("description")}  speed={60} delay={0.8} /></p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {PARTNERS.map(({ name, abbr }) => (
            <div
              key={name}
              title={name}
              className="flex items-center justify-center h-20 rounded-xl border border-gray-200 bg-gray-50 hover:border-[#2b8a8a]/40 hover:bg-[#e6f4f4] transition-all duration-200 cursor-default"
            >
              <span className="text-sm font-semibold text-gray-500 hover:text-[#2b8a8a] transition-colors">
                {abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
