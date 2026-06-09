import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Droit du web pour entrepreneurs | ConformeFR",
  description:
    "Conseils pratiques sur le droit du web français : mentions légales, RGPD, cookies, e-commerce. Guides simples pour entrepreneurs et indépendants.",
  alternates: { canonical: "/blog" },
};

const articles = [
  {
    title: "Mentions légales obligatoires en France : le guide complet 2025",
    description:
      "Tout ce que vous devez savoir sur les mentions légales : textes de loi, contenu obligatoire, sanctions encourues et cas pratiques selon votre statut.",
    tag: "Mentions légales",
    href: null,
  },
  {
    title: "RGPD pour les TPE : 5 choses à faire cette semaine",
    description:
      "Le RGPD n'est pas réservé aux grandes entreprises. Voici les 5 actions prioritaires à mettre en place pour votre site, même sans juriste.",
    tag: "RGPD",
    href: null,
  },
  {
    title: "Cookies : bannière de consentement conforme CNIL en 2025",
    description:
      "Les exigences de la CNIL sur les cookies ont évolué. On vous explique ce qui est obligatoire, ce qui est interdit, et comment vous conformer simplement.",
    tag: "Cookies",
    href: null,
  },
  {
    title: "Auto-entrepreneur : quelles obligations légales pour votre site web ?",
    description:
      "Mentions légales, politique de confidentialité, CGV… Le point sur les obligations légales spécifiques aux auto-entrepreneurs qui ont un site internet.",
    tag: "Auto-entrepreneur",
    href: null,
  },
  {
    title: "E-commerce : checklist conformité légale avant de lancer votre boutique",
    description:
      "Avant d'ouvrir votre boutique en ligne, voici tous les documents légaux obligatoires : mentions légales, CGV, politique de retour, protection des données.",
    tag: "E-commerce",
    href: null,
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Conseils pratiques sur le droit du web pour entrepreneurs, indépendants et PME françaises.
        </p>
      </div>

      <div className="space-y-6">
        {articles.map((article) => (
          <article
            key={article.title}
            className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-muted-foreground">
                {article.tag}
              </span>
              <span className="text-xs text-muted-foreground">Bientôt disponible</span>
            </div>
            <h2 className="font-semibold text-white leading-snug">{article.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{article.description}</p>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center space-y-3">
        <p className="text-sm font-medium">Besoin d&apos;un document légal maintenant ?</p>
        <Link
          href="/generateur"
          className="inline-flex items-center justify-center rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Générer mon document →
        </Link>
      </div>
    </main>
  );
}
