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
  readingTime: number;
  faq: BlogFaqItem[];
}

export interface BlogArticle {
  meta: BlogArticleMeta;
  Body: ComponentType;
}
