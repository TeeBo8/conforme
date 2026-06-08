export type SiteType = "vitrine" | "ecommerce" | "blog" | "saas";
export type DocumentType = "mentions_legales" | "politique_confidentialite" | "pack";

export interface BaseVars {
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
  siteType: SiteType;
}

export interface MentionsLegalesVars extends BaseVars {
  directeurPublication: string;
  capitalSocial?: string;
  rcsVille?: string;
  /** Zone IA Phase 5 — description reformulée de l'activité */
  activiteDescription?: string;
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
  /** Zone IA Phase 5 — description des finalités en langage clair */
  finalitesDescription?: string;
  cookiesUtilises: boolean;
  typesCookies?: TypeCookie[];
  dureeConservation: string;
  transfertHorsUE: boolean;
  paysTransfert?: string[];
}
