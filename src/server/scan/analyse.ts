import type { IncomingHttpHeaders } from "node:http";
import { isSiretValide, normaliserSiret } from "@/lib/templates/entites";

export type Categorie = "mesure_audience" | "publicite" | "contenu_tiers" | "paiement" | "bandeau_cookies";

export interface ServiceDetecte {
  nom: string;
  categorie: Categorie;
  /** Pose des cookies soumis au consentement (lignes directrices CNIL) */
  consentement: boolean;
  /** Société établie hors UE */
  horsUE: boolean;
}

export interface AnalyseSite {
  titre?: string;
  description?: string;
  texte: string;
  emails: string[];
  telephones: string[];
  siret?: string;
  hebergeur?: string;
  services: ServiceDetecte[];
  formulaire: boolean;
}

// Signatures cherchées dans le HTML de la page d'accueil. Liste volontairement
// limitée à des services courants et reconnaissables sans ambiguïté.
const SIGNATURES: (ServiceDetecte & { motif: RegExp })[] = [
  { nom: "Google Analytics", motif: /googletagmanager\.com\/gtag\/js|google-analytics\.com\/(analytics|ga)\.js|\bgtag\(\s*['"]config['"]\s*,\s*['"]G-/i, categorie: "mesure_audience", consentement: true, horsUE: true },
  { nom: "Google Tag Manager", motif: /googletagmanager\.com\/gtm\.js/i, categorie: "mesure_audience", consentement: true, horsUE: true },
  { nom: "Matomo", motif: /matomo\.js|piwik\.js|_paq\.push/i, categorie: "mesure_audience", consentement: true, horsUE: false },
  { nom: "Hotjar", motif: /static\.hotjar\.com|hotjar\.com\/c\/hotjar/i, categorie: "mesure_audience", consentement: true, horsUE: false },
  { nom: "Plausible", motif: /plausible\.io\/js/i, categorie: "mesure_audience", consentement: false, horsUE: false },
  { nom: "Vercel Web Analytics", motif: /\/_vercel\/insights\/script\.js/i, categorie: "mesure_audience", consentement: false, horsUE: true },
  { nom: "Meta Pixel", motif: /connect\.facebook\.net\/[^"']*\/fbevents\.js|\bfbq\(\s*['"]init/i, categorie: "publicite", consentement: true, horsUE: true },
  { nom: "Google Ads", motif: /googleadservices\.com|googlesyndication\.com|gtag\(\s*['"]config['"]\s*,\s*['"]AW-/i, categorie: "publicite", consentement: true, horsUE: true },
  { nom: "LinkedIn Insight", motif: /snap\.licdn\.com\/li\.lms-analytics/i, categorie: "publicite", consentement: true, horsUE: true },
  { nom: "TikTok Pixel", motif: /analytics\.tiktok\.com/i, categorie: "publicite", consentement: true, horsUE: true },
  { nom: "YouTube", motif: /youtube(-nocookie)?\.com\/embed\//i, categorie: "contenu_tiers", consentement: true, horsUE: true },
  { nom: "Google Maps", motif: /google\.com\/maps\/embed|maps\.googleapis\.com/i, categorie: "contenu_tiers", consentement: true, horsUE: true },
  { nom: "Google reCAPTCHA", motif: /google\.com\/recaptcha|gstatic\.com\/recaptcha/i, categorie: "contenu_tiers", consentement: true, horsUE: true },
  { nom: "Stripe", motif: /js\.stripe\.com/i, categorie: "paiement", consentement: false, horsUE: true },
  { nom: "PayPal", motif: /paypal\.com\/sdk\/js|paypalobjects\.com/i, categorie: "paiement", consentement: false, horsUE: true },
  { nom: "Shopify", motif: /cdn\.shopify\.com/i, categorie: "paiement", consentement: false, horsUE: true },
  { nom: "Axeptio", motif: /static\.axept\.io|axeptioSettings/i, categorie: "bandeau_cookies", consentement: false, horsUE: false },
  { nom: "Tarteaucitron", motif: /tarteaucitron/i, categorie: "bandeau_cookies", consentement: false, horsUE: false },
  { nom: "Didomi", motif: /sdk\.privacy-center\.org|didomi/i, categorie: "bandeau_cookies", consentement: false, horsUE: false },
  { nom: "Cookiebot", motif: /consent\.cookiebot\.com/i, categorie: "bandeau_cookies", consentement: false, horsUE: false },
];

/** Hébergeur déduit des en-têtes HTTP, seulement quand la signature est sans ambiguïté. */
function detecterHebergeur(headers: IncomingHttpHeaders, html: string): string | undefined {
  const server = String(headers.server ?? "").toLowerCase();
  if (headers["x-vercel-id"] || server === "vercel") return "Vercel Inc.";
  if (headers["x-nf-request-id"] || server === "netlify") return "Netlify";
  if (headers["x-shopid"] || headers["x-shopify-stage"]) return "Shopify";
  if (/cdn\.shopify\.com/i.test(html) && /Shopify\.theme/i.test(html)) return "Shopify";
  return undefined;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)));
}

export function texteVisible(html: string): string {
  return decodeEntities(
    html
      .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

function meta(html: string, name: string): string | undefined {
  const re = new RegExp(`<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']`, "i");
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`, "i");
  const v = html.match(re)?.[1] ?? html.match(re2)?.[1];
  return v ? decodeEntities(v).trim() || undefined : undefined;
}

const unique = (arr: string[]) => [...new Set(arr)];

export function analyserPage(html: string, headers: IncomingHttpHeaders = {}): AnalyseSite {
  const texte = texteVisible(html);
  const titre = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];

  const emails = unique(
    [...html.matchAll(/mailto:([^"'?\s>]+)/gi)].map((m) => decodeURIComponent(m[1]!).toLowerCase())
  ).filter((e) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(e));

  const telephones = unique(
    [...html.matchAll(/href=["']tel:([^"']+)["']/gi)].map((m) => decodeURIComponent(m[1]!).replace(/[^\d+]/g, ""))
  ).filter((t) => t.replace(/\D/g, "").length >= 9);

  const siret = [...texte.matchAll(/SIRE[TN]\s*:?\s*((?:\d[\s.]?){14})/gi)]
    .map((m) => normaliserSiret(m[1]!.replace(/\./g, "")))
    .find(isSiretValide);

  return {
    titre: titre ? decodeEntities(titre).trim() || undefined : undefined,
    description: meta(html, "description") ?? meta(html, "og:description"),
    texte,
    emails: emails.slice(0, 3),
    telephones: telephones.slice(0, 3),
    siret,
    hebergeur: detecterHebergeur(headers, html),
    services: SIGNATURES.filter((s) => s.motif.test(html)).map((s) => ({
      nom: s.nom,
      categorie: s.categorie,
      consentement: s.consentement,
      horsUE: s.horsUE,
    })),
    formulaire: /<form[\s>]/i.test(html),
  };
}
