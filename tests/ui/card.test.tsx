import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";

describe("Card", () => {
  it("rend un conteneur card avec les classes par défaut", () => {
    // Vérifie que le composant principal applique son style de base
    render(<Card data-testid="card" />);

    const card = screen.getByTestId("card");

    expect(card.tagName).toBe("DIV");
    expect(card.className).toContain("rounded-xl");
    expect(card.className).toContain("bg-white");
  });

  it("fusionne les classes personnalisées", () => {
    // Vérifie que className est correctement ajouté
    render(
      <Card
        data-testid="card"
        className="w-full"
      />
    );

    expect(
      screen.getByTestId("card").className
    ).toContain("w-full");
  });
});

describe("CardHeader", () => {
  it("rend son contenu", () => {
    // Vérifie que les enfants sont affichés
    render(
      <CardHeader>
        Mon Header
      </CardHeader>
    );

    expect(
      screen.getByText("Mon Header")
    ).toBeTruthy();
  });
});

describe("CardTitle", () => {
  it("rend un titre h3", () => {
    // Vérifie que le titre utilise la bonne balise HTML
    render(
      <CardTitle>
        Titre Carte
      </CardTitle>
    );

    const title = screen.getByText("Titre Carte");

    expect(title.tagName).toBe("H3");
    expect(title.className).toContain("font-semibold");
  });
});

describe("CardDescription", () => {
  it("rend une description", () => {
    // Vérifie que la description utilise un paragraphe
    render(
      <CardDescription>
        Description
      </CardDescription>
    );

    const description =
      screen.getByText("Description");

    expect(description.tagName).toBe("P");
    expect(description.className).toContain("text-gray-500");
  });
});

describe("CardContent", () => {
  it("affiche le contenu fourni", () => {
    // Vérifie que le contenu est rendu
    render(
      <CardContent>
        Contenu principal
      </CardContent>
    );

    expect(
      screen.getByText("Contenu principal")
    ).toBeTruthy();
  });
});

describe("CardFooter", () => {
  it("fusionne les classes personnalisées", () => {
    // Vérifie la fusion des classes dans le footer
    render(
      <CardFooter
        data-testid="footer"
        className="justify-end"
      />
    );

    expect(
      screen.getByTestId("footer").className
    ).toContain("justify-end");
  });
});