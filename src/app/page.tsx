import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const profils = [
  {
    titre: "Auto-entrepreneur",
    description: "Vos mentions légales de micro-entrepreneur, adaptées à votre statut.",
    href: "/mentions-legales-auto-entrepreneur",
  },
  {
    titre: "Site vitrine",
    description: "Mettez votre site d'entreprise ou de freelance en conformité LCEN.",
    href: "/mentions-legales-site-vitrine",
  },
  {
    titre: "E-commerce",
    description: "Boutique en ligne : mentions légales complètes avant de vendre.",
    href: "/mentions-legales-ecommerce",
  },
  {
    titre: "TPE / PME",
    description: "Politique de confidentialité RGPD sans juriste ni jargon.",
    href: "/politique-confidentialite-rgpd-petite-entreprise",
  },
];

const faq = [
  {
    question: "Que contient le document généré ?",
    answer:
      "Des mentions légales rédigées d'après la loi LCEN ou une politique de confidentialité rédigée d'après le RGPD, générées à partir de vos informations (entreprise, hébergeur, données collectées…). Vous obtenez un aperçu gratuit immédiat, puis le document final en PDF et en HTML prêt à intégrer sur votre site.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "L'aperçu est 100 % gratuit. Le téléchargement du document final coûte 19 € (mentions légales ou politique de confidentialité) ou 29 € pour le pack complet avec les deux documents. Paiement unique, accès à vie, re-téléchargeable à tout moment.",
  },
  {
    question: "Les documents sont-ils conformes au droit français ?",
    answer:
      "Les documents reprennent les informations exigées par la loi LCEN et le RGPD pour les cas courants (sites vitrines, blogs, e-commerces, SaaS). Ils ne constituent pas un conseil juridique : pour une situation complexe ou une activité réglementée, faites-les relire par un professionnel du droit.",
  },
  {
    question: "Puis-je modifier le document après l'achat ?",
    answer:
      "Oui. Vous recevez le document en HTML, librement modifiable et intégrable sur n'importe quel site (WordPress, Wix, Shopify, code sur mesure…), ainsi qu'un PDF haute qualité.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex flex-col flex-1 items-center px-4">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-xs text-muted-foreground">
              Loi LCEN & RGPD — droit français
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Mentions légales &amp; politique de confidentialité{" "}
              <span className="text-muted-foreground">en 3 minutes</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Générateur de documents légaux pour sites web français. Aperçu gratuit,
              téléchargement PDF et HTML à partir de 19&nbsp;€.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button asChild size="lg" className="text-base px-8">
                <Link href="/generateur">Générer mon document →</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <span>📄 Mentions légales</span>
              <span>🔒 Politique RGPD</span>
              <span>📦 Pack complet — 29&nbsp;€</span>
            </div>
          </div>
        </section>

        {/* Profils */}
        <section className="w-full max-w-3xl pb-20 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            Un générateur adapté à votre situation
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {profils.map((profil) => (
              <Link
                key={profil.href}
                href={profil.href}
                className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 space-y-1.5 hover:border-foreground/25 transition-colors"
              >
                <p className="font-semibold">{profil.titre} →</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {profil.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full max-w-3xl pb-24 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faq.map(({ question, answer }) => (
              <details
                key={question}
                className="group rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4"
              >
                <summary className="cursor-pointer font-medium text-sm list-none flex items-center justify-between gap-3">
                  {question}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Une autre question ?{" "}
            <Link href="/blog" className="underline underline-offset-2 hover:text-foreground transition-colors">
              Consultez nos guides
            </Link>{" "}
            ou{" "}
            <a href="mailto:contact@teebostudio.fr" className="underline underline-offset-2 hover:text-foreground transition-colors">
              écrivez-nous
            </a>.
          </p>
        </section>
      </main>
    </>
  );
}
