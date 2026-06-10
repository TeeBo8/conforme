import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "https://conformefr.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/apercu/", "/succes", "/connexion", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
