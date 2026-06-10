import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import { DocumentPreview } from "@/components/shared/DocumentPreview";
import { PayButton } from "./PayButton";

interface Props {
  params: Promise<{ documentId: string }>;
}

const DOC_LABELS: Record<string, string> = {
  mentions_legales: "Mentions légales",
  politique_confidentialite: "Politique de confidentialité",
  pack: "Pack complet (mentions légales + politique de confidentialité)",
};

const DOC_PRICES: Record<string, string> = {
  mentions_legales: "19 €",
  politique_confidentialite: "19 €",
  pack: "29 €",
};

async function getDocument(documentId: string) {
  const rows = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
    .limit(1);
  return rows[0] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  const doc = await getDocument(documentId);
  if (!doc) return { title: "Document introuvable — ConformeFR" };
  const label = DOC_LABELS[doc.type] ?? "Document légal";
  return {
    title: `Aperçu — ${label} | ConformeFR`,
    robots: "noindex",
  };
}

export default async function ApercuPage({ params }: Props) {
  const { documentId } = await params;
  const doc = await getDocument(documentId);
  if (!doc) notFound();

  const label = DOC_LABELS[doc.type] ?? doc.type;
  const price = DOC_PRICES[doc.type] ?? "19 €";
  const createdAt = doc.createdAt.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <div className="space-y-3">
          <Link
            href="/generateur"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Modifier les informations
          </Link>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{label}</h1>
              <p className="text-xs text-muted-foreground mt-1">Généré le {createdAt}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden sm:block rounded-full border border-foreground/20 px-3 py-1 text-xs font-medium text-foreground/60">
                Aperçu gratuit
              </div>
              <PayButton documentId={documentId} price={price} size="sm" />
            </div>
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-lg border border-amber-500/25 bg-amber-500/5 px-4 py-3">
          <span className="text-amber-400 mt-0.5 shrink-0 text-base">⚠</span>
          <p className="text-sm text-amber-200/80">
            Ceci est un aperçu gratuit. Vérifiez les informations puis débloquez le téléchargement PDF et HTML sans filigrane pour{" "}
            <strong className="text-amber-200">{price}</strong> — paiement sécurisé Stripe.
          </p>
        </div>

        {/* Document avec filigrane */}
        <DocumentPreview html={doc.generatedContent ?? ""} />

        {/* CTA bas de page */}
        <div className="rounded-xl border border-foreground/15 bg-foreground/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground">Tout est correct ?</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              Débloquez le PDF et le code HTML prêt à coller sur votre site — sans filigrane, à vie.
            </p>
            <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
              <li>✓ Fichier PDF haute qualité</li>
              <li>✓ Code HTML prêt à intégrer</li>
              <li>✓ Accès à vie, re-téléchargeable</li>
            </ul>
          </div>
          <div className="shrink-0">
            <PayButton documentId={documentId} price={price} size="lg" />
          </div>
        </div>

      </div>
    </main>
  );
}
