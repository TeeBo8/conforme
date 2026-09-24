import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Mentions légales auto-entrepreneur — Générateur gratuit | ConformeFR",
  description:
    "Générez vos mentions légales auto-entrepreneur en 3 minutes. Rédigées d'après la loi LCEN pour les micro-entrepreneurs. Gratuit, PDF et HTML.",
  alternates: { canonical: "/mentions-legales-auto-entrepreneur" },
};

const faq = [
  {
    question: "Un auto-entrepreneur est-il obligé d'avoir des mentions légales sur son site ?",
    answer:
      "Oui. La loi pour la confiance dans l'économie numérique (LCEN) impose à tout éditeur de site web professionnel, y compris les auto-entrepreneurs, d'afficher des mentions légales. L'absence de mentions légales est passible d'une amende pouvant aller jusqu'à 75 000 €.",
  },
  {
    question: "Quelles informations obligatoires doit contenir les mentions légales d'un auto-entrepreneur ?",
    answer:
      "Vos mentions légales doivent inclure : votre nom et prénom (ou dénomination), votre adresse, votre numéro de téléphone, votre numéro SIRET, votre adresse email, le nom et l'adresse de votre hébergeur. Si vous exercez une activité réglementée, vous devez également mentionner l'autorité compétente.",
  },
  {
    question: "Faut-il indiquer son adresse personnelle dans les mentions légales en tant qu'auto-entrepreneur ?",
    answer:
      "Si votre adresse professionnelle est votre domicile, vous pouvez utiliser une adresse de domiciliation commerciale pour protéger votre vie privée. L'essentiel est que l'adresse indiquée soit joignable et permette à un tiers de vous contacter.",
  },
  {
    question: "Mon auto-entreprise n'a pas de numéro de TVA, que dois-je indiquer ?",
    answer:
      "Un auto-entrepreneur non assujetti à la TVA (régime de la franchise en base) n'est pas tenu d'afficher un numéro de TVA intracommunautaire. Il suffit d'indiquer votre numéro SIRET.",
  },
  {
    question: "Combien coûte la génération de mentions légales avec ConformeFR ?",
    answer:
      "Rien : ConformeFR est gratuit. Vous générez vos mentions légales et les téléchargez en PDF et en HTML prêt à intégrer, sans inscription.",
  },
];

export default function MentionsLegalesAutoEntrepreneurPage() {
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
            <span className="text-muted-foreground">auto-entrepreneur</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Générez des mentions légales rédigées d&apos;après la loi LCEN, pour le statut
            micro-entrepreneur. Aperçu immédiat et gratuit.
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/generateur?type=mentions_legales">
              Générer mes mentions légales gratuitement →
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">Gratuit · PDF et HTML · Sans inscription</p>
        </section>

        {/* Pourquoi */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Pourquoi les mentions légales sont-elles obligatoires ?</h2>
          <p className="text-muted-foreground leading-relaxed">
            La <strong className="text-foreground">loi LCEN du 21 juin 2004</strong> impose à tout éditeur
            d&apos;un site web professionnel d&apos;afficher ses mentions légales. Cette obligation
            s&apos;applique à tous les auto-entrepreneurs et micro-entrepreneurs qui possèdent un site
            internet, qu&apos;il s&apos;agisse d&apos;un portfolio, d&apos;un site vitrine ou d&apos;une
            boutique en ligne.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            En l&apos;absence de mentions légales, vous vous exposez à une sanction pénale pouvant
            atteindre <strong className="text-foreground">un an d&apos;emprisonnement et 75 000 € d&apos;amende</strong>{" "}
            pour une personne physique (article 1-2 de la LCEN).
            Au-delà de la conformité légale, elles renforcent la confiance de vos visiteurs.
          </p>
        </section>

        {/* Ce qui est inclus */}
        <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 space-y-4">
          <h2 className="text-xl font-bold">Ce que contient votre document</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Identification complète de l'éditeur (nom, SIRET, adresse, email)",
              "Coordonnées de l'hébergeur du site",
              "Informations sur la propriété intellectuelle du contenu",
              "Clause de limitation de responsabilité",
              "Clause de droit applicable et juridiction compétente",
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
          <h2 className="text-2xl font-bold">Prêt à vous mettre en conformité ?</h2>
          <p className="text-muted-foreground">
            Générez vos mentions légales en 3 minutes. Gratuit, sans inscription.
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/generateur?type=mentions_legales">
              Générer maintenant — c&apos;est gratuit →
            </Link>
          </Button>
        </section>
      </main>
    </>
  );
}
