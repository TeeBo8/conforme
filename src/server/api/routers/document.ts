import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { headers } from "next/headers";
import { callClaude, toPlainText } from "@/server/ai/claude";
import { fetchPublicPage, ScanError } from "@/server/scan/fetch-public";
import { analyserPage } from "@/server/scan/analyse";
import { proposerActivite } from "@/server/scan/activite";
import { construireSuggestions } from "@/server/scan/suggestions";
import { autoriserScan } from "@/server/scan/rate-limit";
import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import { buildMentionsLegales } from "@/lib/templates/mentions-legales";
import { buildPolitiqueConf } from "@/lib/templates/politique-conf";
import type { DonneeCollectee, Finalite, TypeCookie } from "@/lib/templates/types";

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

const generateDocumentInput = z.object({
  documentType: z.enum(["mentions_legales", "politique_confidentialite", "pack"]),
  siteType: z.enum(["vitrine", "ecommerce", "blog", "saas"]),
  nomEntreprise: z.string().min(1),
  formeJuridique: z.string().min(1),
  capitalSocial: z.string().optional(),
  siret: z.string().optional(),
  rcsVille: z.string().optional(),
  adresse: z.string().min(1),
  email: z.string().email(),
  telephone: z.string().optional(),
  urlSite: z.string().min(1),
  directeurPublication: z.string().optional(),
  nomHebergeur: z.string().min(1),
  adresseHebergeur: z.string().min(1),
  urlHebergeur: z.string().optional(),
  telephoneHebergeur: z.string().optional(),
  nomCommercial: z.string().optional(),
  activiteDescription: z.string().max(600).optional(),
  registre: z.enum(["rcs", "rne", "aucun"]).optional(),
  tvaIntracom: z.string().optional(),
  mediateurNom: z.string().optional(),
  mediateurUrl: z.string().optional(),
  cgvUrl: z.string().optional(),
  dpoContact: z.string().optional(),
  donneesCollectees: z.array(z.enum(DONNEES_VALUES)).optional(),
  finalites: z.array(z.enum(FINALITES_VALUES)).optional(),
  cookiesUtilises: z.boolean().optional(),
  typesCookies: z.array(z.enum(COOKIES_VALUES)).optional(),
  dureeConservation: z.string().optional(),
  transfertHorsUE: z.boolean().optional(),
  paysTransfert: z.string().optional(),
});

const callAI = async (prompt: string) =>
  toPlainText(await callClaude(prompt, { label: "generateDocument" }));

export const documentRouter = createTRPCRouter({
  /**
   * Analyse la page d'accueil publique d'un site pour pré-remplir le formulaire.
   * Le HTML n'est jamais renvoyé au navigateur : seules les suggestions le sont.
   */
  scanSite: publicProcedure
    .input(z.object({ url: z.string().min(1).max(500) }))
    .mutation(async ({ input }) => {
      const hdrs = await headers();
      const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? hdrs.get("x-real-ip") ?? "inconnue";
      if (!autoriserScan(ip)) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Trop d'analyses en peu de temps : réessayez dans quelques minutes.",
        });
      }

      const url = /^https?:\/\//i.test(input.url.trim()) ? input.url.trim() : `https://${input.url.trim()}`;
      try {
        const page = await fetchPublicPage(url);
        const analyse = analyserPage(page.html, page.headers);
        const activite = await proposerActivite(analyse);
        return construireSuggestions(analyse, page.finalUrl, activite);
      } catch (err) {
        if (err instanceof ScanError) {
          throw new TRPCError({ code: "BAD_REQUEST", message: err.message });
        }
        console.error("[scanSite] erreur inattendue :", err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "L'analyse a échoué." });
      }
    }),

  generateDocument: publicProcedure
    .input(generateDocumentInput)
    .mutation(async ({ input }) => {
      const baseVars = {
        nomEntreprise: input.nomEntreprise,
        formeJuridique: input.formeJuridique,
        siret: input.siret,
        adresse: input.adresse,
        email: input.email,
        telephone: input.telephone,
        urlSite: input.urlSite,
        nomHebergeur: input.nomHebergeur,
        adresseHebergeur: input.adresseHebergeur,
        urlHebergeur: input.urlHebergeur,
        telephoneHebergeur: input.telephoneHebergeur,
        siteType: input.siteType,
      };

      // Pas de description d'activité générée : l'IA n'a que le nom de l'entreprise
      // et inventait l'activité. Elle reviendra à partir du contenu réel du site.
      const buildML = async () =>
        buildMentionsLegales({
          ...baseVars,
          directeurPublication: input.directeurPublication ?? input.nomEntreprise,
          capitalSocial: input.capitalSocial,
          registre: input.registre,
          rcsVille: input.rcsVille,
          nomCommercial: input.nomCommercial,
          activiteDescription: input.activiteDescription,
          tvaIntracom: input.tvaIntracom,
          mediateurNom: input.mediateurNom,
          mediateurUrl: input.mediateurUrl,
          cgvUrl: input.cgvUrl,
        });

      const buildPC = async () => {
        const donneesCollectees = (input.donneesCollectees ?? []) as DonneeCollectee[];
        const finalites = (input.finalites ?? []) as Finalite[];
        const typesCookies = (input.typesCookies ?? []) as TypeCookie[];

        const finalitesDescription =
          finalites.length > 0
            ? await callAI(
                `En 2-3 phrases maximum, explique en langage clair et accessible (sans jargon juridique) pourquoi le site "${input.nomEntreprise}" (${input.siteType}) traite les données de ses utilisateurs pour : ${finalites.join(", ")}. Ne fournis QUE ce paragraphe, sans introduction ni conclusion.`
              )
            : undefined;

        return buildPolitiqueConf({
          ...baseVars,
          donneesCollectees,
          finalites,
          finalitesDescription,
          cookiesUtilises: input.cookiesUtilises ?? false,
          typesCookies,
          dureeConservation: input.dureeConservation ?? "3 ans",
          transfertHorsUE: input.transfertHorsUE ?? false,
          paysTransfert: input.paysTransfert ? [input.paysTransfert] : undefined,
          dpoContact: input.dpoContact,
        });
      };

      let generatedContent: string;
      if (input.documentType === "mentions_legales") {
        generatedContent = await buildML();
      } else if (input.documentType === "politique_confidentialite") {
        generatedContent = await buildPC();
      } else {
        const [ml, pc] = await Promise.all([buildML(), buildPC()]);
        generatedContent = `${ml}\n\n<hr class="document-separator" />\n\n${pc}`;
      }

      const rows = await db
        .insert(documents)
        .values({
          type: input.documentType,
          siteType: input.siteType,
          inputs: input as unknown as Record<string, unknown>,
          generatedContent,
          status: "preview",
        })
        .returning({ id: documents.id });

      const doc = rows[0];
      if (!doc) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erreur lors de la sauvegarde du document.",
        });
      }

      return { documentId: doc.id, previewContent: generatedContent };
    }),
});
