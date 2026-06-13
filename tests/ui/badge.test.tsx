import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("affiche son contenu", () => {
    // Vérifie que les enfants sont rendus
    render(<Badge>Statut</Badge>);

    expect(
      screen.getByText("Statut")
    ).toBeTruthy();
  });

  it("utilise la variante par défaut", () => {
    // Vérifie que la variante default est appliquée
    render(<Badge>Statut</Badge>);

    const badge = screen.getByText("Statut");

    expect(badge.className).toContain("bg-[#e6f4f4]");
    expect(badge.className).toContain("text-[#1a5c5c]");
  });

  it("applique la variante completed", () => {
    // Vérifie qu'une variante personnalisée fonctionne
    render(
      <Badge variant="completed">
        Terminé
      </Badge>
    );

    expect(
      screen.getByText("Terminé").className
    ).toContain("bg-gray-100");
  });

  it("fusionne les classes personnalisées", () => {
    // Vérifie que className est bien fusionné
    render(
      <Badge className="w-full">
        Statut
      </Badge>
    );

    expect(
      screen.getByText("Statut").className
    ).toContain("w-full");
  });
});