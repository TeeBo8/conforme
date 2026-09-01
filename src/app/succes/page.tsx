import Link from "next/link";
import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { getStripe } from "@/lib/stripe";
import { db } from "@/server/db";
import { documents, orders } from "@/server/db/schema";
import { sendDocumentUnlocked } from "@/lib/resend";
import { TrackPurchase } from "./TrackPurchase";

export const metadata: Metadata = {
  title: "Paiement confirmé — ConformeFR",
  robots: "noindex",
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

async function confirmPayment(sessionId: string): Promise<{ documentType: string } | null> {
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;

    const documentId = session.metadata?.documentId;
    const userId = session.metadata?.userId;
    const customerEmail = session.customer_details?.email ?? session.customer_email;

    if (!documentId) return null;

    const [existing] = await db
      .select({ status: documents.status, type: documents.type })
      .from(documents)
      .where(eq(documents.id, documentId))
      .limit(1);

    if (!existing) return null;
    if (existing.status === "paid") return { documentType: existing.type };

    await db
      .update(orders)
      .set({ status: "paid" })
      .where(eq(orders.stripeSessionId, sessionId));

    await db
      .update(documents)
      .set({ status: "paid", userId: userId ?? null, updatedAt: new Date() })
      .where(eq(documents.id, documentId));

    if (customerEmail) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      await sendDocumentUnlocked({
        to: customerEmail,
        downloadUrl: `${appUrl}/api/download/${documentId}`,
      }).catch((err) => console.error("Failed to send email:", err));
    }

    return { documentType: existing.type };
  } catch (err) {
    console.error("[succes] confirmPayment error:", err);
    return null;
  }
}

export default async function SuccesPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  const confirmed = session_id ? await confirmPayment(session_id) : null;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">

        {confirmed && <TrackPurchase documentType={confirmed.documentType} />}

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-foreground/20 bg-foreground/5 text-2xl">
          ✓
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paiement confirmé</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Votre document légal est débloqué. Un email avec le lien de téléchargement
            vous a été envoyé dans les prochaines secondes.
          </p>
        </div>

        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 text-left space-y-2">
          <p className="text-sm font-medium text-foreground">Ce que vous avez obtenu :</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✓ Fichier PDF haute qualité sans filigrane</li>
            <li>✓ Code HTML prêt à intégrer sur votre site</li>
            <li>✓ Accès à vie — re-téléchargeable à tout moment</li>
          </ul>
        </div>

        {session_id && (
          <p className="text-xs text-muted-foreground">
            Référence : <span className="font-mono">{session_id.slice(0, 20)}…</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Voir mes documents →
          </Link>
          <Link
            href="/generateur"
            className="inline-flex items-center justify-center rounded-md border border-foreground/15 bg-foreground/5 px-4 py-2 text-sm font-medium hover:bg-foreground/10 transition-colors"
          >
            Générer un autre document
          </Link>
        </div>

      </div>
    </main>
  );
}
