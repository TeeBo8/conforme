import { describe, it, expect } from "vitest";
import { escapeHtml, safeHttpUrl } from "../escape";
import { buildMentionsLegales } from "../mentions-legales";
import { buildPolitiqueConf } from "../politique-conf";

const PAYLOAD = `<img src=x onerror="alert(1)">`;

describe("escapeHtml", () => {
  it("échappe les caractères HTML", () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;"
    );
  });
});

describe("safeHttpUrl", () => {
  it("accepte http et https", () => {
    expect(safeHttpUrl("https://vercel.com")).toBe("https://vercel.com/");
  });

  it("rejette javascript: et les valeurs invalides", () => {
    expect(safeHttpUrl("javascript:alert(1)")).toBeUndefined();
    expect(safeHttpUrl("pas une url")).toBeUndefined();
    expect(safeHttpUrl(undefined)).toBeUndefined();
  });
});

describe("injection HTML dans les documents générés", () => {
  it("mentions légales : aucune balise injectée via les champs saisis", () => {
    const html = buildMentionsLegales({
      nomEntreprise: PAYLOAD,
      formeJuridique: PAYLOAD,
      adresse: PAYLOAD,
      email: `a@b.fr"><script>alert(1)</script>`,
      urlSite: PAYLOAD,
      nomHebergeur: PAYLOAD,
      adresseHebergeur: PAYLOAD,
      urlHebergeur: "javascript:alert(1)",
      siteType: "vitrine",
      directeurPublication: PAYLOAD,
      telephone: PAYLOAD,
      siret: PAYLOAD,
      capitalSocial: PAYLOAD,
      rcsVille: PAYLOAD,
    });
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("&lt;img");
  });

  it("politique de confidentialité : aucune balise injectée via les champs saisis", () => {
    const html = buildPolitiqueConf({
      nomEntreprise: PAYLOAD,
      formeJuridique: "SAS",
      adresse: PAYLOAD,
      email: PAYLOAD,
      urlSite: PAYLOAD,
      nomHebergeur: PAYLOAD,
      adresseHebergeur: PAYLOAD,
      siteType: "vitrine",
      telephone: PAYLOAD,
      donneesCollectees: ["email"],
      finalites: ["support_client"],
      finalitesDescription: PAYLOAD,
      cookiesUtilises: false,
      dureeConservation: PAYLOAD,
      transfertHorsUE: true,
      paysTransfert: [PAYLOAD],
    });
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });
});
