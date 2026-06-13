import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("affiche le contenu et applique la variante par défaut", () => {
    render(<Badge>Statut</Badge>);

    const badge = screen.getByText("Statut");

    expect(badge.tagName).toBe("DIV");
    expect(badge.className).toContain("bg-[#e6f4f4]");
    expect(badge.className).toContain("text-[#1a5c5c]");
  });

  it("applique une variante spécifique", () => {
    render(<Badge variant="completed">Terminé</Badge>);

    expect(screen.getByText("Terminé").className).toContain("bg-gray-100");
  });
});
