"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Heart, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/Cn";

const PRESET_KEYS = ["amount_1", "amount_2", "amount_3"] as const;

export function DonateSection() {
  const t = useTranslations("donate");
  const [selected, setSelected] = useState<string>("amount_2");

  return (
    <section
      id="donate"
      className="py-24 bg-gradient-to-br from-[#1a5c5c] to-[#2b8a8a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Colonne de gauche : texte */}
          <div className="text-white">
            <Badge
              variant="outline"
              className="mb-6 border-white/40 text-white/80"
            >
              {t("label")}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
              {t("title")}
            </h2>
            <p className="text-teal-100 leading-relaxed text-lg mb-8">
              {t("description")}
            </p>
            <div className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
              <ShieldCheck
                size={20}
                className="text-[#f39237] shrink-0 mt-0.5"
              />
              <p className="text-teal-200 text-sm leading-relaxed">
                {t("note")}
              </p>
            </div>
          </div>

          {/* Colonne de droite : module de don */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Heart size={20} className="text-[#f39237]" />
              <h3 className="font-semibold text-gray-900 text-lg">
                {t("cta")}
              </h3>
            </div>

            {/* Montants prédéfinis */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {PRESET_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={cn(
                    "py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all duration-200",
                    selected === key
                      ? "border-[#2b8a8a] bg-[#e6f4f4] text-[#1a5c5c]"
                      : "border-gray-200 text-gray-600 hover:border-[#2b8a8a]/40",
                  )}
                >
                  {t(key)}
                </button>
              ))}
            </div>

            {/* Montant personnalisé */}
            <button
              onClick={() => setSelected("custom")}
              className={cn(
                "w-full py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all duration-200 mb-6",
                selected === "custom"
                  ? "border-[#f39237] bg-[#fff4e6] text-[#d97706]"
                  : "border-gray-200 text-gray-500 hover:border-[#f39237]/40",
              )}
            >
              {t("amount_4")}
            </button>

            {selected === "custom" && (
              <div className="mb-6">
                <div className="flex items-center border-2 border-[#f39237] rounded-xl overflow-hidden">
                  <span className="px-4 py-3 bg-gray-50 text-gray-500 font-medium border-r border-gray-200">
                    €
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="0.00"
                    className="flex-1 px-4 py-3 text-gray-900 outline-none text-sm"
                  />
                </div>
              </div>
            )}

            <Button
              size="lg"
              variant="accent"
              className="w-full opacity-50 cursor-not-allowed"
              disabled
            >
              <Heart size={18} />
              {t("cta")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
