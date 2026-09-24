// Règles partagées entre le formulaire et les modèles de documents.

export const FORMES_JURIDIQUES = [
  "Auto-entrepreneur / Micro-entreprise",
  "Entreprise individuelle (EI)",
  "EURL",
  "SARL",
  "SAS",
  "SASU",
  "SA",
  "Association (loi 1901)",
  "Particulier",
] as const;

const FORMES_EI = ["Auto-entrepreneur / Micro-entreprise", "Entreprise individuelle (EI)"];
const FORMES_AVEC_CAPITAL = ["EURL", "SARL", "SAS", "SASU", "SA"];

/** Entrepreneur individuel (micro ou EI) : mention « EI » obligatoire (art. R526-27 C. com.). */
export const isEntrepreneurIndividuel = (forme: string) => FORMES_EI.includes(forme);

/** Personne physique au sens de l'art. 1-1, I, 1° LCEN : nom, prénoms, domicile. */
export const isPersonnePhysique = (forme: string) =>
  isEntrepreneurIndividuel(forme) || forme === "Particulier";

export const isSocieteAvecCapital = (forme: string) =>
  FORMES_AVEC_CAPITAL.some((f) => forme.includes(f));

export type Registre = "rcs" | "rne" | "aucun";

/** SIRET : 14 chiffres, espaces tolérés. */
export function normaliserSiret(siret: string): string {
  return siret.replace(/\s+/g, "");
}

export const isSiretValide = (siret: string) => /^\d{14}$/.test(normaliserSiret(siret));

export interface HebergeurConnu {
  nom: string;
  adresse: string;
  url: string;
  /** Uniquement un numéro publié par l'hébergeur lui-même. */
  telephone?: string;
  /** Établi hors de l'Union européenne : transfert de données à déclarer. */
  horsUE: boolean;
}

export const HEBERGEURS: HebergeurConnu[] = [
  { nom: "Vercel Inc.", adresse: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis", url: "https://vercel.com", horsUE: true },
  { nom: "OVH SAS", adresse: "2 rue Kellermann, 59100 Roubaix, France", url: "https://www.ovhcloud.com", horsUE: false },
  { nom: "o2switch", adresse: "222-224 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France", url: "https://www.o2switch.fr", horsUE: false },
  { nom: "Netlify", adresse: "44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis", url: "https://www.netlify.com", horsUE: true },
  { nom: "IONOS SARL", adresse: "7 place de la Gare, BP 70109, 57200 Sarreguemines Cedex, France", url: "https://www.ionos.fr", telephone: "0970 808 911", horsUE: false },
  { nom: "Scaleway", adresse: "8 rue de la Ville l'Évêque, 75008 Paris, France", url: "https://www.scaleway.com", horsUE: false },
  { nom: "Infomaniak", adresse: "Rue Eugène-Marziano 25, 1227 Genève, Suisse", url: "https://www.infomaniak.com", horsUE: true },
  { nom: "Cloudflare", adresse: "101 Townsend St, San Francisco, CA 94107, États-Unis", url: "https://www.cloudflare.com", horsUE: true },
  { nom: "AWS (Amazon)", adresse: "410 Terry Ave N, Seattle, WA 98109, États-Unis", url: "https://aws.amazon.com", horsUE: true },
];

/** L'hébergeur saisi correspond-il à un hébergeur connu établi hors UE ? */
export function hebergeurHorsUE(nomHebergeur: string | undefined): boolean {
  if (!nomHebergeur) return false;
  const nom = nomHebergeur.toLowerCase();
  return HEBERGEURS.some((h) => h.horsUE && nom.includes(h.nom.toLowerCase().split(/[\s(]/)[0]!));
}
