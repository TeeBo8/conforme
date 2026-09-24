import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — ConformeFR",
  description: "Quelles données ConformeFR traite, pourquoi, combien de temps, et comment exercer vos droits.",
};

const CONTACT = "contact@teebostudio.fr";

function Mail() {
  return (
    <a href={`mailto:${CONTACT}`} className="underline hover:text-primary">
      {CONTACT}
    </a>
  );
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold mb-2">Politique de confidentialité</h1>
      <p className="text-muted-foreground text-sm mb-8">Dernière mise à jour : 24 septembre 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-foreground">
        <p className="text-muted-foreground">
          ConformeFR (conformefr.com) est un outil gratuit édité à titre non professionnel par
          Thibault Leture. Cette page explique quelles données personnelles sont traitées, pourquoi,
          combien de temps, et comment exercer vos droits, conformément au RGPD (règlement (UE)
          2016/679) et à la loi Informatique et Libertés.
        </p>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">1. Responsable du traitement</h2>
          <p>
            Thibault Leture — contact : <Mail />
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">2. Données traitées et finalités</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">Informations saisies dans le générateur</strong>{" "}
              (nom de l&apos;entreprise, forme juridique, adresse, email, téléphone, SIRET,
              hébergeur, données collectées par votre site…). Elles servent à générer votre
              document et sont enregistrées avec lui pour que son lien de consultation et de
              téléchargement fonctionne. Base légale : exécution du service que vous demandez
              (art. 6.1.b RGPD). Ces informations peuvent contenir des données personnelles si
              vous éditez votre site en votre nom propre.
            </li>
            <li>
              <strong className="text-foreground">Rédaction assistée par IA</strong> : pour la
              politique de confidentialité, le nom de l&apos;entreprise, le type de site et les
              finalités cochées sont envoyés à l&apos;API d&apos;Anthropic (Claude) afin de rédiger
              un paragraphe d&apos;explication en langage clair. Aucune autre donnée du formulaire
              n&apos;est transmise. Base légale : exécution du service (art. 6.1.b RGPD).
            </li>
            <li>
              <strong className="text-foreground">Comptes créés avant la gratuité</strong>{" "}
              (adresse email, nom, mot de passe chiffré, sessions de connexion avec adresse IP et
              navigateur) : ils permettent de retrouver les documents achetés à l&apos;époque où
              ConformeFR était payant. Plus aucun compte n&apos;est nécessaire aujourd&apos;hui.
              Base légale : exécution du contrat (art. 6.1.b RGPD).
            </li>
            <li>
              <strong className="text-foreground">Mesure d&apos;audience</strong> : Vercel Web
              Analytics compte les pages vues et quelques actions (génération, téléchargement)
              de façon agrégée, sans cookie. Base légale : intérêt légitime à améliorer
              l&apos;outil (art. 6.1.f RGPD).
            </li>
            <li>
              <strong className="text-foreground">Journaux techniques</strong> (adresse IP,
              navigateur, pages demandées) conservés par l&apos;hébergeur pour la sécurité et le
              bon fonctionnement du site. Base légale : intérêt légitime (art. 6.1.f RGPD).
            </li>
            <li>
              <strong className="text-foreground">Messages envoyés par email</strong> : utilisés
              uniquement pour vous répondre.
            </li>
          </ul>
          <p>
            Aucune donnée n&apos;est vendue, louée ni utilisée à des fins publicitaires, et aucune
            décision automatisée produisant des effets juridiques n&apos;est prise à votre égard.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">3. Durée de conservation</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>
              Documents générés et informations saisies : conservés pour que leur lien reste
              utilisable, jusqu&apos;à ce que vous en demandiez la suppression.
            </li>
            <li>Comptes existants : jusqu&apos;à leur suppression, sur simple demande.</li>
            <li>Messages : le temps nécessaire au traitement de votre demande.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold text-base">4. Sous-traitants</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>
              <strong className="text-foreground">Vercel Inc.</strong> (États-Unis) — hébergement
              et mesure d&apos;audience.
            </li>
            <li>
              <strong className="text-foreground">Neon Inc.</strong> (États-Unis) — base de
              données, hébergée dans l&apos;Union européenne (Francfort).
            </li>
            <li>
              <strong className="text-foreground">Anthropic PBC</strong> (États-Unis) — rédaction
              assistée par IA (voir section 2).
            </li>
            <li>
              <strong className="text-foreground">Stripe</strong> et{" "}
              <strong className="text-foreground">Resend Inc.</strong> — paiement et email de
              confirmation, uniquement pour les achats effectués avant la gratuité.
            </li>
          </ul>
          <p>
            Certains de ces prestataires sont établis aux États-Unis. Les transferts de données
            hors de l&apos;Union européenne sont encadrés par les garanties prévues au chapitre V du
            RGPD (clauses contractuelles types de la Commission européenne ou certification au
            Data Privacy Framework UE–États-Unis, selon le prestataire).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">5. Cookies</h2>
          <p>
            Aucun cookie publicitaire ni de mesure d&apos;audience n&apos;est déposé. Seul un cookie
            de session, strictement nécessaire, est utilisé si vous vous connectez à un compte
            existant. Le thème clair ou sombre que vous choisissez est mémorisé dans votre
            navigateur (stockage local), uniquement à votre demande.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">6. Vos droits</h2>
          <p>
            Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
            limitation, de portabilité et d&apos;opposition, ainsi que du droit de définir des
            directives sur le sort de vos données après votre décès. Pour les exercer, ou pour
            faire supprimer un document que vous avez généré (indiquez son lien), écrivez à{" "}
            <Mail />. Une réponse vous sera apportée dans un délai d&apos;un mois.
          </p>
          <p>
            Vous pouvez aussi introduire une réclamation auprès de la{" "}
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
          <h2 className="font-semibold text-base">7. Modifications</h2>
          <p>
            Cette politique peut évoluer avec l&apos;outil. La date de dernière mise à jour figure en
            haut de la page.
          </p>
        </section>
      </div>
    </main>
  );
}
