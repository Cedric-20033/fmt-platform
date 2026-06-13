import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine les classes avec `clsx`, puis fusionne les utilitaires Tailwind contradictoires avec `twMerge`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
