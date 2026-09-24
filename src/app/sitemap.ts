import type { MetadataRoute } from "next";
import { articles } from "@/content/blog/registry";
import { CONTENU_MIS_A_JOUR } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://conformefr.com";

  const blogPosts: MetadataRoute.Sitemap = articles.map(({ meta }) => ({
    url: `${base}/blog/${meta.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: meta.updatedAt ?? meta.publishedAt,
  }));

  return [
    ...blogPosts,
    { url: base, priority: 1.0, changeFrequency: "monthly", lastModified: CONTENU_MIS_A_JOUR },
    { url: `${base}/generateur`, priority: 0.9, changeFrequency: "monthly", lastModified: CONTENU_MIS_A_JOUR },
    {
      url: `${base}/mentions-legales-auto-entrepreneur`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: CONTENU_MIS_A_JOUR,
    },
    {
      url: `${base}/mentions-legales-site-vitrine`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: CONTENU_MIS_A_JOUR,
    },
    {
      url: `${base}/mentions-legales-ecommerce`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: CONTENU_MIS_A_JOUR,
    },
    {
      url: `${base}/politique-confidentialite-rgpd-petite-entreprise`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: CONTENU_MIS_A_JOUR,
    },
    { url: `${base}/blog`, priority: 0.5, changeFrequency: "weekly", lastModified: CONTENU_MIS_A_JOUR },
  ];
}
