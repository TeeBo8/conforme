import type { BlogArticle } from "./types";
import * as mentionsLegalesObligatoires2026 from "./articles/mentions-legales-obligatoires-2026";

export const articles: BlogArticle[] = [
  {
    meta: mentionsLegalesObligatoires2026.meta,
    Body: mentionsLegalesObligatoires2026.default,
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.meta.slug === slug);
}

export function getAllSlugs(): string[] {
  return articles.map((article) => article.meta.slug);
}
