// components/gallery/MediaTabs.tsx
"use client";

import { ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils/Cn";

export type MediaTabValue = "photos" | "videos";

interface MediaTabsProps {
  active: MediaTabValue;
  onChange: (tab: MediaTabValue) => void;
  photosCount: number;
  videosCount: number;
  photosLabel: string;
  videosLabel: string;
  /** "light" pour fond blanc (grilles inline), "dark" pour la lightbox/modal plein écran. */
  theme?: "light" | "dark";
}

export function MediaTabs({
  active,
  onChange,
  photosCount,
  videosCount,
  photosLabel,
  videosLabel,
  theme = "light",
}: MediaTabsProps) {
  const tabs: { value: MediaTabValue; label: string; count: number; Icon: typeof ImageIcon }[] = [
    { value: "photos", label: photosLabel, count: photosCount, Icon: ImageIcon },
    { value: "videos", label: videosLabel, count: videosCount, Icon: Video },
  ];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1 mb-6",
        theme === "dark" ? "bg-white/10" : "bg-gray-100"
      )}
      role="tablist"
    >
      {tabs.map(({ value, label, count, Icon }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={count === 0}
            onClick={() => onChange(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
              isActive
                ? theme === "dark"
                  ? "bg-white text-[#0f2a2a]"
                  : "bg-white text-[#0f2a2a] shadow-sm"
                : theme === "dark"
                  ? "text-white/70 hover:text-white"
                  : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Icon size={15} />
            {label}
            <span className={cn("text-xs font-normal", isActive ? "opacity-70" : "opacity-50")}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
