import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils/Cn";

describe("cn", () => {
  it("fusionne les classes et garde la dernière valeur Tailwind compatible", () => {
    expect(cn("px-2", "py-1", "px-4")).toBe("py-1 px-4");
  });

  it("ignore les valeurs falsy", () => {
    expect(cn("text-sm", false, null, undefined, "font-semibold")).toBe(
      "text-sm font-semibold"
    );
  });
});
