import { notFound } from "next/navigation";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ documentId: string }>;
}

const DOC_LABELS: Record<string, string> = {
  mentions_legales: "Mentions légales",
  politique_confidentialite: "Politique de confidentialité",
  pack: "Pack complet",
};

export default async function ApercuPage({ params }: Props) {
  const { documentId } = await params;

  const rows = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
    .limit(1);

  const doc = rows[0];
  if (!doc) notFound();

  const docLabel = DOC_LABELS[doc.type] ?? doc.type;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Aperçu gratuit</p>
            <h1 className="text-2xl font-bold">{docLabel}</h1>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/generateur">← Modifier</Link>
            </Button>
            <Button size="sm" disabled className="opacity-60 cursor-not-allowed">
              Débloquer — {doc.type === "pack" ? "29 €" : "19 €"}
            </Button>
          </div>
        </div>

        {/* Watermark notice */}
        <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-3 text-sm text-yellow-300">
          Ceci est un aperçu gratuit. Le paiement débloque le téléchargement PDF et HTML sans restriction.
        </div>

        {/* Document content */}
        <div
          className="rounded-lg border border-border bg-white/5 p-8 prose prose-invert prose-sm max-w-none
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4
            [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3
            [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-muted-foreground
            [&_ul]:text-sm [&_ul]:text-muted-foreground [&_ul]:space-y-1 [&_ul]:list-disc [&_ul]:pl-5
            [&_li]:text-sm
            [&_a]:text-white [&_a]:underline
            [&_table]:w-full [&_table]:text-xs [&_table]:border-collapse
            [&_th]:text-left [&_th]:p-2 [&_th]:border [&_th]:border-border [&_th]:font-medium
            [&_td]:p-2 [&_td]:border [&_td]:border-border [&_td]:text-muted-foreground
            [&_.document-date]:text-xs [&_.document-date]:text-muted-foreground
            [&_.document-intro]:text-sm [&_.document-intro]:text-muted-foreground [&_.document-intro]:leading-relaxed
            [&_.document-disclaimer]:mt-8 [&_.document-disclaimer]:pt-4 [&_.document-disclaimer]:border-t [&_.document-disclaimer]:border-border
            [&_hr]:border-border [&_hr]:my-12"
          dangerouslySetInnerHTML={{ __html: doc.generatedContent ?? "" }}
        />

        {/* Bottom CTA */}
        <div className="rounded-lg border border-white/20 bg-white/5 p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-medium">Prêt à télécharger votre document ?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Débloquez le PDF et HTML sans filigrane en une seule fois.
            </p>
          </div>
          <Button size="lg" disabled className="opacity-60 cursor-not-allowed min-w-40">
            Payer {doc.type === "pack" ? "29 €" : "19 €"} →
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground">Paiement sécurisé Stripe — disponible prochainement</p>
      </div>
    </main>
  );
}
