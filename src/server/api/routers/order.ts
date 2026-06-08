import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { documents, orders } from "@/server/db/schema";
import { getStripe, getPriceForType, getLabelForType } from "@/lib/stripe";

export const orderRouter = createTRPCRouter({
  createOrder: protectedProcedure
    .input(z.object({ documentId: z.string().uuid() }))
    .mutation(async ({ input, ctx }) => {
      const rows = await db
        .select()
        .from(documents)
        .where(eq(documents.id, input.documentId))
        .limit(1);

      const doc = rows[0];
      if (!doc) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Document introuvable." });
      }
      if (doc.status === "paid") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Ce document est déjà débloqué." });
      }

      const docType = doc.type as "mentions_legales" | "politique_confidentialite" | "pack";
      const amount = getPriceForType(docType);
      const label = getLabelForType(docType);
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      const userId = ctx.session.user.id;

      const session = await getStripe().checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              unit_amount: amount,
              product_data: {
                name: `ConformeFR — ${label}`,
                description: "Document légal généré sur mesure, téléchargeable à vie en PDF et HTML.",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          documentId: doc.id,
          documentType: doc.type,
          userId,
        },
        customer_email: ctx.session.user.email,
        success_url: `${appUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/apercu/${doc.id}?canceled=1`,
        locale: "fr",
      });

      if (!session.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Impossible de créer la session de paiement.",
        });
      }

      await db.insert(orders).values({
        documentIds: [doc.id],
        stripeSessionId: session.id,
        amount,
        status: "pending",
        userId,
      });

      return { checkoutUrl: session.url };
    }),
});
