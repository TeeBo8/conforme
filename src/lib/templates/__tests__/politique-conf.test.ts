import { describe, it, expect } from "vitest";
import { buildPolitiqueConf } from "../politique-conf";
import type { PolitiqueConfVars } from "../types";

const BASE: PolitiqueConfVars = {
  nomEntreprise: "TestCorp",
  formeJuridique: "SAS",
  adresse: "1 rue de la Paix, 75001 Paris",
  email: "contact@testcorp.fr",
  urlSite: "https://testcorp.fr",
  nomHebergeur: "Vercel Inc.",
  adresseHebergeur: "340 Pine Street, San Francisco, CA 94104",
  siteType: "saas",
  donneesCollectees: ["email", "nom_prenom"],
  finalites: ["compte_utilisateur", "facturation"],
  cookiesUtilises: false,
  dureeConservation: "3 ans",
  transfertHorsUE: false,
};

describe("buildPolitiqueConf", () => {
  it("injecte le nom de l'entreprise", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).toContain("TestCorp");
  });

  it("liste les données collectées", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).toContain("Adresse email");
    expect(result).toContain("Nom et prénom");
  });

  it("n'inclut pas les données non sélectionnées", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).not.toContain("Numéro de téléphone");
  });

  it("affiche les finalités dans le tableau", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).toContain("Création et gestion du compte utilisateur");
    expect(result).toContain("Facturation et obligations comptables");
  });

  it("injecte la durée de conservation", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).toContain("3 ans");
  });

  it("n'affiche pas la section cookies si cookiesUtilises=false", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).not.toContain("Cookies et traceurs");
  });

  it("affiche la section cookies si cookiesUtilises=true", () => {
    const result = buildPolitiqueConf({ ...BASE, cookiesUtilises: true, typesCookies: ["analytics"] });
    expect(result).toContain("Cookies et traceurs");
    expect(result).toContain("analytiques");
  });

  it("n'affiche pas la section transfert hors UE si transfertHorsUE=false", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).not.toContain("Transferts de données hors Union Européenne");
  });

  it("affiche la section transfert hors UE avec les pays si activé", () => {
    const result = buildPolitiqueConf({ ...BASE, transfertHorsUE: true, paysTransfert: ["États-Unis"] });
    expect(result).toContain("Transferts de données hors Union Européenne");
    expect(result).toContain("États-Unis");
  });

  it("affiche la section droits des personnes avec le lien CNIL", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).toContain("Vos droits");
    expect(result).toContain("cnil.fr");
  });

  it("retourne du HTML valide avec les balises article/header/footer", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).toContain("<article");
    expect(result).toContain("<header>");
    expect(result).toContain("<footer");
  });

  it("contient le backlink vers conformefr.com dans le footer", () => {
    const result = buildPolitiqueConf(BASE);
    expect(result).toContain('<a href="https://conformefr.com">ConformeFR</a>');
  });
});
