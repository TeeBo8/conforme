import { describe, it, expect } from "vitest";
import { buildMentionsLegales } from "../mentions-legales";
import type { MentionsLegalesVars } from "../types";

const BASE: MentionsLegalesVars = {
  nomEntreprise: "TestCorp",
  formeJuridique: "SAS",
  adresse: "1 rue de la Paix, 75001 Paris",
  email: "contact@testcorp.fr",
  urlSite: "https://testcorp.fr",
  nomHebergeur: "Vercel Inc.",
  adresseHebergeur: "340 Pine Street, San Francisco, CA 94104",
  siteType: "vitrine",
  directeurPublication: "Jean Dupont",
};

describe("buildMentionsLegales", () => {
  it("injecte le nom de l'entreprise", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("TestCorp");
  });

  it("injecte l'URL du site", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("https://testcorp.fr");
  });

  it("injecte l'email de contact", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("contact@testcorp.fr");
  });

  it("injecte le directeur de publication", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("Jean Dupont");
  });

  it("injecte l'hébergeur", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("Vercel Inc.");
  });

  it("n'affiche pas de SIRET si absent", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).not.toContain("SIRET");
  });

  it("affiche le SIRET quand fourni", () => {
    const result = buildMentionsLegales({ ...BASE, siret: "12345678900010" });
    expect(result).toContain("12345678900010");
  });

  it("affiche la section Activité quand activiteDescription est fourni", () => {
    const result = buildMentionsLegales({ ...BASE, activiteDescription: "Vente de logiciels." });
    expect(result).toContain("Vente de logiciels.");
    expect(result).toContain("Activité");
  });

  it("n'affiche pas la section Activité si activiteDescription absent", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).not.toContain("Activité");
  });

  it("retourne du HTML valide avec les balises article/header/footer", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("<article");
    expect(result).toContain("<header>");
    expect(result).toContain("<footer");
  });

  it("contient la section Propriété intellectuelle", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("Propriété intellectuelle");
  });

  it("contient la section Droit applicable", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain("Droit applicable");
  });

  it("contient le backlink vers conformefr.com dans le footer", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).toContain('<a href="https://conformefr.com">ConformeFR</a>');
  });
});
