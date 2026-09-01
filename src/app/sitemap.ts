import type { MetadataRoute } from "next";
import { articles } from "@/content/blog/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://conformefr.com";

  const blogPosts: MetadataRoute.Sitemap = articles.map(({ meta }) => ({
    url: `${base}/blog/${meta.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: meta.publishedAt,
  }));

  return [
    ...blogPosts,
    { url: base, priority: 1.0, changeFrequency: "monthly" },
    { url: `${base}/generateur`, priority: 0.9, changeFrequency: "monthly" },
    {
      url: `${base}/mentions-legales-auto-entrepreneur`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/mentions-legales-site-vitrine`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/mentions-legales-ecommerce`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${base}/politique-confidentialite-rgpd-petite-entreprise`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { url: `${base}/blog`, priority: 0.5, changeFrequency: "weekly" },
  ];
}
