import type { MentionsLegalesVars } from "./types";
import { escapeHtml, escapeVars, safeHttpUrl } from "./escape";
import {
  isEntrepreneurIndividuel,
  isPersonnePhysique,
  isSocieteAvecCapital,
  normaliserSiret,
} from "./entites";

function today(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const li = (label: string, value: string | undefined) =>
  value ? `<li><strong>${label} :</strong> ${value}</li>` : "";

function lien(url: string | undefined, texte?: string): string {
  const href = safeHttpUrl(url);
  if (!href) return "";
  const h = escapeHtml(href);
  return `<a href="${h}" target="_blank" rel="noopener noreferrer">${texte ?? h}</a>`;
}

/** Numéro d'inscription au registre (art. 1-1, I LCEN) : SIREN = 9 premiers chiffres du SIRET. */
function immatriculation(vars: MentionsLegalesVars, rcsVille?: string): string | undefined {
  const siren = vars.siret ? escapeHtml(normaliserSiret(vars.siret).slice(0, 9)) : undefined;
  if (vars.registre === "rcs") {
    return [`RCS ${rcsVille ?? ""}`.trim(), siren].filter(Boolean).join(" ");
  }
  if (vars.registre === "rne") {
    return `Registre national des entreprises${siren ? ` — SIREN ${siren}` : ""}`;
  }
  return undefined;
}

export function buildMentionsLegales(vars: MentionsLegalesVars): string {
  const {
    nomEntreprise,
    formeJuridique,
    siret,
    adresse,
    email,
    telephone,
    urlSite,
    nomHebergeur,
    adresseHebergeur,
    telephoneHebergeur,
    directeurPublication,
    nomCommercial,
    capitalSocial,
    rcsVille,
    tvaIntracom,
    mediateurNom,
    siteType,
    activiteDescription,
  } = escapeVars(vars);

  const physique = isPersonnePhysique(vars.formeJuridique);
  const ei = isEntrepreneurIndividuel(vars.formeJuridique);
  // Art. R526-27 C. com. : nom de l'entrepreneur individuel suivi de « EI »
  const nomAffiche =
    ei && !/\b(EI|entrepreneur individuel)\b/i.test(vars.nomEntreprise)
      ? `${nomEntreprise} EI`
      : nomEntreprise;
  const statut = ei
    ? vars.formeJuridique.startsWith("Auto")
      ? "Entrepreneur individuel (EI), régime de la micro-entreprise"
      : "Entrepreneur individuel (EI)"
    : formeJuridique;

  let n = 0;
  const s = () => String(++n);
  const sections: string[] = [];

  // Éditeur — art. 1-1, I, 1° (personne physique) ou 2° (personne morale) LCEN
  sections.push(`<section>
<h2>${s()}. Éditeur du site</h2>
<p>Le site <strong>${urlSite}</strong> est édité par :</p>
<ul>
  ${li(physique ? "Nom et prénom" : "Dénomination", nomAffiche)}
  ${li("Nom commercial", nomCommercial)}
  ${li(physique ? "Statut" : "Forme juridique", statut)}
  ${isSocieteAvecCapital(vars.formeJuridique) && capitalSocial ? li("Capital social", `${capitalSocial} €`) : ""}
  ${li(physique ? "Adresse" : "Siège social", adresse)}
  ${li("Téléphone", telephone)}
  ${li("Email", `<a href="mailto:${email}">${email}</a>`)}
  ${li("SIRET", siret ? escapeHtml(normaliserSiret(vars.siret ?? "")) : undefined)}
  ${li("Immatriculation", immatriculation(vars, rcsVille))}
  ${li("N° de TVA intracommunautaire", tvaIntracom)}
</ul>
<p><strong>Directeur de la publication :</strong> ${directeurPublication}</p>
</section>`);

  // Hébergeur — art. 1-1, I, 4° LCEN
  sections.push(`<section>
<h2>${s()}. Hébergeur</h2>
<p>Le site est hébergé par :</p>
<ul>
  ${li("Raison sociale", nomHebergeur)}
  ${li("Adresse", adresseHebergeur)}
  ${li("Téléphone", telephoneHebergeur)}
  ${li("Site web", lien(vars.urlHebergeur))}
</ul>
</section>`);

  // Activité — rubrique facultative, rédigée ou validée par l'utilisateur
  if (activiteDescription) {
    sections.push(`<section>
<h2>${s()}. Activité</h2>
<p>${activiteDescription}</p>
</section>`);
  }

  // Vente en ligne — art. 19 LCEN et L616-1 C. conso
  if (siteType === "ecommerce" && (mediateurNom || vars.cgvUrl)) {
    sections.push(`<section>
<h2>${s()}. Vente en ligne</h2>
${vars.cgvUrl ? `<p>Les conditions générales de vente applicables aux commandes passées sur ce site sont consultables ici : ${lien(vars.cgvUrl)}.</p>` : ""}
${
  mediateurNom
    ? `<p>Conformément à l'article L616-1 du Code de la consommation, en cas de litige non résolu par une réclamation préalable auprès de nos services, le consommateur peut recourir gratuitement au médiateur de la consommation suivant : <strong>${mediateurNom}</strong>${vars.mediateurUrl ? ` — ${lien(vars.mediateurUrl)}` : ""}.</p>`
    : ""
}
</section>`);
  }

  // Propriété intellectuelle
  sections.push(`<section>
<h2>${s()}. Propriété intellectuelle</h2>
<p>L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) est protégé par le droit d'auteur conformément aux dispositions du Code de la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de <strong>${nomAffiche}</strong>.</p>
<p>Toute exploitation non autorisée du site ou de son contenu pourra être poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
</section>`);

  // Données personnelles et cookies
  sections.push(`<section>
<h2>${s()}. Données personnelles et cookies</h2>
<p>Les traitements de données personnelles réalisés sur ce site relèvent du Règlement général sur la protection des données (RGPD – Règlement UE 2016/679) et de la loi Informatique et Libertés. Leur description, ainsi que l'usage éventuel de cookies, figurent dans la politique de confidentialité du site.</p>
<p>Pour exercer vos droits (accès, rectification, effacement, opposition, portabilité, limitation), écrivez à : <a href="mailto:${email}">${email}</a>.</p>
</section>`);

  // Limitation de responsabilité
  sections.push(`<section>
<h2>${s()}. Limitation de responsabilité</h2>
<p><strong>${nomAffiche}</strong> s'efforce de fournir des informations aussi précises que possible sur ce site. Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes et carences dans la mise à jour des informations diffusées, qu'elles soient de son fait ou du fait des tiers partenaires.</p>
<p>Les informations proposées sur ce site sont données à titre indicatif et sont susceptibles d'évoluer.</p>
</section>`);

  // Liens hypertextes
  sections.push(`<section>
<h2>${s()}. Liens hypertextes</h2>
<p>Le site peut contenir des liens vers d'autres sites internet. <strong>${nomAffiche}</strong> n'a aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité à leur égard.</p>
</section>`);

  // Droit applicable
  sections.push(`<section>
<h2>${s()}. Droit applicable</h2>
<p>Les présentes mentions légales sont régies par le droit français.</p>
</section>`);

  return `<article class="document-legal mentions-legales">
<header>
  <h1>Mentions légales</h1>
  <p class="document-date"><em>Dernière mise à jour : ${today()}</em></p>
</header>

${sections.join("\n\n")}

<footer class="document-disclaimer">
  <p><em>Document généré par <strong><a href="https://conformefr.com">ConformeFR</a></strong> — générateur gratuit de documents légaux pour sites web français. Ce document a valeur informative et ne constitue pas un conseil juridique personnalisé. Pour toute situation complexe, consultez un professionnel du droit.</em></p>
</footer>
</article>`;
}
