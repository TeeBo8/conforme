import { describe, it, expect } from "vitest";
import { getPriceForType, getLabelForType, PRICES } from "../stripe";

describe("PRICES", () => {
  it("mentions_legales coûte 19€ (1900 centimes)", () => {
    expect(PRICES.mentions_legales).toBe(1900);
  });

  it("politique_confidentialite coûte 19€ (1900 centimes)", () => {
    expect(PRICES.politique_confidentialite).toBe(1900);
  });

  it("pack coûte 29€ (2900 centimes)", () => {
    expect(PRICES.pack).toBe(2900);
  });
});

describe("getPriceForType", () => {
  it("retourne le bon prix pour chaque type", () => {
    expect(getPriceForType("mentions_legales")).toBe(1900);
    expect(getPriceForType("politique_confidentialite")).toBe(1900);
    expect(getPriceForType("pack")).toBe(2900);
  });

  it("le pack est moins cher que les deux docs séparés", () => {
    const separés = getPriceForType("mentions_legales") + getPriceForType("politique_confidentialite");
    expect(getPriceForType("pack")).toBeLessThan(separés);
  });
});

describe("getLabelForType", () => {
  it("retourne un label non vide pour chaque type", () => {
    expect(getLabelForType("mentions_legales")).toBeTruthy();
    expect(getLabelForType("politique_confidentialite")).toBeTruthy();
    expect(getLabelForType("pack")).toBeTruthy();
  });

  it("le label du pack mentionne les deux documents", () => {
    const label = getLabelForType("pack").toLowerCase();
    expect(label).toContain("mentions légales");
    expect(label).toContain("politique");
  });
});
