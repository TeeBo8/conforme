import { HEBERGEURS } from "@/lib/templates/entites";
import type { DonneeCollectee, Finalite, TypeCookie } from "@/lib/templates/types";
import type { AnalyseSite } from "./analyse";

/** Ce que le scan propose de pré-remplir. Tout est modifiable par l'utilisateur. */
export interface SuggestionsScan {
  urlSite: string;
  email?: string;
  telephone?: string;
  siret?: string;
  hebergeur?: { nom: string; adresse?: string; url?: string; telephone?: string };
  activite?: string;
  donneesCollectees: DonneeCollectee[];
  finalites: Finalite[];
  cookiesUtilises: boolean;
  typesCookies: TypeCookie[];
  transfertHorsUE: boolean;
  paysTransfert?: string;
  /** Services reconnus, affichés à l'utilisateur pour qu'il comprenne d'où viennent les suggestions */
  services: string[];
  alertes: string[];
}

function formaterTelephone(t: string): string {
  const d = t.replace(/^\+33/, "0").replace(/\D/g, "");
  return d.length === 10 ? d.replace(/(\d{2})(?=\d)/g, "$1 ") : t;
}

export function construireSuggestions(analyse: AnalyseSite, finalUrl: string, activite?: string): SuggestionsScan {
  const cat = (c: string) => analyse.services.filter((s) => s.categorie === c);
  const audience = cat("mesure_audience");
  const pub = cat("publicite");
  const tiers = cat("contenu_tiers");
  const paiement = cat("paiement");
  const bandeau = cat("bandeau_cookies");

  const donnees = new Set<DonneeCollectee>();
  const finalites = new Set<Finalite>();
  if (analyse.formulaire) {
    donnees.add("email");
    donnees.add("nom_prenom");
    finalites.add("support_client");
  }
  if (audience.length || pub.length) {
    donnees.add("donnees_navigation");
    donnees.add("adresse_ip");
  }
  if (audience.length) finalites.add("statistiques");
  if (paiement.length) {
    donnees.add("donnees_paiement");
    finalites.add("gestion_commandes");
    finalites.add("facturation");
  }

  const typesCookies = new Set<TypeCookie>();
  if (audience.some((s) => s.consentement)) typesCookies.add("analytics");
  if (pub.length) typesCookies.add("publicitaires");
  if (tiers.length) typesCookies.add("tiers");
  if (typesCookies.size) donnees.add("cookies");

  const connu = analyse.hebergeur
    ? HEBERGEURS.find((h) => h.nom === analyse.hebergeur)
    : undefined;
  const hebergeur = analyse.hebergeur
    ? connu
      ? { nom: connu.nom, adresse: connu.adresse, url: connu.url, telephone: connu.telephone }
      : { nom: analyse.hebergeur }
    : undefined;

  const horsUE = analyse.services.some((s) => s.horsUE) || Boolean(connu?.horsUE);

  const alertes: string[] = [];
  if (analyse.services.some((s) => s.consentement) && bandeau.length === 0) {
    alertes.push(
      "Des services qui déposent des cookies soumis au consentement ont été détectés, mais aucun bandeau de consentement connu : la CNIL exige de recueillir le consentement avant leur dépôt."
    );
  }

  return {
    urlSite: new URL(finalUrl).origin,
    email: analyse.emails[0],
    telephone: analyse.telephones[0] ? formaterTelephone(analyse.telephones[0]) : undefined,
    siret: analyse.siret,
    hebergeur,
    activite,
    donneesCollectees: [...donnees],
    finalites: [...finalites],
    cookiesUtilises: typesCookies.size > 0,
    typesCookies: [...typesCookies],
    transfertHorsUE: horsUE,
    paysTransfert: horsUE ? "États-Unis" : undefined,
    services: analyse.services.map((s) => s.nom),
    alertes,
  };
}
