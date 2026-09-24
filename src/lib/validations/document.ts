import { z } from "zod";
import type { DocumentType, SiteType, DonneeCollectee, Finalite, TypeCookie } from "@/lib/templates/types";
import type { Registre } from "@/lib/templates/entites";

const DONNEES_VALUES = [
  "email", "nom_prenom", "telephone", "adresse_postale",
  "donnees_paiement", "donnees_compte", "donnees_navigation",
  "logs_techniques", "adresse_ip", "cookies",
] as const;

const FINALITES_VALUES = [
  "gestion_commandes", "envoi_newsletter", "support_client",
  "statistiques", "personnalisation", "facturation",
  "compte_utilisateur", "securite",
] as const;

const COOKIES_VALUES = ["analytics", "fonctionnels", "publicitaires", "tiers"] as const;

export const documentTypeSchema = z.object({
  documentType: z.enum(["mentions_legales", "politique_confidentialite", "pack"]),
});

export const siteTypeSchema = z.object({
  siteType: z.enum(["vitrine", "ecommerce", "blog", "saas"]),
});

export const entrepriseSchema = z.object({
  nomEntreprise: z.string().min(1, "Requis"),
  formeJuridique: z.string().min(1, "Requis"),
  capitalSocial: z.string().optional(),
  siret: z.string().optional(),
  rcsVille: z.string().optional(),
  adresse: z.string().min(1, "Requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  urlSite: z.string().min(1, "Requis"),
  directeurPublication: z.string().optional(),
  nomHebergeur: z.string().min(1, "Requis"),
  adresseHebergeur: z.string().min(1, "Requis"),
  urlHebergeur: z.string().optional(),
});

export const donneesSchema = z.object({
  donneesCollectees: z.array(z.enum(DONNEES_VALUES)).min(1, "Sélectionnez au moins une donnée collectée"),
  finalites: z.array(z.enum(FINALITES_VALUES)).min(1, "Sélectionnez au moins une finalité"),
  cookiesUtilises: z.boolean(),
  typesCookies: z.array(z.enum(COOKIES_VALUES)).optional(),
  dureeConservation: z.string().min(1, "Requis"),
  transfertHorsUE: z.boolean(),
  paysTransfert: z.string().optional(),
});

export interface DocumentFormData {
  documentType: DocumentType;
  siteType: SiteType;
  nomEntreprise: string;
  formeJuridique: string;
  capitalSocial?: string;
  siret?: string;
  rcsVille?: string;
  adresse: string;
  email: string;
  telephone?: string;
  urlSite: string;
  directeurPublication?: string;
  nomHebergeur: string;
  adresseHebergeur: string;
  urlHebergeur?: string;
  telephoneHebergeur?: string;
  nomCommercial?: string;
  activiteDescription?: string;
  registre?: Registre;
  tvaIntracom?: string;
  mediateurNom?: string;
  mediateurUrl?: string;
  cgvUrl?: string;
  dpoContact?: string;
  donneesCollectees?: DonneeCollectee[];
  finalites?: Finalite[];
  cookiesUtilises?: boolean;
  typesCookies?: TypeCookie[];
  dureeConservation?: string;
  transfertHorsUE?: boolean;
  paysTransfert?: string;
}
