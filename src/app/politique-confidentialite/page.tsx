import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — ConformeFR",
  description: "Politique de confidentialité et de protection des données personnelles de ConformeFR, conforme au RGPD.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold mb-2">Politique de confidentialité</h1>
      <p className="text-muted-foreground text-sm mb-8">Dernière mise à jour : juin 2025</p>

      <div className="space-y-8 text-sm leading-relaxed text-foreground">
        <p className="text-muted-foreground">
          ConformeFR (conformefr.com) est édité par Leture Thibault (personne physique). La
          présente politique décrit la façon dont nous collectons, utilisons et protégeons vos
          données personnelles, conformément au Règlement Général sur la Protection des Données
          (RGPD — UE 2016/679).
        </p>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">1. Responsable du traitement</h2>
          <p>Leture Thibault — 28 rue de la Pépinière, 75008 Paris</p>
          <p>
            Contact :{" "}
            <a href="mailto:contact@teebostudio.fr" className="underline hover:text-primary">
              contact@teebostudio.fr
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">2. Données collectées</h2>
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>
              <strong className="text-foreground">Compte utilisateur</strong> : adresse email,
              date de création du compte.
            </li>
            <li>
              <strong className="text-foreground">Formulaire de génération</strong> : informations
              relatives à votre entreprise (nom, adresse, SIRET, type de site…) saisies pour
              générer vos documents légaux.
            </li>
            <li>
              <strong className="text-foreground">Paiement</strong> : les données bancaires sont
              traitées exclusivement par Stripe. Nous ne stockons aucune donnée de carte
              bancaire.
            </li>
            <li>
              <strong className="text-foreground">Données techniques</strong> : logs de connexion
              gérés par notre hébergeur Vercel (adresse IP, navigateur).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">3. Finalités et bases légales</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>
              <strong className="text-foreground">Fourniture du service</strong> : génération,
              stockage et téléchargement de documents légaux — base légale : exécution du contrat.
            </li>
            <li>
              <strong className="text-foreground">Paiement</strong> : traitement des transactions
              via Stripe — base légale : exécution du contrat.
            </li>
            <li>
              <strong className="text-foreground">Emails transactionnels</strong> : envoi du lien
              de téléchargement après paiement — base légale : exécution du contrat.
            </li>
            <li>
              <strong className="text-foreground">Obligations légales</strong> : conservation des
              données de facturation — base légale : obligation légale (5 ans).
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">4. Durée de conservation</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Données de compte : jusqu&apos;à suppression du compte ou 3 ans d&apos;inactivité.</li>
            <li>Documents générés : accessibles tant que le compte est actif.</li>
            <li>Données de facturation : 5 ans (obligation légale comptable).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">5. Sous-traitants</h2>
          <p className="text-muted-foreground">
            Nous faisons appel aux prestataires suivants, chacun étant soumis à ses propres
            engagements RGPD :
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>
              <strong className="text-foreground">Vercel Inc.</strong> (États-Unis) — hébergement
              et infrastructure.
            </li>
            <li>
              <strong className="text-foreground">Neon Inc.</strong> (États-Unis) — base de
              données PostgreSQL.
            </li>
            <li>
              <strong className="text-foreground">Stripe Inc.</strong> (États-Unis) — traitement
              des paiements.
            </li>
            <li>
              <strong className="text-foreground">Resend Inc.</strong> (États-Unis) — envoi
              d&apos;emails transactionnels.
            </li>
          </ul>
          <p className="text-muted-foreground">
            Ces transferts hors UE sont encadrés par les clauses contractuelles types de la
            Commission européenne.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">6. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants sur vos données : accès,
            rectification, suppression, portabilité, limitation du traitement et opposition.
          </p>
          <p>
            Pour exercer ces droits, contactez-nous à{" "}
            <a href="mailto:contact@teebostudio.fr" className="underline hover:text-primary">
              contact@teebostudio.fr
            </a>
            . Nous répondrons dans un délai maximum de 30 jours. Vous pouvez également introduire
            une réclamation auprès de la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              CNIL
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">7. Cookies</h2>
          <p>
            Ce site utilise uniquement un cookie de session nécessaire au fonctionnement de
            l&apos;authentification. Aucun cookie publicitaire ou de traçage tiers n&apos;est
            utilisé.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">8. Modifications</h2>
          <p>
            Cette politique peut être mise à jour. La date de dernière mise à jour est indiquée
            en haut de cette page. Toute modification substantielle vous sera notifiée par email.
          </p>
        </section>
      </div>
    </main>
  );
}
