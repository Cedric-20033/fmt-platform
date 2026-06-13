import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("rend un bouton HTML", () => {
    // Vérifie que le composant rend un élément button
    render(
      <Button>Envoyer</Button>
    );

    const button = screen.getByRole("button");

    expect(button.tagName).toBe("BUTTON");
  });

  it("utilise type='button' par défaut", () => {
    // Vérifie la valeur par défaut du type
    render(
      <Button>Envoyer</Button>
    );

    expect(
      screen.getByRole("button")
    ).toHaveAttribute("type", "button");
  });

  it("applique la variante accent", () => {
    // Vérifie le changement de style via variant
    render(
      <Button variant="accent">
        Donner
      </Button>
    );

    expect(
      screen.getByRole("button").className
    ).toContain("bg-[#f39237]");
  });

  it("applique la taille lg", () => {
    // Vérifie le changement de taille
    render(
      <Button size="lg">
        Donner
      </Button>
    );

    expect(
      screen.getByRole("button").className
    ).toContain("h-13");
  });

  it("fusionne les classes personnalisées", () => {
    // Vérifie la fusion avec className
    render(
      <Button className="w-full">
        Donner
      </Button>
    );

    expect(
      screen.getByRole("button").className
    ).toContain("w-full");
  });

  it("rend correctement un lien avec asChild", () => {
    // Vérifie le mode polymorphe du composant
    render(
      <Button asChild>
        <a href="/contact">Contact</a>
      </Button>
    );

    const link = screen.getByRole("link");

    expect(link).toHaveAttribute(
      "href",
      "/contact"
    );
  });
});