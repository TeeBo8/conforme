import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Mentions légales e-commerce — Obligations légales boutique en ligne | ConformeFR",
  description:
    "Générez les mentions légales de votre boutique en ligne. Conformes au droit français (LCEN + Code de la consommation). Aperçu gratuit, PDF 19 €.",
  alternates: { canonical: "/mentions-legales-ecommerce" },
};

const faq = [
  {
    question: "Quelles mentions légales sont obligatoires pour un site e-commerce ?",
    answer:
      "Un site e-commerce doit afficher : l'identification complète du vendeur (raison sociale, adresse, SIRET), les coordonnées permettant de le contacter rapidement, le numéro de TVA intracommunautaire (si assujetti), l'indication de l'inscription au RCS ou RM, les informations sur l'hébergeur. S'ajoutent les CGV, la politique de retour et la politique de confidentialité.",
  },
  {
    question: "Les mentions légales d'un e-commerce sont-elles différentes d'un site vitrine ?",
    answer:
      "Oui. Un site e-commerce a des obligations supplémentaires issues du Code de la consommation et de la directive européenne sur les droits des consommateurs : droit de rétractation de 14 jours, informations pré-contractuelles, garanties légales de conformité et des vices cachés. Ces éléments figurent généralement dans les CGV, mais les mentions légales doivent identifier clairement l'entreprise responsable.",
  },
  {
    question: "Mon e-commerce est sur Shopify ou PrestaShop, dois-je créer mes propres mentions légales ?",
    answer:
      "Oui. Les templates fournis par les plateformes e-commerce sont génériques et ne contiennent pas vos informations spécifiques (SIRET, adresse, hébergeur). Vous devez les personnaliser ou créer vos propres mentions légales. ConformeFR génère un document HTML que vous pouvez copier directement dans votre boutique.",
  },
  {
    question: "Faut-il un numéro de TVA intracommunautaire dans les mentions légales ?",
    answer:
      "Si votre entreprise est assujettie à la TVA, oui. Les auto-entrepreneurs et micro-entreprises en franchise de TVA n'ont pas l'obligation de l'indiquer. En revanche, dès que vous dépassez les seuils de franchise ou que vous optez volontairement pour la TVA, votre numéro doit apparaître.",
  },
  {
    question: "Quelle est la sanction en cas d'absence de mentions légales sur un e-commerce ?",
    answer:
      "L'absence de mentions légales est une infraction à la loi LCEN, passible d'une amende de 75 000 € pour une personne physique (375 000 € pour une personne morale). Les clients peuvent également engager votre responsabilité civile en cas de litige si vos coordonnées ne sont pas clairement affichées.",
  },
];

export default function MentionsLegalesEcommercePage() {
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

      <main className="mx-auto max-w-3xl px-4 py-16 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-muted-foreground">
            ✓ LCEN + Code de la consommation — 2025
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Mentions légales<br />
            <span className="text-muted-foreground">e-commerce</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Des mentions légales adaptées à votre boutique en ligne, conformes
            au droit français de la vente à distance. Aperçu immédiat et gratuit.
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/generateur?type=mentions_legales&siteType=ecommerce">
              Générer mes mentions légales gratuitement →
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">Aperçu gratuit · PDF 19 € · Sans abonnement</p>
        </section>

        {/* Contenu */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">E-commerce : une obligation légale renforcée</h2>
          <p className="text-muted-foreground leading-relaxed">
            La vente en ligne en France est encadrée par plusieurs textes : la loi LCEN, le Code de la
            consommation, et la directive européenne 2011/83/UE. En tant que vendeur en ligne, vous avez
            des obligations d&apos;information plus étendues qu&apos;un simple site vitrine.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            ConformeFR génère des mentions légales tenant compte de la nature e-commerce de votre activité,
            avec les clauses spécifiques à la vente à distance. Le document est fourni en PDF professionnel
            et en HTML prêt à copier-coller dans votre boutique Shopify, WooCommerce ou PrestaShop.
          </p>
        </section>

        {/* Ce qui est inclus */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-4">
          <h2 className="text-xl font-bold">Ce que contient votre document e-commerce</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Identification complète du vendeur (raison sociale, RCS/RM, TVA si applicable)",
              "Coordonnées complètes pour les réclamations clients",
              "Informations sur l'hébergement technique du site",
              "Clauses propriété intellectuelle adaptées au commerce en ligne",
              "Références aux garanties légales de conformité et CGV",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-white mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <p className="text-xs text-amber-200/80">
              <strong>Note :</strong> Les mentions légales n&apos;incluent pas les CGV. Pour une boutique
              en ligne complète, nous recommandons le{" "}
              <Link href="/generateur?type=pack" className="underline underline-offset-2">
                pack complet
              </Link>{" "}
              comprenant aussi la politique de confidentialité RGPD.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <dl className="space-y-6">
            {faq.map(({ question, answer }) => (
              <div key={question} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                <dt className="font-semibold text-white mb-2">{question}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA bas */}
        <section className="text-center space-y-4 rounded-xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold">Sécurisez votre boutique en ligne</h2>
          <p className="text-muted-foreground">
            Générez vos mentions légales e-commerce en 3 minutes. Aperçu gratuit.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/generateur?type=mentions_legales&siteType=ecommerce">
                Mentions légales — 19 € →
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="/generateur?type=pack&siteType=ecommerce">
                Pack complet — 29 € →
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
