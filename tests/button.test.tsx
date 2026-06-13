import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("rend un bouton natif avec le type par défaut", () => {
    render(<Button>Envoyer</Button>);

    const button = screen.getByRole("button", { name: "Envoyer" });

    expect(button.getAttribute("type")).toBe("button");
    expect(button.className).toContain("bg-[#2b8a8a]");
  });

  it("applique les variantes et classes additionnelles", () => {
    render(
      <Button variant="accent" size="lg" className="w-full">
        Donner
      </Button>
    );

    const button = screen.getByRole("button", { name: "Donner" });

    expect(button.className).toContain("bg-[#f39237]");
    expect(button.className).toContain("h-13");
    expect(button.className).toContain("w-full");
  });

  it("fusionne les classes quand il est utilisé en asChild", () => {
    render(
      <Button asChild variant="outline">
        <a href="/contact">Contact</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Contact" });

    expect(link.getAttribute("href")).toBe("/contact");
    expect(link.className).toContain("border-2");
    expect(link.className).toContain("text-[#2b8a8a]");
  });
});
