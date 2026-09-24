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

  it("n'invente jamais de section Activité", () => {
    expect(buildMentionsLegales(BASE)).not.toContain("Activité");
  });

  // Art. 1-1, I LCEN
  it("affiche le téléphone de l'éditeur et celui de l'hébergeur", () => {
    const result = buildMentionsLegales({ ...BASE, telephone: "05 56 00 00 00", telephoneHebergeur: "0970 808 911" });
    expect(result).toContain("05 56 00 00 00");
    expect(result).toContain("0970 808 911");
  });

  it("société : dénomination, siège, capital, RCS + SIREN", () => {
    const result = buildMentionsLegales({
      ...BASE,
      formeJuridique: "SASU",
      capitalSocial: "1000",
      siret: "123 456 789 00012",
      registre: "rcs",
      rcsVille: "Bordeaux",
    });
    expect(result).toContain("Dénomination");
    expect(result).toContain("Siège social");
    expect(result).toContain("1000 €");
    expect(result).toContain("RCS Bordeaux 123456789");
    expect(result).toContain("12345678900012");
  });

  it("micro-entrepreneur : nom et prénom suivis de « EI », adresse, pas de capital", () => {
    const result = buildMentionsLegales({
      ...BASE,
      nomEntreprise: "Jean Dupont",
      formeJuridique: "Auto-entrepreneur / Micro-entreprise",
      capitalSocial: "1000",
      siret: "12345678900012",
      registre: "rne",
    });
    expect(result).toContain("Nom et prénom :</strong> Jean Dupont EI");
    expect(result).toContain("régime de la micro-entreprise");
    expect(result).toContain("<strong>Adresse :</strong>");
    expect(result).not.toContain("Capital social");
    expect(result).toContain("Registre national des entreprises — SIREN 123456789");
  });

  it("n'ajoute pas « EI » en double", () => {
    const result = buildMentionsLegales({ ...BASE, nomEntreprise: "Jean Dupont EI", formeJuridique: "Entreprise individuelle (EI)" });
    expect(result).not.toContain("EI EI");
  });

  it("affiche le numéro de TVA intracommunautaire s'il est fourni (art. 19 LCEN)", () => {
    expect(buildMentionsLegales({ ...BASE, tvaIntracom: "FR12345678901" })).toContain("FR12345678901");
  });

  it("e-commerce : médiateur de la consommation et CGV (art. L616-1 C. conso)", () => {
    const result = buildMentionsLegales({
      ...BASE,
      siteType: "ecommerce",
      mediateurNom: "Médiateur Exemple",
      mediateurUrl: "https://mediateur.example",
      cgvUrl: "https://testcorp.fr/cgv",
    });
    expect(result).toContain("Vente en ligne");
    expect(result).toContain("L616-1");
    expect(result).toContain("Médiateur Exemple");
    expect(result).toContain('href="https://testcorp.fr/cgv"');
  });

  it("pas de section Vente en ligne hors e-commerce", () => {
    expect(buildMentionsLegales({ ...BASE, mediateurNom: "X" })).not.toContain("Vente en ligne");
  });

  it("ne promet pas de conformité et ne fixe pas de tribunal compétent", () => {
    const result = buildMentionsLegales(BASE);
    expect(result).not.toMatch(/sont conformes au/);
    expect(result).not.toContain("seuls compétents");
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
