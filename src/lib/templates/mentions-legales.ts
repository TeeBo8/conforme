import type { MentionsLegalesVars } from "./types";

function today(): string {
  return new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
    urlHebergeur,
    directeurPublication,
    capitalSocial,
    rcsVille,
    activiteDescription,
  } = vars;

  let n = 0;
  const s = () => String(++n);

  const sections: string[] = [];

  // 1. Éditeur
  sections.push(`<section>
<h2>${s()}. Éditeur du site</h2>
<p>Le site <strong>${urlSite}</strong> est édité par :</p>
<ul>
  <li><strong>Dénomination :</strong> ${nomEntreprise}</li>
  <li><strong>Forme juridique :</strong> ${formeJuridique}</li>
  ${capitalSocial ? `<li><strong>Capital social :</strong> ${capitalSocial} €</li>` : ""}
  <li><strong>Siège social :</strong> ${adresse}</li>
  ${siret ? `<li><strong>SIRET :</strong> ${siret}</li>` : ""}
  ${rcsVille ? `<li><strong>Immatriculation :</strong> RCS ${rcsVille}</li>` : ""}
  <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
  ${telephone ? `<li><strong>Téléphone :</strong> ${telephone}</li>` : ""}
</ul>
<p><strong>Directeur de la publication :</strong> ${directeurPublication}</p>
</section>`);

  // 2. Hébergeur
  sections.push(`<section>
<h2>${s()}. Hébergeur</h2>
<p>Le site est hébergé par :</p>
<ul>
  <li><strong>Raison sociale :</strong> ${nomHebergeur}</li>
  <li><strong>Adresse :</strong> ${adresseHebergeur}</li>
  ${urlHebergeur ? `<li><strong>Site web :</strong> <a href="${urlHebergeur}" target="_blank" rel="noopener noreferrer">${urlHebergeur}</a></li>` : ""}
</ul>
</section>`);

  // 3. Activité (zone IA — optionnelle)
  if (activiteDescription) {
    sections.push(`<section>
<h2>${s()}. Activité</h2>
<p>${activiteDescription}</p>
</section>`);
  }

  // Propriété intellectuelle
  sections.push(`<section>
<h2>${s()}. Propriété intellectuelle</h2>
<p>L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) est protégé par le droit d'auteur conformément aux dispositions du Code de la propriété intellectuelle. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de <strong>${nomEntreprise}</strong>.</p>
<p>Toute exploitation non autorisée du site ou de son contenu sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.</p>
</section>`);

  // Données personnelles
  sections.push(`<section>
<h2>${s()}. Données personnelles et vie privée</h2>
<p>La collecte et le traitement de vos données personnelles sont conformes au Règlement Général sur la Protection des Données (RGPD – Règlement UE 2016/679) et à la loi Informatique et Libertés modifiée.</p>
<p>Pour en savoir plus sur la façon dont <strong>${nomEntreprise}</strong> collecte et traite vos données personnelles, consultez notre <strong>Politique de confidentialité</strong>.</p>
<p>Pour exercer vos droits (accès, rectification, effacement, opposition, portabilité, limitation), contactez-nous à : <a href="mailto:${email}">${email}</a>.</p>
</section>`);

  // Cookies
  sections.push(`<section>
<h2>${s()}. Cookies</h2>
<p>Ce site est susceptible d'utiliser des cookies pour améliorer votre expérience de navigation et réaliser des statistiques d'audience. Pour plus d'informations sur les cookies utilisés et la manière de les paramétrer, consultez notre Politique de confidentialité.</p>
</section>`);

  // Limitation de responsabilité
  sections.push(`<section>
<h2>${s()}. Limitation de responsabilité</h2>
<p><strong>${nomEntreprise}</strong> s'efforce de fournir des informations aussi précises que possible sur ce site. Toutefois, il ne pourra être tenu responsable des omissions, inexactitudes et carences dans la mise à jour des informations diffusées, qu'elles soient de son fait ou du fait des tiers partenaires.</p>
<p>Toutes les informations proposées sur ce site sont données à titre indicatif, sont non exhaustives et sont susceptibles d'évoluer. <strong>${nomEntreprise}</strong> se réserve le droit de les modifier à tout moment sans préavis.</p>
<p><strong>${nomEntreprise}</strong> ne pourra être tenu responsable des dommages directs et indirects causés lors de l'accès au site et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications requises, soit d'un bug ou d'une incompatibilité.</p>
</section>`);

  // Liens hypertextes
  sections.push(`<section>
<h2>${s()}. Liens hypertextes</h2>
<p>Le site peut contenir des liens vers d'autres sites internet. Ces liens sont fournis uniquement à titre d'information. <strong>${nomEntreprise}</strong> n'a aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité à leur égard.</p>
</section>`);

  // Droit applicable
  sections.push(`<section>
<h2>${s()}. Droit applicable et juridiction</h2>
<p>Les présentes mentions légales sont régies par le droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.</p>
</section>`);

  // Contact
  sections.push(`<section>
<h2>${s()}. Contact</h2>
<p>Pour toute question relative au site ou aux présentes mentions légales :</p>
<ul>
  <li><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
  ${telephone ? `<li><strong>Téléphone :</strong> ${telephone}</li>` : ""}
  <li><strong>Adresse :</strong> ${adresse}</li>
</ul>
</section>`);

  return `<article class="document-legal mentions-legales">
<header>
  <h1>Mentions légales</h1>
  <p class="document-date"><em>Dernière mise à jour : ${today()}</em></p>
</header>

${sections.join("\n\n")}

<footer class="document-disclaimer">
  <p><em>Document généré par <strong><a href="https://conformefr.com">ConformeFR</a></strong> — générateur de documents légaux pour sites web français. Ce document a valeur informative et ne constitue pas un conseil juridique personnalisé. Pour toute situation complexe, consultez un professionnel du droit.</em></p>
</footer>
</article>`;
}
