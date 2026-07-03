"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/Cn";

const NAV_ITEMS = ["about", "projects", "news", "events", "partners", "contact"] as const;
type NavItem = (typeof NAV_ITEMS)[number];

interface NavLinksProps {
  locale: string;
  labels: Record<NavItem, string>;
  /** Style mobile ou desktop */
  variant?: "desktop" | "mobile";
}

/**
 * Liens de navigation avec détection de la section active au scroll.
 * Séparé de Navbar pour isoler la logique client.
 */
export function NavLinks({ locale, labels, variant = "desktop" }: NavLinksProps) {
  const [active, setActive] = useState<NavItem | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(item);
        },
        {
          // La section est considérée active quand elle occupe le centre de l'écran
          rootMargin: "-40% 0px -55% 0px",
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isDesktop = variant === "desktop";

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item;

        return (
          <Link
            key={item}
            href={`/${locale}#${item}`}
            className={cn(
              "relative font-medium transition-colors duration-200",
              isDesktop
                ? "px-4 py-2 text-sm rounded-lg"
                : "px-4 py-3 text-sm rounded-lg",
              isActive
                ? "text-[#2b8a8a]"
                : "text-gray-600 hover:text-[#2b8a8a] hover:bg-[#e6f4f4]"
            )}
          >
            {labels[item]}

            {/* Indicateur actif — trait animé sous le lien */}
            {isDesktop && (
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[#2b8a8a] rounded-full transition-all duration-300",
                  isActive ? "w-4/5 opacity-100" : "w-0 opacity-0"
                )}
              />
            )}

            {/* Indicateur actif mobile — barre à gauche */}
            {!isDesktop && (
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] bg-[#2b8a8a] rounded-full transition-all duration-300",
                  isActive ? "h-4/5 opacity-100" : "h-0 opacity-0"
                )}
              />
            )}
          </Link>
        );
      })}
    </>
  );
}