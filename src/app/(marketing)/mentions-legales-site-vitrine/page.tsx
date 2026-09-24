import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Mentions légales site vitrine — Générateur basé sur la LCEN | ConformeFR",
  description:
    "Créez les mentions légales de votre site vitrine en 3 minutes. Rédigées d'après la loi LCEN, pour les TPE et PME. Gratuit, PDF et HTML.",
  alternates: { canonical: "/mentions-legales-site-vitrine" },
};

const faq = [
  {
    question: "Les mentions légales sont-elles obligatoires pour un simple site vitrine ?",
    answer:
      "Oui, quelle que soit la nature du site (vitrine, portfolio, e-commerce), tout site web professionnel accessible en France doit afficher des mentions légales en vertu de la loi LCEN. Cette obligation s'applique même si le site ne vend rien.",
  },
  {
    question: "Où afficher les mentions légales sur mon site vitrine ?",
    answer:
      "Les mentions légales doivent être facilement accessibles depuis toutes les pages du site. La pratique la plus répandue est de placer un lien 'Mentions légales' dans le pied de page (footer) du site. Elles peuvent figurer sur une page dédiée ou être intégrées à une page 'Informations légales'.",
  },
  {
    question: "Quelle est la différence entre mentions légales et politique de confidentialité ?",
    answer:
      "Les mentions légales identifient l'éditeur du site et sont imposées par la loi LCEN. La politique de confidentialité explique comment vous collectez et traitez les données personnelles des visiteurs, et est imposée par le RGPD. Si votre site collecte des données (formulaire de contact, cookies, analytics), vous avez besoin des deux documents.",
  },
  {
    question: "Mon site vitrine utilise WordPress, dois-je quand même rédiger des mentions légales ?",
    answer:
      "Oui. Le CMS utilisé n'a aucune incidence sur l'obligation légale. Que vous utilisiez WordPress, Wix, Squarespace ou tout autre outil, vous devez afficher des mentions légales conformes. ConformeFR génère un code HTML facile à intégrer dans n'importe quelle plateforme.",
  },
  {
    question: "Dois-je mettre à jour mes mentions légales régulièrement ?",
    answer:
      "Vous devez mettre à jour vos mentions légales dès que les informations qu'elles contiennent changent : changement d'adresse, de numéro SIRET, d'hébergeur, ou évolution de la forme juridique. Il est recommandé de les vérifier au moins une fois par an.",
  },
];

export default function MentionsLegalesSiteVitrineePage() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-3 py-1 text-xs text-muted-foreground">
            Loi LCEN — droit français
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Mentions légales<br />
            <span className="text-muted-foreground">site vitrine</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Des mentions légales rédigées d&apos;après la loi LCEN pour votre site vitrine,
            générées en 3 minutes. Code HTML prêt à intégrer dans votre CMS.
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/generateur?type=mentions_legales&siteType=vitrine">
              Générer mes mentions légales gratuitement →
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">Gratuit · PDF et HTML · Sans inscription</p>
        </section>

        {/* Contenu */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Mentions légales d&apos;un site vitrine : ce qu&apos;il faut savoir</h2>
          <p className="text-muted-foreground leading-relaxed">
            Un site vitrine présente votre entreprise, vos services et vos coordonnées sans nécessairement
            vendre en ligne. Même sans boutique e-commerce, vous avez l&apos;obligation légale d&apos;afficher
            des mentions légales accessibles depuis toutes les pages du site.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            ConformeFR génère un document sur mesure, adapté à votre forme juridique (auto-entrepreneur,
            SARL, SAS, association…). Le HTML produit s&apos;intègre
            en quelques secondes dans WordPress, Wix, Webflow ou tout autre CMS.
          </p>
        </section>

        {/* Ce qui est inclus */}
        <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 space-y-4">
          <h2 className="text-xl font-bold">Ce que contient votre document</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Identification de l'éditeur (raison sociale, forme juridique, SIRET/RCS, capital)",
              "Directeur de la publication",
              "Informations complètes sur l'hébergeur du site",
              "Clause de propriété intellectuelle sur les contenus",
              "Limitation de responsabilité et droits applicables",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-foreground mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Questions fréquentes</h2>
          <dl className="space-y-6">
            {faq.map(({ question, answer }) => (
              <div key={question} className="border-b border-foreground/10 pb-6 last:border-0 last:pb-0">
                <dt className="font-semibold text-foreground mb-2">{question}</dt>
                <dd className="text-sm text-muted-foreground leading-relaxed">{answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA bas */}
        <section className="text-center space-y-4 rounded-xl border border-foreground/10 bg-foreground/5 p-8">
          <h2 className="text-2xl font-bold">Votre site vitrine mérite d&apos;être en règle</h2>
          <p className="text-muted-foreground">
            Générez vos mentions légales en 3 minutes. Gratuit, sans inscription.
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/generateur?type=mentions_legales&siteType=vitrine">
              Générer maintenant — c&apos;est gratuit →
            </Link>
          </Button>
        </section>
      </main>
    </>
  );
}
