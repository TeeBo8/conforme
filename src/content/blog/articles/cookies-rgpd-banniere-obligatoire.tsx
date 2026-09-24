import Link from "next/link";
import type { BlogArticleMeta } from "../types";

export const meta: BlogArticleMeta = {
  slug: "cookies-rgpd-banniere-obligatoire",
  title: "Cookies et RGPD : faut-il une bannière sur votre site ?",
  description:
    "Quels cookies exigent un consentement, lesquels en sont dispensés, et ce que la CNIL attend d'un bandeau : refus aussi simple que l'acceptation, pas de case pré-cochée, choix conservé.",
  tag: "Cookies",
  publishedAt: "2026-09-24",
  readingTime: 7,
  sources: [
    { label: "Cookies et autres traceurs : que dit la loi ? — cnil.fr", url: "https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi" },
    { label: "Questions-réponses sur les lignes directrices et la recommandation cookies — cnil.fr", url: "https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ" },
    { label: "Cookies et traceurs : comment mettre mon site web en conformité ? — cnil.fr", url: "https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/comment-mettre-mon-site-web-en-conformite" },
    { label: "Sanctions de 150 M€ contre Google et 60 M€ contre Facebook (décembre 2021) — cnil.fr", url: "https://www.cnil.fr/fr/cookies-la-cnil-sanctionne-google-hauteur-de-150-millions-deuros-et-facebook-hauteur-de-60-millions" },
  ],
  faq: [
    {
      question: "Mon site n'utilise pas de cookies publicitaires : ai-je besoin d'un bandeau ?",
      answer:
        "Pas forcément. Si votre site n'utilise que des cookies strictement nécessaires (panier, connexion, préférence d'affichage) et, le cas échéant, une mesure d'audience qui respecte les conditions d'exemption de la CNIL, aucun consentement n'est requis. En revanche, Google Analytics dans sa configuration standard, les pixels publicitaires et la plupart des vidéos intégrées exigent un consentement préalable.",
    },
    {
      question: "Un lien « paramétrez votre navigateur » suffit-il ?",
      answer:
        "Non. Selon la CNIL, en l'état actuel, les réglages des navigateurs ne permettent pas à eux seuls d'exprimer un consentement valable. Il faut un mécanisme sur le site lui-même, avant tout dépôt de cookie soumis au consentement.",
    },
    {
      question: "Combien de temps conserver le choix de l'internaute ?",
      answer:
        "La CNIL considère que conserver le choix, qu'il s'agisse d'un consentement ou d'un refus, pendant 6 mois est en général une bonne pratique, à apprécier selon le site. Cela évite de redemander à chaque visite.",
    },
    {
      question: "Continuer à naviguer vaut-il acceptation ?",
      answer:
        "Non. Poursuivre sa navigation, faire défiler la page ou fermer le bandeau ne constitue pas un consentement : il faut une action positive et claire, comme un clic sur « Accepter ».",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p>
        « Ce site utilise des cookies » : le bandeau est devenu si courant qu&apos;on finit par le
        croire obligatoire partout. Ce n&apos;est pas le cas. Tout dépend des cookies que votre site
        dépose réellement. Et quand un bandeau est nécessaire, la CNIL a des exigences précises
        sur sa forme.
      </p>

      <h2>La règle : consentement préalable, sauf exceptions</h2>
      <p>
        L&apos;article 82 de la loi Informatique et Libertés, qui transpose la directive européenne
        « ePrivacy », encadre toute lecture ou écriture d&apos;informations sur le terminal de
        l&apos;internaute : cookies, mais aussi pixels, identifiants publicitaires ou empreintes
        techniques. Le principe est le <strong>consentement préalable</strong>, sauf pour deux
        catégories de traceurs :
      </p>
      <ul>
        <li>ceux qui ont pour finalité exclusive de permettre ou faciliter la communication ;</li>
        <li>
          ceux qui sont <strong>strictement nécessaires</strong>{" "}à un service expressément
          demandé par l&apos;utilisateur.
        </li>
      </ul>

      <h2>Les cookies dispensés de consentement</h2>
      <p>La CNIL cite notamment comme exemptés :</p>
      <ul>
        <li>les cookies de panier d&apos;achat et d&apos;authentification ;</li>
        <li>ceux qui mémorisent un choix de l&apos;utilisateur (langue, thème, refus des cookies) ;</li>
        <li>ceux qui servent à la sécurité ou à la répartition de charge ;</li>
        <li>
          certains cookies de <strong>mesure d&apos;audience</strong>, à condition qu&apos;ils
          servent uniquement à produire des statistiques anonymes, soient strictement nécessaires
          au fonctionnement du site et limités à l&apos;usage du seul éditeur.
        </li>
      </ul>
      <p>
        Si votre site n&apos;utilise que ce type de traceurs, ou un outil de statistiques sans
        cookie, vous n&apos;avez pas besoin de bandeau de consentement. Vous devez en revanche
        toujours informer vos visiteurs, par exemple dans votre{" "}
        <Link href="/blog/politique-confidentialite-rgpd-guide-tpe">politique de confidentialité</Link>.
      </p>

      <h2>Les cookies qui exigent un consentement</h2>
      <ul>
        <li>
          <strong>La publicité et le reciblage</strong>{" "}: pixel Meta, Google Ads, LinkedIn,
          TikTok ;
        </li>
        <li>
          <strong>La plupart des outils d&apos;analyse</strong>, dont Google Analytics dans sa
          configuration standard ;
        </li>
        <li>
          <strong>Les contenus tiers intégrés</strong>{" "}qui déposent leurs propres traceurs :
          vidéos YouTube, cartes Google Maps, boutons de partage.
        </li>
      </ul>

      <h2>Ce que la CNIL attend d&apos;un bandeau</h2>
      <ul>
        <li>
          <strong>Refuser doit être aussi simple qu&apos;accepter.</strong>{" "}La CNIL considère
          qu&apos;un bouton « Tout refuser » placé au même niveau et avec le même aspect que
          « Tout accepter » est un moyen clair et simple d&apos;y parvenir.
        </li>
        <li>
          <strong>Aucun dépôt avant le choix.</strong>{" "}Les cookies soumis au consentement ne
          doivent pas être déposés tant que l&apos;internaute n&apos;a pas accepté.
        </li>
        <li>
          <strong>Pas de case pré-cochée</strong>, et poursuivre sa navigation ne vaut pas
          acceptation.
        </li>
        <li>
          <strong>Une information claire</strong>{" "}sur les finalités, avant le choix.
        </li>
        <li>
          <strong>Le retrait doit rester possible à tout moment</strong>, aussi facilement que le
          consentement a été donné, par exemple via un lien « Gérer les cookies » en bas de page.
        </li>
        <li>
          <strong>Le choix est conservé</strong>{" "}: une durée de 6 mois, pour le consentement
          comme pour le refus, est en général une bonne pratique selon la CNIL.
        </li>
      </ul>

      <div className="callout">
        <p>
          <strong>Un point d&apos;attention pour les petits sites.</strong>{" "}Le 31 décembre
          2021, la CNIL a sanctionné Google (150 millions d&apos;euros) et Facebook (60 millions
          d&apos;euros), parce que refuser les cookies demandait plusieurs clics alors qu&apos;un
          seul suffisait pour les accepter. La règle vaut pour tous les sites, quelle que soit leur
          taille.
        </p>
      </div>

      <h2>Comment savoir quels cookies votre site dépose ?</h2>
      <p>
        Faites l&apos;inventaire des outils installés : statistiques, publicité, vidéos, cartes,
        chat, formulaires. Les outils de développement de votre navigateur (onglet
        « Stockage » ou « Application ») affichent aussi les cookies présents après le chargement
        de la page.
      </p>
      <p>
        L&apos;analyse de site de ConformeFR repère les services les plus courants sur votre page
        d&apos;accueil (Google Analytics, pixel Meta, YouTube, Google Maps, reCAPTCHA…) et vous
        signale si des cookies soumis au consentement semblent présents sans bandeau. Elle ne
        remplace pas un audit complet : seule la page d&apos;accueil est lue.
      </p>

      <div className="cta">
        <p className="cta-title">Vérifier votre site et générer votre politique</p>
        <p className="cta-text">
          Collez l&apos;adresse de votre site : services tiers détectés, politique de
          confidentialité pré-remplie. Gratuit, sans inscription.
        </p>
        <Link href="/generateur?type=politique_confidentialite" className="cta-button">
          Analyser mon site →
        </Link>
      </div>
    </>
  );
}
