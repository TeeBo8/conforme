import type { Registre } from "./entites";

export type SiteType = "vitrine" | "ecommerce" | "blog" | "saas";
export type DocumentType = "mentions_legales" | "politique_confidentialite" | "pack";

export interface BaseVars {
  /** Dénomination sociale, ou nom et prénom pour une personne physique */
  nomEntreprise: string;
  formeJuridique: string;
  siret?: string;
  adresse: string;
  email: string;
  telephone?: string;
  urlSite: string;
  nomHebergeur: string;
  adresseHebergeur: string;
  urlHebergeur?: string;
  telephoneHebergeur?: string;
  siteType: SiteType;
}

export interface MentionsLegalesVars extends BaseVars {
  directeurPublication: string;
  nomCommercial?: string;
  capitalSocial?: string;
  registre?: Registre;
  rcsVille?: string;
  tvaIntracom?: string;
  /** E-commerce : médiateur de la consommation (art. L616-1 C. conso) */
  mediateurNom?: string;
  mediateurUrl?: string;
  cgvUrl?: string;
}

export type DonneeCollectee =
  | "email"
  | "nom_prenom"
  | "telephone"
  | "adresse_postale"
  | "donnees_paiement"
  | "donnees_compte"
  | "donnees_navigation"
  | "logs_techniques"
  | "adresse_ip"
  | "cookies";

export type Finalite =
  | "gestion_commandes"
  | "envoi_newsletter"
  | "support_client"
  | "statistiques"
  | "personnalisation"
  | "facturation"
  | "compte_utilisateur"
  | "securite";

export type TypeCookie = "analytics" | "fonctionnels" | "publicitaires" | "tiers";

export interface PolitiqueConfVars extends BaseVars {
  donneesCollectees: DonneeCollectee[];
  finalites: Finalite[];
  /** Zone IA — explication des finalités en langage clair */
  finalitesDescription?: string;
  cookiesUtilises: boolean;
  typesCookies?: TypeCookie[];
  dureeConservation: string;
  transfertHorsUE: boolean;
  paysTransfert?: string[];
  dpoContact?: string;
}
