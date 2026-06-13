import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/Cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#e6f4f4] text-[#1a5c5c]",
        accent: "bg-[#fff4e6] text-[#d97706]",
        active: "bg-emerald-100 text-emerald-800",
        completed: "bg-gray-100 text-gray-600",
        planned: "bg-blue-100 text-blue-700",
        outline: "border border-[#2b8a8a] text-[#2b8a8a] bg-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Rend un badge stylisé selon la variante demandée, en fusionnant les classes supplémentaires.
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
