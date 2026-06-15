import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

import { Reveal } from "@/components/animations/Reveal";
import { Typewriter } from "@/components/animations/TypeWriter";

type ProjectKey = "project_1" | "project_2" | "project_3";
type ProjectTitleKey = `${ProjectKey}_title`;
type ProjectDescKey = `${ProjectKey}_desc`;
type ProjectLocationKey = `${ProjectKey}_location`;
type StatusKey = "active" | "active" | "active";

const PROJECTS: {
  key: ProjectKey;
  statusKey: "status_active" | "status_completed" | "status_planned";
  accentColor: string;
}[] = [
  {
    key: "project_1",
    statusKey: "status_active",
    accentColor: "border-t-[#2b8a8a]",
  },
  {
    key: "project_2",
    statusKey: "status_active",
    accentColor: "border-t-[#f39237]",
  },
  {
    key: "project_3",
    statusKey: "status_active",
    accentColor: "border-t-[#2b8a8a]",
  },
];

const STATUS_BADGE: Record<string, "active" | "completed" | "planned"> = {
  status_active: "active",
  status_completed: "completed",
  status_planned: "planned",
};

export function ProjectsSection() {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <section id="projects" className="py-24 bg-[#f9f7f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <Badge variant="default" className="mb-4">
              {t("label")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              <Typewriter text={t("title")}  speed={50} />
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl">{t("description")}</p>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link
              href={`/${locale}/projects`}
              aria-disabled="true"
              className="pointer-events-none opacity-50"
            >
              {t("view_all")} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map(({ key, statusKey, accentColor }) => (
            <Reveal from="up" delay={0.1} key={key}>
              <Card
                className={`border-t-4 ${accentColor} hover:shadow-lg transition-shadow duration-300`}
              >
                <CardHeader>
                  <Badge variant={STATUS_BADGE[statusKey]} className="w-fit">
                    {t(statusKey)}
                  </Badge>
                  <CardTitle className="mt-2">
                    {t(`${key}_title` as ProjectTitleKey)}
                  </CardTitle>
                  <CardDescription>
                    {t(`${key}_desc` as ProjectDescKey)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={13} />
                    <span>{t(`${key}_location` as ProjectLocationKey)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-0 hover:px-2"
                    disabled
                  >
                    {t("view_all")} <ArrowRight size={14} />
                  </Button>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
