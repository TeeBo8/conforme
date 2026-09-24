import Link from "next/link";
import type { BlogArticleMeta } from "../types";

export const meta: BlogArticleMeta = {
  slug: "mentions-legales-obligatoires-2026",
  title: "Mentions légales obligatoires en 2026 : que doit contenir votre site ?",
  description:
    "Le guide complet des mentions légales obligatoires pour tout site professionnel français : contenu exact, cas particuliers selon votre statut, sanctions encourues.",
  tag: "Mentions légales",
  publishedAt: "2026-09-01",
  updatedAt: "2026-09-24",
  sources: [
    { label: "Loi n° 2004-575 du 21 juin 2004 (LCEN), articles 1-1 et 1-2 — Légifrance", url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000801164" },
    { label: "LCEN, article 19 (commerce électronique) — Légifrance", url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000032236011" },
    { label: "Code de commerce, article R526-27 (mention « EI ») — Légifrance", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000045697814" },
    { label: "Code de la consommation, article L616-1 (médiateur de la consommation) — Légifrance", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032224762" },
  ],
  readingTime: 7,
  faq: [
    {
      question: "Les mentions légales sont-elles obligatoires pour tous les sites internet ?",
      answer:
        "Oui, dès lors que le site est édité dans un cadre professionnel — site vitrine, e-commerce, blog monétisé, application web. Un site strictement personnel et non professionnel n'y est pas soumis, mais dès qu'une activité commerciale ou professionnelle est exercée, les mentions légales sont obligatoires.",
    },
    {
      question: "Quelle est la différence entre mentions légales et politique de confidentialité ?",
      answer:
        "Les mentions légales identifient l'éditeur et l'hébergeur du site, conformément à la loi LCEN. La politique de confidentialité explique comment les données personnelles des visiteurs sont collectées et traitées, conformément au RGPD. Ce sont deux documents distincts, souvent tous les deux obligatoires.",
    },
    {
      question: "Puis-je utiliser les mentions légales d'un autre site comme modèle ?",
      answer:
        "Copier telles quelles les mentions légales d'un concurrent est risqué : les informations (SIRET, hébergeur, adresse) ne correspondront pas à votre situation, ce qui rend le document inexact et donc non conforme. Chaque site doit avoir des mentions légales reflétant sa propre structure juridique.",
    },
    {
      question: "Où faut-il placer les mentions légales sur son site ?",
      answer:
        "La loi n'impose pas d'emplacement précis, mais l'usage veut qu'elles soient accessibles depuis n'importe quelle page, généralement via un lien dans le pied de page (footer), sous un intitulé explicite comme « Mentions légales ».",
    },
    {
      question: "Combien coûte la création de mentions légales conformes ?",
      answer:
        "Avec ConformeFR, c'est gratuit : vos mentions légales sont générées en 3 minutes à partir de vos informations et téléchargeables en PDF et en HTML, sans inscription.",
    },
  ],
};

export default function Article() {
  return (
    <>
      <p>
        Si vous éditez un site professionnel — vitrine, boutique en ligne, blog monétisé,
        application SaaS — la loi française vous impose d&apos;afficher des mentions légales.
        Ce n&apos;est pas une formalité optionnelle : c&apos;est une obligation prévue par la loi
        depuis plus de vingt ans, dont l&apos;absence expose à des sanctions bien réelles. Voici,
        point par point, ce que doit contenir ce document en 2026.
      </p>

      <h2>Qui est concerné par cette obligation ?</h2>
      <p>
        La loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique — la{" "}
        <strong>LCEN</strong>{" "}— impose à toute personne éditant un service de communication au
        public en ligne à titre professionnel d&apos;afficher ses mentions légales. Concrètement,
        cela concerne :
      </p>
      <ul>
        <li>les auto-entrepreneurs et micro-entrepreneurs avec un site web ;</li>
        <li>les sociétés (SASU, SARL, EURL…) disposant d&apos;un site vitrine ou e-commerce ;</li>
        <li>les blogueurs et créateurs de contenu qui monétisent leur activité ;</li>
        <li>les éditeurs d&apos;applications web et de SaaS.</li>
      </ul>
      <p>
        Un site strictement personnel, sans aucune activité commerciale ni monétisation,
        n&apos;est en principe pas soumis à cette obligation. Mais dès qu&apos;une activité
        professionnelle transparaît — vente de produits, prestation de services, publicité,
        affiliation — les mentions légales deviennent obligatoires.
      </p>

      <h2>Le contenu obligatoire des mentions légales</h2>
      <p>
        La LCEN (article 1-1, dans sa numérotation issue de la loi SREN du 21 mai 2024) fixe une liste précise d&apos;informations à faire figurer.
        Voici les six blocs que doit contenir votre document.
      </p>

      <h3>1. Identification de l&apos;éditeur</h3>
      <ul>
        <li>Nom et prénom (personne physique) ou dénomination sociale (société) ;</li>
        <li>Forme juridique (auto-entrepreneur, SASU, SARL…) et capital social le cas échéant ;</li>
        <li>Adresse du siège social ou de l&apos;établissement ;</li>
        <li>Numéro SIRET (ou RCS et ville d&apos;immatriculation pour une société) ;</li>
        <li>Numéro de TVA intracommunautaire, si vous y êtes assujetti ;</li>
        <li>Adresse email et un numéro de téléphone (exigé par la LCEN).</li>
      </ul>

      <h3>2. Directeur de la publication</h3>
      <p>
        Le nom de la personne responsable du contenu publié sur le site — en général le
        représentant légal de la société, ou vous-même si vous êtes auto-entrepreneur.
      </p>

      <h3>3. Coordonnées de l&apos;hébergeur</h3>
      <p>
        Dénomination sociale, adresse et numéro de téléphone de la société qui héberge
        techniquement votre site (par exemple Vercel, OVH, ou un autre hébergeur). Cette
        information doit être exacte : elle sert de point de contact légal en cas de litige.
      </p>

      <h3>4. Propriété intellectuelle</h3>
      <p>
        Une clause précisant que le contenu du site (textes, visuels, code) est protégé et que
        toute reproduction sans autorisation est interdite.
      </p>

      <h3>5. Renvoi vers la politique de confidentialité</h3>
      <p>
        Si votre site collecte des données personnelles (formulaire de contact, compte
        utilisateur, newsletter…), les mentions légales doivent renvoyer vers une{" "}
        <Link href="/politique-confidentialite-rgpd-petite-entreprise">
          politique de confidentialité conforme au RGPD
        </Link>
        , qui est un document distinct et lui aussi obligatoire dans ce cas.
      </p>

      <h3>6. Cookies, si votre site en utilise</h3>
      <p>
        Une mention sur l&apos;usage de cookies (analytics, publicité, préférences) et un renvoi
        vers les modalités de gestion du consentement, si applicable.
      </p>

      <h2>Des obligations qui varient selon votre statut</h2>
      <p>
        Le socle ci-dessus est commun à tous, mais certains éléments changent selon votre
        situation :
      </p>
      <ul>
        <li>
          <strong>Auto-entrepreneur :</strong>{" "}pas de capital social à mentionner, mais le numéro SIRET
          reste obligatoire, ainsi que le numéro RCS si l&apos;activité est commerciale. Voir notre guide dédié{" "}
          <Link href="/mentions-legales-auto-entrepreneur">
            mentions légales auto-entrepreneur
          </Link>
          .
        </li>
        <li>
          <strong>Site vitrine :</strong>{" "}le socle standard suffit dans la grande majorité des
          cas. Détails dans notre guide{" "}
          <Link href="/mentions-legales-site-vitrine">mentions légales site vitrine</Link>.
        </li>
        <li>
          <strong>E-commerce :</strong>{" "}obligations renforcées — conditions générales de vente
          (CGV), modalités de rétractation, informations sur le médiateur de la consommation.
          Voir notre guide{" "}
          <Link href="/mentions-legales-ecommerce">mentions légales e-commerce</Link>.
        </li>
      </ul>

      <div className="callout">
        <p>
          <strong>Sanctions encourues.</strong>{" "}L&apos;absence ou l&apos;inexactitude des
          mentions légales est punie par l&apos;article 1-2 de la LCEN d&apos;un an
          d&apos;emprisonnement et de 75 000 € d&apos;amende pour une personne physique — jusqu&apos;à
          375 000 € pour une personne morale. En pratique, les contrôles ciblent surtout les
          sites signalés (concurrents, clients mécontents) plutôt qu&apos;un contrôle
          systématique, mais le risque est réel et la mise en conformité prend quelques minutes.
        </p>
      </div>

      <h2>Où et comment afficher vos mentions légales</h2>
      <p>
        La loi n&apos;impose pas d&apos;emplacement précis, mais l&apos;usage constant veut
        qu&apos;elles soient accessibles en un clic depuis n&apos;importe quelle page du site,
        typiquement via un lien « Mentions légales » dans le pied de page. Elles doivent rester
        consultables sans inscription ni connexion préalable.
      </p>

      <h2>Générer vos mentions légales en 3 minutes</h2>
      <p>
        Rédiger ce document à la main suppose de connaître précisément les textes applicables
        à votre situation — et une erreur (SIRET manquant, hébergeur mal identifié) suffit à
        rendre le document non conforme. ConformeFR génère un document personnalisé à partir de
        vos informations d&apos;entreprise, gratuitement et sans inscription.
      </p>

      <div className="cta">
        <p className="cta-title">Prêt à mettre votre site en conformité ?</p>
        <p className="cta-text">
          Générez vos mentions légales personnalisées en 3 minutes. Gratuit, sans
          inscription.
        </p>
        <Link href="/generateur?type=mentions_legales" className="cta-button">
          Générer mes mentions légales gratuitement →
        </Link>
      </div>
    </>
  );
}
