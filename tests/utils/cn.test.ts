import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils/Cn";

describe("cn", () => {
  it("fusionne plusieurs classes simples", () => {
    // Vérifie que les classes sont concaténées correctement
    expect(
      cn("text-sm", "font-semibold")
    ).toBe("text-sm font-semibold");
  });

  it("supprime les classes falsy", () => {
    // Vérifie que false, null et undefined sont ignorés
    expect(
      cn("text-sm", false, null, undefined, "font-bold")
    ).toBe("text-sm font-bold");
  });

  it("conserve la dernière classe Tailwind en cas de conflit", () => {
    // Vérifie le comportement de tailwind-merge
    expect(
      cn("px-2", "px-4")
    ).toBe("px-4");
  });
});