import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { eq } from "drizzle-orm";
import { getStripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { documents, orders } from "@/server/db/schema";
import { sendDocumentUnlocked } from "@/lib/resend";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", msg);
    return NextResponse.json({ error: `Webhook Error: ${msg}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const documentId = session.metadata?.documentId;
    const userId = session.metadata?.userId;
    const customerEmail = session.customer_details?.email ?? session.customer_email;

    if (!documentId) {
      console.error("No documentId in session metadata");
      return NextResponse.json({ received: true });
    }

    // Idempotence : la page /succes a pu confirmer avant le webhook —
    // on ne renvoie pas un second email
    const [existing] = await db
      .select({ status: documents.status })
      .from(documents)
      .where(eq(documents.id, documentId))
      .limit(1);

    if (existing?.status === "paid") {
      return NextResponse.json({ received: true });
    }

    await db
      .update(orders)
      .set({ status: "paid" })
      .where(eq(orders.stripeSessionId, session.id));

    await db
      .update(documents)
      .set({
        status: "paid",
        userId: userId ?? null,
        updatedAt: new Date(),
      })
      .where(eq(documents.id, documentId));

    if (customerEmail) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      await sendDocumentUnlocked({
        to: customerEmail,
        downloadUrl: `${appUrl}/api/download/${documentId}`,
      }).catch((err) => console.error("Failed to send email:", err));
    }
  }

  return NextResponse.json({ received: true });
}
