import type { ComponentType } from "react";

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogArticleMeta {
  slug: string;
  title: string;
  description: string;
  tag: string;
  publishedAt: string;
  /** Date de la dernière révision du contenu (AAAA-MM-JJ) */
  updatedAt?: string;
  readingTime: number;
  /** Textes officiels cités, affichés en fin d'article */
  sources?: { label: string; url: string }[];
  faq: BlogFaqItem[];
}

export interface BlogArticle {
  meta: BlogArticleMeta;
  Body: ComponentType;
}
