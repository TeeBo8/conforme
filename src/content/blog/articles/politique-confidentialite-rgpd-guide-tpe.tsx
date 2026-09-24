import Link from "next/link";
import type { BlogArticleMeta } from "../types";

export const meta: BlogArticleMeta = {
  slug: "politique-confidentialite-rgpd-guide-tpe",
  title: "Politique de confidentialité RGPD : le guide complet pour TPE",
  description:
    "Ce que doit contenir la politique de confidentialité d'un petit site, article par article du RGPD : finalités, bases légales, durées, destinataires, droits, cookies. Avec les erreurs les plus courantes.",
  tag: "RGPD",
  publishedAt: "2026-09-24",
  readingTime: 8,
  sources: [
    { label: "Règlement (UE) 2016/679 (RGPD), articles 6 et 13 — EUR-Lex", url: "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32016R0679" },
    { label: "Les bases légales — cnil.fr", url: "https://www.cnil.fr/fr/les-bases-legales" },
    { label: "Les durées de conservation des données — cnil.fr", url: "https://www.cnil.fr/fr/passer-laction/les-durees-de-conservation-des-donnees" },
    { label: "Cookies et autres traceurs : que dit la loi ? — cnil.fr", url: "https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi" },
  ],
  faq: [
    {
      question: "Une politique de confidentialité est-elle obligatoire pour un petit site ?",
      answer:
        "Oui, dès que le site traite des données personnelles : un formulaire de contact, une inscription à une newsletter, un outil de mesure d'audience ou un espace client suffisent. Le RGPD s'applique quelle que soit la taille de l'entreprise et impose d'informer les personnes (article 13). La politique de confidentialité est la manière habituelle de le faire.",
    },
    {
      question: "Quelle différence avec les mentions légales ?",
      answer:
        "Les mentions légales identifient l'éditeur et l'hébergeur du site (loi LCEN). La politique de confidentialité explique quelles données personnelles sont collectées, pourquoi, combien de temps et quels sont les droits des personnes (RGPD). Ce sont deux documents distincts, souvent tous les deux nécessaires.",
    },
    {
      question: "Combien de temps puis-je conserver les données d'un prospect ?",
      answer:
        "La CNIL recommande de ne pas conserver les données d'un prospect au-delà de trois ans à compter de leur collecte ou du dernier contact venant de lui. Passé ce délai, vous pouvez lui demander s'il souhaite continuer à recevoir vos messages ; sans réponse positive, les données doivent être supprimées ou archivées.",
    },
    {
      question: "Puis-je copier la politique de confidentialité d'un autre site ?",
      answer:
        "C'est risqué : le document doit décrire vos traitements réels. Une politique copiée mentionne souvent des outils que vous n'utilisez pas, ou en oublie que vous utilisez (hébergeur américain, outil d'analyse, vidéos intégrées), ce qui la rend inexacte.",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p>
        Un formulaire de contact, une newsletter, Google Analytics : il suffit d&apos;un de ces
        éléments pour que votre site traite des données personnelles. Le RGPD vous oblige alors à
        informer clairement vos visiteurs de ce que vous en faites. La politique de
        confidentialité est le document qui porte cette information. Voici, point par point, ce
        qu&apos;elle doit contenir et les erreurs à éviter.
      </p>

      <h2>Qui doit publier une politique de confidentialité ?</h2>
      <p>
        Toute organisation qui traite des données personnelles de personnes situées dans
        l&apos;Union européenne, quelle que soit sa taille : micro-entrepreneur, TPE, association,
        société. Il n&apos;y a pas de seuil. Sur un site web, les situations les plus courantes sont :
      </p>
      <ul>
        <li>un formulaire de contact ou de demande de devis ;</li>
        <li>une inscription à une newsletter ;</li>
        <li>un outil de mesure d&apos;audience (Google Analytics, Matomo…) ;</li>
        <li>un espace client, une boutique en ligne, un module de réservation ;</li>
        <li>des contenus tiers intégrés qui déposent des traceurs (vidéos, cartes).</li>
      </ul>

      <h2>Le contenu obligatoire : l&apos;article 13 du RGPD</h2>
      <p>
        L&apos;article 13 du RGPD liste les informations à fournir lorsque les données sont
        collectées directement auprès de la personne, ce qui est le cas sur un site web :
      </p>
      <ul>
        <li>
          <strong>l&apos;identité et les coordonnées du responsable du traitement</strong>, et
          celles du délégué à la protection des données (DPO) si vous en avez désigné un ;
        </li>
        <li>
          <strong>les finalités</strong>{" "}(pourquoi vous traitez les données) et, pour chacune,
          sa <strong>base légale</strong>{" "};
        </li>
        <li>
          si la base légale est l&apos;intérêt légitime, <strong>l&apos;intérêt poursuivi</strong>{" "};
        </li>
        <li>
          <strong>les destinataires</strong>{" "}ou catégories de destinataires (hébergeur,
          prestataire d&apos;emails, outil d&apos;analyse, prestataire de paiement…) ;
        </li>
        <li>
          <strong>les transferts hors de l&apos;Union européenne</strong>{" "}et les garanties qui
          les encadrent, par exemple lorsque votre hébergeur ou un de vos outils est américain ;
        </li>
        <li>
          <strong>la durée de conservation</strong>, ou les critères utilisés pour la fixer ;
        </li>
        <li>
          <strong>les droits des personnes</strong>{" "}: accès, rectification, effacement,
          limitation, opposition, portabilité, et retrait du consentement lorsqu&apos;il fonde le
          traitement ;
        </li>
        <li>
          <strong>le droit d&apos;introduire une réclamation</strong>{" "}auprès de la CNIL ;
        </li>
        <li>
          le caractère obligatoire ou facultatif des données demandées, et les conséquences si
          elles ne sont pas fournies ;
        </li>
        <li>
          l&apos;existence éventuelle d&apos;une <strong>décision automatisée</strong>, y compris
          un profilage.
        </li>
      </ul>
      <p>
        En France, la loi Informatique et Libertés ajoute un droit spécifique : celui de définir
        des <strong>directives sur le sort de ses données après son décès</strong>{" "}(article 85).
      </p>

      <h2>Les bases légales, expliquées simplement</h2>
      <p>
        L&apos;article 6 du RGPD prévoit six bases légales. Pour un petit site, quatre reviennent
        presque toujours :
      </p>
      <ul>
        <li>
          <strong>l&apos;exécution d&apos;un contrat</strong>{" "}: traiter une commande, gérer un
          compte client ;
        </li>
        <li>
          <strong>l&apos;obligation légale</strong>{" "}: conserver les factures et pièces
          comptables ;
        </li>
        <li>
          <strong>le consentement</strong>{" "}: envoyer une newsletter à un particulier (sauf
          exception pour vos clients existants et des produits similaires), déposer des cookies
          publicitaires ou de mesure d&apos;audience non exemptés ;
        </li>
        <li>
          <strong>l&apos;intérêt légitime</strong>{" "}: répondre à une demande de contact,
          sécuriser le site.
        </li>
      </ul>
      <p>
        Chaque finalité doit avoir sa base légale. Le consentement n&apos;est pas une base
        « par défaut » : il doit être libre, éclairé et pouvoir être retiré aussi simplement
        qu&apos;il a été donné.
      </p>

      <h2>Combien de temps conserver les données ?</h2>
      <p>
        Le RGPD ne fixe pas de durée unique : elle doit être proportionnée à la finalité. Quelques
        repères utiles :
      </p>
      <ul>
        <li>
          <strong>Prospects</strong>{" "}: la CNIL recommande trois ans au plus à compter de la
          collecte ou du dernier contact venant du prospect.
        </li>
        <li>
          <strong>Factures et pièces comptables</strong>{" "}: dix ans (article L123-22 du Code de
          commerce).
        </li>
        <li>
          <strong>Demandes de contact</strong>{" "}: le temps de traiter la demande, puis la durée
          de la relation commerciale qui en découle.
        </li>
      </ul>

      <h2>Et les cookies ?</h2>
      <p>
        La politique de confidentialité doit décrire les cookies et traceurs utilisés. Mais
        l&apos;information ne suffit pas : pour les cookies qui ne sont pas strictement
        nécessaires, le consentement doit être recueilli <strong>avant</strong>{" "}leur dépôt,
        via un bandeau qui permet de refuser aussi facilement que d&apos;accepter. Nous détaillons
        ces règles dans notre article{" "}
        <Link href="/blog/cookies-rgpd-banniere-obligatoire">
          Cookies et RGPD : faut-il une bannière sur votre site ?
        </Link>
        .
      </p>

      <h2>Les erreurs les plus fréquentes</h2>
      <ul>
        <li>
          <strong>Copier la politique d&apos;un autre site</strong>, qui décrit des traitements qui
          ne sont pas les vôtres.
        </li>
        <li>
          <strong>Oublier les prestataires</strong>{" "}: votre hébergeur, votre outil
          d&apos;emailing ou d&apos;analyse reçoivent des données et doivent être mentionnés.
        </li>
        <li>
          <strong>Écrire « vos données ne quittent jamais l&apos;Europe »</strong>{" "}alors que
          l&apos;hébergeur ou un outil est américain.
        </li>
        <li>
          <strong>Renvoyer aux réglages du navigateur</strong>{" "}pour refuser les cookies : selon
          la CNIL, cela ne suffit pas à recueillir un consentement.
        </li>
        <li>
          <strong>Ne jamais mettre le document à jour</strong>{" "}quand vous ajoutez un outil ou
          une fonctionnalité.
        </li>
      </ul>
      <p>
        Ce qu&apos;on risque réellement en cas de manquement est détaillé dans notre article sur
        les{" "}
        <Link href="/blog/amendes-cnil-petits-sites">amendes CNIL pour les petits sites</Link>.
      </p>

      <h2>Où l&apos;afficher ?</h2>
      <p>
        La politique doit être facile à trouver : un lien dans le pied de page de toutes les
        pages, et un lien à proximité de chaque formulaire qui collecte des données (contact,
        newsletter, commande).
      </p>

      <div className="cta">
        <p className="cta-title">Générer votre politique de confidentialité</p>
        <p className="cta-text">
          Indiquez l&apos;adresse de votre site : ConformeFR repère votre hébergeur, vos outils
          d&apos;analyse et vos contenus tiers pour pré-remplir le formulaire. Gratuit, sans
          inscription.
        </p>
        <Link href="/generateur?type=politique_confidentialite" className="cta-button">
          Générer ma politique de confidentialité →
        </Link>
      </div>
    </>
  );
}
