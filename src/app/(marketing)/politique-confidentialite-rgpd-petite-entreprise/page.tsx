import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Politique de confidentialité RGPD petite entreprise — ConformeFR",
  description:
    "Générez une politique de confidentialité RGPD adaptée à votre petite entreprise ou TPE. Gratuit, PDF et HTML.",
  alternates: { canonical: "/politique-confidentialite-rgpd-petite-entreprise" },
};

const faq = [
  {
    question: "Une petite entreprise est-elle concernée par le RGPD ?",
    answer:
      "Oui. Le RGPD (Règlement Général sur la Protection des Données) s'applique à toutes les organisations qui traitent des données personnelles de résidents de l'Union européenne, quelle que soit leur taille. Un formulaire de contact, Google Analytics, une newsletter ou un cookie de suivi suffisent à vous soumettre à son respect.",
  },
  {
    question: "Qu'est-ce qu'une politique de confidentialité RGPD et pourquoi en ai-je besoin ?",
    answer:
      "La politique de confidentialité (ou politique de protection des données) informe vos visiteurs sur les données personnelles que vous collectez, pourquoi vous les collectez, combien de temps vous les conservez, et quels sont leurs droits. Elle est obligatoire dès lors que vous traitez des données personnelles, et son absence peut entraîner des sanctions de la CNIL allant jusqu'à 4 % du chiffre d'affaires mondial.",
  },
  {
    question: "Quelle est la différence entre mentions légales et politique de confidentialité ?",
    answer:
      "Les mentions légales (loi LCEN) identifient l'éditeur du site. La politique de confidentialité (RGPD) informe sur le traitement des données personnelles. Ces deux documents sont complémentaires et obligatoires pour la plupart des sites web professionnels. ConformeFR propose un pack gratuit incluant les deux documents.",
  },
  {
    question: "Ma petite entreprise n'utilise que Google Analytics, ai-je besoin d'une politique de confidentialité ?",
    answer:
      "Oui. Google Analytics collecte des données personnelles (adresse IP, comportement de navigation). Vous devez informer vos utilisateurs via une politique de confidentialité, obtenir leur consentement via une bannière cookies conforme, et vous assurer que le transfert de données vers les États-Unis est encadré (via le Data Privacy Framework).",
  },
  {
    question: "Ma politique de confidentialité doit-elle mentionner les cookies ?",
    answer:
      "Oui, si votre site utilise des cookies (analytics, publicité, réseaux sociaux, paiement). La politique de confidentialité doit lister les types de cookies utilisés, leur finalité et leur durée de conservation. Elle peut être complétée par une bannière cookies séparée pour recueillir le consentement.",
  },
  {
    question: "Combien de temps faut-il pour générer ma politique de confidentialité avec ConformeFR ?",
    answer:
      "Environ 3 minutes. Vous renseignez les informations de votre entreprise et les données que vous collectez (formulaire de contact, newsletter, analytics, paiement...), et ConformeFR génère un document personnalisé. C'est gratuit : le téléchargement PDF et HTML ne demande pas d'inscription.",
  },
];

export default function PolitiqueConfidentialiteRgpdPage() {
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
            RGPD — règlement (UE) 2016/679
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Politique de confidentialité RGPD<br />
            <span className="text-muted-foreground">petite entreprise</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Une politique de confidentialité sur mesure, rédigée à partir des informations
            exigées par le RGPD. Généré en 3 minutes.
          </p>
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/generateur?type=politique_confidentialite">
              Générer ma politique de confidentialité →
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">Gratuit · PDF et HTML · Sans inscription</p>
        </section>

        {/* Contenu */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">RGPD et petite entreprise : ce que vous devez savoir</h2>
          <p className="text-muted-foreground leading-relaxed">
            Le RGPD est entré en application le 25 mai 2018. Contrairement à une idée reçue, il
            ne s&apos;applique pas qu&apos;aux grandes entreprises. Dès lors que vous collectez
            une adresse email, utilisez Google Analytics ou proposez un formulaire de contact,
            vous traitez des <strong className="text-foreground">données personnelles</strong> et devez
            en informer vos visiteurs.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            La CNIL peut sanctionner les manquements au RGPD, y compris pour les TPE et PME.
            Au-delà de la conformité, une politique de confidentialité claire renforce la confiance
            de vos clients et peut être un avantage concurrentiel.
          </p>
        </section>

        {/* Données collectées */}
        <section className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 space-y-4">
          <h2 className="text-xl font-bold">Données traitées couvertes par le document</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Données de formulaire de contact (nom, email, message)",
              "Données de newsletter et email marketing",
              "Données analytiques (Google Analytics, Matomo…)",
              "Cookies et traceurs tiers",
              "Données de compte utilisateur (si applicable)",
              "Données de paiement (via Stripe, PayPal…)",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-foreground mt-0.5">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
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
          <h2 className="text-2xl font-bold">Rédigez votre politique de confidentialité dès aujourd&apos;hui</h2>
          <p className="text-muted-foreground">
            Générez votre politique de confidentialité en 3 minutes. Gratuit, sans inscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="text-base px-8">
              <Link href="/generateur?type=politique_confidentialite">
                Politique de confidentialité →
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8">
              <Link href="/generateur?type=pack">
                Pack complet (mentions + RGPD) →
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
