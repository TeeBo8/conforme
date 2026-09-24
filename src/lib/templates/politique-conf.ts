import type {
  PolitiqueConfVars,
  DonneeCollectee,
  Finalite,
  TypeCookie,
} from "./types";
import { escapeVars } from "./escape";

function today(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const DONNEES_LABELS: Record<DonneeCollectee, string> = {
  email: "Adresse email",
  nom_prenom: "Nom et prénom",
  telephone: "Numéro de téléphone",
  adresse_postale: "Adresse postale",
  donnees_paiement: "Données de paiement (traitées par notre prestataire de paiement sécurisé)",
  donnees_compte: "Données de compte (identifiants, préférences)",
  donnees_navigation: "Données de navigation (pages visitées, durée de visite, actions)",
  logs_techniques: "Journaux techniques (logs d'accès, logs d'erreurs)",
  adresse_ip: "Adresse IP",
  cookies: "Cookies et traceurs de navigation",
};

const FINALITES_DATA: Record<
  Finalite,
  { label: string; base: string; description: string }
> = {
  gestion_commandes: {
    label: "Gestion des commandes et livraisons",
    base: "Exécution du contrat (Art. 6.1.b RGPD)",
    description: "Traitement, suivi et livraison de vos commandes.",
  },
  envoi_newsletter: {
    label: "Envoi de la newsletter et communications marketing",
    base: "Consentement (Art. 6.1.a RGPD)",
    description:
      "Envoi d'emails d'information et de communications commerciales. Vous pouvez vous désabonner à tout moment via le lien présent dans chaque email.",
  },
  support_client: {
    label: "Support client et traitement des demandes",
    base: "Intérêt légitime (Art. 6.1.f RGPD)",
    description: "Réponse à vos questions, réclamations et demandes d'assistance.",
  },
  statistiques: {
    label: "Mesure d'audience et amélioration du site",
    base: "Intérêt légitime (Art. 6.1.f RGPD)",
    description:
      "Analyse des statistiques de visite pour comprendre l'utilisation du site et améliorer nos services.",
  },
  personnalisation: {
    label: "Personnalisation de l'expérience utilisateur",
    base: "Consentement (Art. 6.1.a RGPD)",
    description:
      "Mémorisation de vos préférences pour personnaliser votre expérience de navigation.",
  },
  facturation: {
    label: "Facturation et obligations comptables",
    base: "Obligation légale (Art. 6.1.c RGPD)",
    description:
      "Émission des factures et respect des obligations légales en matière de comptabilité.",
  },
  compte_utilisateur: {
    label: "Création et gestion du compte utilisateur",
    base: "Exécution du contrat (Art. 6.1.b RGPD)",
    description:
      "Création, gestion et sécurisation de votre espace personnel.",
  },
  securite: {
    label: "Sécurité du site et prévention des fraudes",
    base: "Intérêt légitime (Art. 6.1.f RGPD)",
    description:
      "Protection du site contre les accès non autorisés, les attaques et les activités frauduleuses.",
  },
};

const COOKIES_LABELS: Record<TypeCookie, string> = {
  analytics: "Cookies analytiques — mesure d'audience et statistiques de visite",
  fonctionnels: "Cookies fonctionnels — mémorisation de vos préférences",
  publicitaires: "Cookies publicitaires — personnalisation des annonces",
  tiers: "Cookies tiers — services intégrés (ex. vidéos, cartes, réseaux sociaux)",
};

export function buildPolitiqueConf(vars: PolitiqueConfVars): string {
  const {
    nomEntreprise,
    adresse,
    email,
    telephone,
    urlSite,
    donneesCollectees,
    finalites,
    finalitesDescription,
    cookiesUtilises,
    typesCookies,
    dureeConservation,
    transfertHorsUE,
    paysTransfert,
    nomHebergeur,
    dpoContact,
  } = escapeVars(vars);

  // Cookies soumis au consentement préalable (art. 82 loi Informatique et Libertés,
  // lignes directrices CNIL du 17/09/2020) : tout sauf les cookies strictement nécessaires
  const cookiesSoumisConsentement =
    cookiesUtilises && (typesCookies ?? []).some((c) => c !== "fonctionnels");
  const analyticsAvecCookies = cookiesUtilises && (typesCookies ?? []).includes("analytics");

  let n = 0;
  const s = () => String(++n);

  const sections: string[] = [];

  // 1. Responsable du traitement
  sections.push(`<section>
<h2>${s()}. Responsable du traitement</h2>
<p>Le responsable du traitement de vos données personnelles est :</p>
<ul>
  <li><strong>Dénomination :</strong> ${nomEntreprise}</li>
  <li><strong>Adresse :</strong> ${adresse}</li>
  <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
  ${telephone ? `<li><strong>Téléphone :</strong> ${telephone}</li>` : ""}
</ul>
${dpoContact ? `<p><strong>Délégué à la protection des données (DPO) :</strong> ${dpoContact}</p>` : ""}
</section>`);

  // 2. Données collectées
  sections.push(`<section>
<h2>${s()}. Données personnelles collectées</h2>
<p>Dans le cadre de l'utilisation du site <strong>${urlSite}</strong>, nous sommes susceptibles de collecter les données personnelles suivantes :</p>
<ul>
  ${donneesCollectees.map((d) => `<li>${DONNEES_LABELS[d]}</li>`).join("\n  ")}
</ul>
<p>Ces données sont collectées directement auprès de vous, lors de votre navigation sur le site, ou lors de vos interactions avec nos services.</p>
<p>Les champs signalés comme obligatoires dans nos formulaires sont nécessaires au traitement de votre demande : sans eux, elle ne pourra pas aboutir.</p>
</section>`);

  // 3. Finalités — avec zone IA si disponible
  const finalitesRows = finalites
    .map(
      (f) =>
        `<tr>
  <td>${FINALITES_DATA[f].label}</td>
  <td>${f === "statistiques" && analyticsAvecCookies ? "Consentement (Art. 6.1.a RGPD)" : FINALITES_DATA[f].base}</td>
  <td>${FINALITES_DATA[f].description}</td>
</tr>`
    )
    .join("\n");

  sections.push(`<section>
<h2>${s()}. Finalités et bases légales du traitement</h2>
${
  finalitesDescription
    ? `<p>${finalitesDescription}</p>`
    : `<p>Vos données personnelles sont traitées pour les finalités suivantes, conformément aux bases légales prévues par le RGPD :</p>`
}
<table>
  <thead>
    <tr>
      <th>Finalité</th>
      <th>Base légale</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    ${finalitesRows}
  </tbody>
</table>
</section>`);

  // 4. Durée de conservation
  sections.push(`<section>
<h2>${s()}. Durée de conservation</h2>
<p>Vos données personnelles sont conservées pour la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées, et au maximum pendant <strong>${dureeConservation}</strong> à compter de la dernière interaction.</p>
<p>Au-delà de ce délai, les données sont supprimées ou anonymisées, sauf obligation légale contraire${finalites.includes("facturation") ? " (par exemple, les pièces comptables et factures sont conservées 10 ans, conformément à l'article L123-22 du Code de commerce)" : ""}.</p>
</section>`);

  // 5. Destinataires — uniquement les prestataires cohérents avec les finalités choisies
  const vend =
    finalites.includes("gestion_commandes") ||
    finalites.includes("facturation") ||
    donneesCollectees.includes("donnees_paiement");
  const destinataires = [
    `<li><strong>Hébergeur du site :</strong> ${nomHebergeur}, pour le stockage et la mise à disposition du site.</li>`,
    finalites.includes("envoi_newsletter") || finalites.includes("support_client")
      ? `<li><strong>Prestataire d'envoi d'emails :</strong> pour l'envoi de nos messages et réponses.</li>`
      : "",
    finalites.includes("statistiques")
      ? `<li><strong>Outil de mesure d'audience :</strong> pour produire nos statistiques de fréquentation.</li>`
      : "",
    vend
      ? `<li><strong>Prestataire de paiement :</strong> vos données bancaires sont traitées directement par notre prestataire de paiement et ne sont pas conservées par nos soins.</li>`
      : "",
    `<li><strong>Autorités :</strong> en cas de réquisition judiciaire ou d'obligation légale.</li>`,
  ].filter(Boolean);

  sections.push(`<section>
<h2>${s()}. Destinataires des données</h2>
<p>Vos données personnelles sont destinées à <strong>${nomEntreprise}</strong>. Elles ne sont transmises qu'aux destinataires suivants, dans la limite de ce qui est nécessaire à leur mission :</p>
<ul>
  ${destinataires.join("\n  ")}
</ul>
<p>Nous ne vendons ni ne louons vos données personnelles.</p>
</section>`);

  // 6. Transferts hors UE (conditionnel)
  if (transfertHorsUE) {
    const pays = paysTransfert && paysTransfert.length > 0
      ? paysTransfert.join(", ")
      : "pays tiers";
    sections.push(`<section>
<h2>${s()}. Transferts de données hors Union Européenne</h2>
<p>Certains de nos prestataires peuvent être établis hors de l'Union Européenne (${pays}). Dans ce cas, nous nous assurons que ces transferts sont encadrés par des garanties appropriées, conformément au chapitre V du RGPD :</p>
<ul>
  <li>Clauses contractuelles types adoptées par la Commission européenne ;</li>
  <li>Décision d'adéquation de la Commission européenne ;</li>
  <li>Ou toute autre garantie appropriée reconnue par la réglementation.</li>
</ul>
<p>Vous pouvez obtenir plus d'informations sur ces garanties en nous contactant à : <a href="mailto:${email}">${email}</a>.</p>
</section>`);
  }

  // Droits des personnes
  sections.push(`<section>
<h2>${s()}. Vos droits</h2>
<p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :</p>
<ul>
  <li><strong>Droit d'accès</strong> — obtenir la confirmation que vos données sont traitées et en obtenir une copie.</li>
  <li><strong>Droit de rectification</strong> — corriger des données inexactes ou incomplètes.</li>
  <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données, sous réserve des obligations légales.</li>
  <li><strong>Droit à la limitation du traitement</strong> — demander la suspension temporaire du traitement de vos données.</li>
  <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible par machine.</li>
  <li><strong>Droit d'opposition</strong> — vous opposer au traitement de vos données dans les cas prévus par le RGPD.</li>
  <li><strong>Droit de retrait du consentement</strong> — retirer votre consentement à tout moment lorsque le traitement est fondé sur celui-ci.</li>
  <li><strong>Directives post-mortem</strong> — définir des directives relatives à la conservation, à l'effacement et à la communication de vos données après votre décès (article 85 de la loi Informatique et Libertés).</li>
</ul>
<p>Pour exercer ces droits, contactez-nous :</p>
<ul>
  <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
  ${telephone ? `<li><strong>Téléphone :</strong> ${telephone}</li>` : ""}
  <li><strong>Courrier :</strong> ${adresse}</li>
</ul>
<p>En cas de réponse insatisfaisante, vous avez le droit d'introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) — <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.</p>
</section>`);

  // Cookies (conditionnel)
  if (cookiesUtilises) {
    const cookiesList =
      typesCookies && typesCookies.length > 0
        ? `<p>Les types de cookies utilisés sur ce site sont :</p>
<ul>
  ${typesCookies.map((c) => `<li>${COOKIES_LABELS[c]}</li>`).join("\n  ")}
</ul>`
        : "";

    sections.push(`<section>
<h2>${s()}. Cookies et traceurs</h2>
<p>Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur notre site.</p>
${cookiesList}
${
  cookiesSoumisConsentement
    ? `<p>Les cookies qui ne sont pas strictement nécessaires au fonctionnement du site ne sont déposés qu'après avoir recueilli votre consentement, via le bandeau affiché lors de votre première visite. Vous pouvez les refuser aussi simplement que les accepter, et retirer votre consentement à tout moment depuis le module de gestion des cookies du site.</p>`
    : `<p>Les cookies utilisés sont strictement nécessaires au fonctionnement du site ou à la mémorisation de vos préférences : ils ne nécessitent pas votre consentement préalable.</p>`
}
<p>Vous pouvez également configurer votre navigateur pour être alerté du dépôt de cookies ou les supprimer.</p>
<p>La durée de vie des cookies déposés sur votre terminal n'excède pas 13 mois, conformément aux recommandations de la CNIL.</p>
</section>`);
  }

  // Sécurité
  sections.push(`<section>
<h2>${s()}. Sécurité des données</h2>
<p><strong>${nomEntreprise}</strong> met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, la destruction, l'altération ou l'accès non autorisé.</p>
</section>`);

  // Modifications
  sections.push(`<section>
<h2>${s()}. Modifications de la présente politique</h2>
<p><strong>${nomEntreprise}</strong> se réserve le droit de modifier la présente politique de confidentialité à tout moment, notamment pour se conformer à toute évolution légale, réglementaire ou technique. La date de mise à jour est indiquée en tête du document. En cas de modification substantielle, une information sera affichée sur le site.</p>
</section>`);

  // Contact
  sections.push(`<section>
<h2>${s()}. Contact</h2>
<p>Pour toute question relative à la présente politique ou à l'exercice de vos droits :</p>
<ul>
  <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
  ${telephone ? `<li><strong>Téléphone :</strong> ${telephone}</li>` : ""}
  <li><strong>Adresse :</strong> ${adresse}</li>
</ul>
</section>`);

  return `<article class="document-legal politique-confidentialite">
<header>
  <h1>Politique de confidentialité</h1>
  <p class="document-date"><em>Dernière mise à jour : ${today()}</em></p>
  <p class="document-intro">La présente politique de confidentialité vous informe de la manière dont nous collectons, utilisons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD – Règlement UE 2016/679) et à la loi Informatique et Libertés.</p>
</header>

${sections.join("\n\n")}

<footer class="document-disclaimer">
  <p><em>Document généré par <strong><a href="https://conformefr.com">ConformeFR</a></strong> — générateur gratuit de documents légaux pour sites web français. Ce document a valeur informative et ne constitue pas un conseil juridique personnalisé. Pour toute situation complexe, consultez un professionnel du droit.</em></p>
</footer>
</article>`;
}
