import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import { DocumentPreview } from "@/components/shared/DocumentPreview";
import { DownloadButtons } from "./DownloadButtons";

interface Props {
  params: Promise<{ documentId: string }>;
}

const DOC_LABELS: Record<string, string> = {
  mentions_legales: "Mentions légales",
  politique_confidentialite: "Politique de confidentialité",
  pack: "Pack complet (mentions légales + politique de confidentialité)",
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
    title: `${label} | ConformeFR`,
    robots: "noindex",
  };
}

export default async function ApercuPage({ params }: Props) {
  const { documentId } = await params;
  const doc = await getDocument(documentId);
  if (!doc) notFound();

  const label = DOC_LABELS[doc.type] ?? doc.type;
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
            <DownloadButtons documentId={documentId} documentType={doc.type} />
          </div>
        </div>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-lg border border-amber-300 dark:border-amber-500/25 bg-amber-50 dark:bg-amber-500/5 px-4 py-3">
          <span className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0 text-base">⚠</span>
          <p className="text-sm text-amber-900 dark:text-amber-200/80">
            Relisez chaque information avant de publier ce document : il est généré
            automatiquement et ne constitue pas un conseil juridique. Pour une situation
            complexe ou une activité réglementée, faites-le vérifier par un professionnel du droit.
          </p>
        </div>

        {/* Document */}
        <DocumentPreview html={doc.generatedContent ?? ""} />

        <p className="text-center text-sm text-muted-foreground">
          Une erreur dans ce document, une suggestion ?{" "}
          <a
            href="mailto:contact@teebostudio.fr?subject=ConformeFR%20%E2%80%94%20retour%20sur%20un%20document"
            className="underline underline-offset-2 hover:text-foreground transition-colors"
          >
            Écrivez-moi
          </a>
          , chaque retour sert à améliorer l&apos;outil.
        </p>

      </div>
    </main>
  );
}
