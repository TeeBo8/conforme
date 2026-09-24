import { describe, it, expect } from "vitest";
import { cleanApiKey, toPlainText } from "../claude";

describe("cleanApiKey", () => {
  // Bug de prod du 2026-09-24 : la clé copiée sur Vercel commençait par un BOM (U+FEFF),
  // le SDK refusait l'en-tête HTTP et l'IA n'a jamais fonctionné en production.
  it("retire le BOM et les espaces autour de la clé", () => {
    expect(cleanApiKey("﻿sk-ant-abc \n")).toBe("sk-ant-abc");
  });

  it("renvoie undefined pour une clé absente ou vide", () => {
    expect(cleanApiKey(undefined)).toBeUndefined();
    expect(cleanApiKey("﻿  ")).toBeUndefined();
  });
});

describe("toPlainText", () => {
  it("retire titres, puces et emphase markdown", () => {
    expect(toPlainText("# Titre\n- **Point** un\n- point _deux_")).toBe("Point un point deux");
  });
});
