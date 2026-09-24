// Données structurées (schema.org) et constantes SEO partagées.

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://conformefr.com";

export const AUTEUR = {
  "@type": "Person",
  name: "Thibault Leture",
  url: "https://teebostudio.fr",
} as const;

export const EDITEUR = {
  "@type": "Organization",
  name: "ConformeFR",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
} as const;

/** Date de dernière mise à jour du contenu des pages statiques (sitemap). */
export const CONTENU_MIS_A_JOUR = "2026-09-24";

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqPage(faq: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export const APPLICATION = {
  "@type": "WebApplication",
  name: "ConformeFR",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Tous (navigateur web)",
  inLanguage: "fr-FR",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Générateur gratuit de mentions légales et de politiques de confidentialité RGPD pour les sites web français, sans inscription.",
  author: AUTEUR,
} as const;

/** Sérialise un graphe JSON-LD pour une balise <script type="application/ld+json">. */
export function jsonLd(...nodes: object[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
