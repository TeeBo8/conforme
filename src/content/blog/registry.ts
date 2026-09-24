import type { BlogArticle } from "./types";
import * as mentionsLegalesObligatoires2026 from "./articles/mentions-legales-obligatoires-2026";
import * as amendesCnilPetitsSites from "./articles/amendes-cnil-petits-sites";
import * as politiqueConfidentialiteGuideTpe from "./articles/politique-confidentialite-rgpd-guide-tpe";
import * as cookiesBanniere from "./articles/cookies-rgpd-banniere-obligatoire";

export const articles: BlogArticle[] = [
  {
    meta: mentionsLegalesObligatoires2026.meta,
    Body: mentionsLegalesObligatoires2026.default,
  },
  {
    meta: amendesCnilPetitsSites.meta,
    Body: amendesCnilPetitsSites.default,
  },
  {
    meta: politiqueConfidentialiteGuideTpe.meta,
    Body: politiqueConfidentialiteGuideTpe.default,
  },
  {
    meta: cookiesBanniere.meta,
    Body: cookiesBanniere.default,
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.meta.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((article) => article.meta.slug);
}
