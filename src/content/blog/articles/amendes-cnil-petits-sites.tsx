import Link from "next/link";
import type { BlogArticleMeta } from "../types";

export const meta: BlogArticleMeta = {
  slug: "amendes-cnil-petits-sites",
  title: "Amendes CNIL : ce que risquent vraiment les petits sites",
  description:
    "Les sanctions record de la CNIL font les gros titres, mais que risque réellement un site de TPE ou d'indépendant ? Le point sur les vrais mécanismes et montants.",
  tag: "RGPD",
  publishedAt: "2026-09-04",
  readingTime: 6,
  faq: [
    {
      question: "La CNIL contrôle-t-elle vraiment les petits sites indépendants ?",
      answer:
        "Oui, mais rarement par contrôle proactif systématique. La très grande majorité des dossiers ouverts contre des TPE viennent d'une plainte déposée par un internaute (client, prospect, salarié) via le téléservice de plaintes de la CNIL, ou d'un contrôle automatisé en ligne portant sur les cookies.",
    },
    {
      question: "Une petite structure peut-elle vraiment recevoir une amende de plusieurs millions d'euros ?",
      answer:
        "Le plafond légal (20 millions d'euros ou 4 % du chiffre d'affaires mondial) s'applique en théorie à tous, mais la CNIL module systématiquement le montant selon la taille de la structure, sa bonne foi et sa capacité financière. Pour une TPE, les sanctions prononcées restent très en dessous de ce plafond.",
    },
    {
      question: "Que se passe-t-il si je reçois une mise en demeure de la CNIL ?",
      answer:
        "Une mise en demeure fixe un délai (souvent 1 à 3 mois) pour vous mettre en conformité. Si vous corrigez le problème dans ce délai et répondez à la CNIL, l'affaire s'arrête généralement là, sans sanction financière. La sanction n'intervient qu'en cas d'absence de réponse ou de mise en conformité.",
    },
    {
      question: "Le manque de politique de confidentialité peut-il, à lui seul, déclencher une sanction ?",
      answer:
        "Oui, c'est l'un des manquements les plus fréquemment relevés chez les petites structures, car il est facile à constater depuis l'extérieur. Combiné à d'autres manquements (cookies non consentis, absence de réponse à un droit d'accès), il aggrave le dossier.",
    },
    {
      question: "Comment vérifier que mon site est conforme sans faire appel à un avocat ?",
      answer:
        "Pour les obligations documentaires de base — mentions légales et politique de confidentialité — ConformeFR génère un document personnalisé et conforme en 3 minutes, avec un aperçu gratuit avant tout paiement.",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p>
        Une amende de plusieurs millions d&apos;euros contre un géant du numérique fait
        toujours les gros titres. Résultat : beaucoup d&apos;indépendants et de TPE pensent,
        à tort, que la CNIL ne s&apos;intéresse qu&apos;aux grandes entreprises. La réalité est
        différente — et souvent moins spectaculaire, mais bien réelle.
      </p>

      <h2>Ce que peut faire la CNIL, concrètement</h2>
      <p>
        La Commission nationale de l&apos;informatique et des libertés dispose d&apos;un
        éventail de pouvoirs gradués, pas seulement de la sanction financière :
      </p>
      <ul>
        <li>le <strong>rappel à l&apos;ordre</strong>, sans publicité ;</li>
        <li>
          la <strong>mise en demeure</strong>, qui fixe un délai pour corriger le manquement
          (c&apos;est, de loin, la mesure la plus fréquente) ;
        </li>
        <li>l&apos;<strong>amende administrative</strong>, dont le plafond légal atteint 20 millions d&apos;euros ou 4 % du chiffre d&apos;affaires mondial — un plafond théorique, quasiment jamais atteint par une petite structure.</li>
      </ul>
      <p>
        Dans l&apos;immense majorité des dossiers concernant des TPE et indépendants, la
        procédure s&apos;arrête à la mise en demeure : si vous corrigez le problème dans le
        délai imparti, il n&apos;y a pas de sanction financière derrière.
      </p>

      <h2>Comment un contrôle démarre réellement</h2>
      <p>
        Contrairement à l&apos;image d&apos;un contrôle surprise, la plupart des dossiers
        ouverts contre de petites structures ont une origine précise :
      </p>
      <ul>
        <li>
          une <strong>plainte</strong>{" "}déposée par un client, un prospect ou un ancien salarié
          via le téléservice de plaintes en ligne de la CNIL — souvent après une demande de
          suppression de données restée sans réponse ;
        </li>
        <li>
          un <strong>contrôle automatisé en ligne</strong>{" "}: la CNIL scanne régulièrement des
          sites web pour détecter les bannières de cookies non conformes (cases pré-cochées,
          absence de bouton « Refuser » aussi visible que « Accepter ») ;
        </li>
        <li>un signalement d&apos;un concurrent ou d&apos;une association de consommateurs.</li>
      </ul>

      <h2>Les manquements les plus fréquents chez les petites structures</h2>
      <p>
        D&apos;après les typologies de sanctions publiées par la CNIL, quatre manquements
        reviennent très régulièrement chez les indépendants, TPE et PME :
      </p>
      <ul>
        <li>
          <strong>Cookies déposés sans consentement valable</strong>{" "}avant tout clic de
          l&apos;utilisateur (traceurs publicitaires ou analytics non essentiels) ;
        </li>
        <li>
          <strong>Absence de politique de confidentialité</strong>, ou politique de
          confidentialité générique copiée-collée qui ne correspond pas au traitement réel
          effectué par le site ;
        </li>
        <li>
          <strong>Non-réponse dans le délai légal d&apos;un mois</strong>{" "}à une demande
          d&apos;accès, de rectification ou de suppression de données ;
        </li>
        <li>
          <strong>Durée de conservation excessive</strong>{" "}des données (fichiers clients ou
          prospects conservés indéfiniment, sans purge).
        </li>
      </ul>
      <p>
        Les deux premiers points recoupent directement ce que doivent contenir vos{" "}
        <Link href="/mentions-legales-obligatoires-2026">mentions légales</Link> et votre{" "}
        <Link href="/politique-confidentialite-rgpd-petite-entreprise">
          politique de confidentialité RGPD
        </Link>
        .
      </p>

      <div className="callout">
        <p>
          <strong>Ce qu&apos;il faut retenir sur les montants.</strong>{" "}Pour une TPE de
          bonne foi qui se met en conformité après une mise en demeure, il n&apos;y a
          généralement aucune sanction financière. Quand une amende est tout de même
          prononcée contre une petite structure — en cas d&apos;absence de réponse ou de
          manquement répété — les montants observés restent très éloignés des amendes
          record médiatisées, la CNIL tenant compte explicitement de la taille et des
          moyens de la structure sanctionnée.
        </p>
      </div>

      <h2>Comment limiter le risque, concrètement</h2>
      <p>
        La bonne nouvelle : les manquements les plus fréquents sont aussi les plus simples à
        corriger, sans budget juridique.
      </p>
      <ul>
        <li>Publier des mentions légales et une politique de confidentialité à jour, correspondant réellement à votre activité ;</li>
        <li>Configurer votre bannière de cookies pour qu&apos;un refus soit aussi simple qu&apos;une acceptation ;</li>
        <li>Prévoir une procédure — même simple — pour répondre à une demande de suppression de données dans le mois ;</li>
        <li>Éviter de conserver des données clients ou prospects sans limite de durée.</li>
      </ul>
      <p>
        Si vous répondez rapidement et de bonne foi à une mise en demeure, le dossier
        s&apos;arrête généralement là. Le vrai risque n&apos;est pas le contrôle lui-même,
        c&apos;est l&apos;absence de réponse.
      </p>

      <div className="cta">
        <p className="cta-title">Vos documents légaux ne sont pas à jour ?</p>
        <p className="cta-text">
          Générez des mentions légales et une politique de confidentialité conformes en 3
          minutes. Aperçu gratuit, vous ne payez que si vous téléchargez.
        </p>
        <Link href="/generateur" className="cta-button">
          Générer mes documents légaux →
        </Link>
      </div>
    </>
  );
}
