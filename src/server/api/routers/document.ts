import { z } from "zod";
import { TRPCError } from "@trpc/server";
import Anthropic from "@anthropic-ai/sdk";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
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
  donneesCollectees: z.array(z.enum(DONNEES_VALUES)).optional(),
  finalites: z.array(z.enum(FINALITES_VALUES)).optional(),
  cookiesUtilises: z.boolean().optional(),
  typesCookies: z.array(z.enum(COOKIES_VALUES)).optional(),
  dureeConservation: z.string().optional(),
  transfertHorsUE: z.boolean().optional(),
  paysTransfert: z.string().optional(),
});

async function callAI(prompt: string): Promise<string | undefined> {
  if (!process.env.ANTHROPIC_API_KEY) return undefined;
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 256,
      messages: [{ role: "user", content: prompt }],
    });
    const block = msg.content[0];
    return block?.type === "text" ? block.text.trim() : undefined;
  } catch {
    return undefined;
  }
}

export const documentRouter = createTRPCRouter({
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
        siteType: input.siteType,
      };

      const buildML = async () => {
        const activiteDescription = await callAI(
          `En 2-3 phrases maximum, décris l'activité d'un site de type "${input.siteType}" exploité par "${input.nomEntreprise}" (${input.formeJuridique}) à l'adresse ${input.urlSite}, en langage clair et professionnel pour des mentions légales. Ne fournis QUE la description, sans introduction ni conclusion.`
        );
        return buildMentionsLegales({
          ...baseVars,
          directeurPublication: input.directeurPublication ?? input.nomEntreprise,
          capitalSocial: input.capitalSocial,
          rcsVille: input.rcsVille,
          activiteDescription,
        });
      };

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
