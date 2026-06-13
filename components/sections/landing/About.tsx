import { useTranslations } from "next-intl";
import { Shield, BookOpen, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const VALUES = [
  { key: "value_1", icon: Shield, color: "text-[#2b8a8a]", bg: "bg-[#e6f4f4]" },
  {
    key: "value_2",
    icon: BookOpen,
    color: "text-[#f39237]",
    bg: "bg-[#fff4e6]",
  },
  { key: "value_3", icon: Users, color: "text-[#2b8a8a]", bg: "bg-[#e6f4f4]" },
] as const;

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Bloc texte */}
          <div>
            <Badge variant="default" className="mb-4">
              {t("label")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t("description")}
            </p>
          </div>

          {/* Valeurs */}
          <div className="grid grid-cols-1 gap-6">
            {VALUES.map(({ key, icon: Icon, color, bg }) => (
              <div
                key={key}
                className="flex items-start gap-5 p-6 rounded-xl border border-gray-100 hover:border-[#2b8a8a]/30 hover:shadow-md transition-all duration-200"
              >
                <div className={`${bg} p-3 rounded-lg shrink-0`}>
                  <Icon size={22} className={color} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(`${key}_title` as const)}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {t(`${key}_desc` as const)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
