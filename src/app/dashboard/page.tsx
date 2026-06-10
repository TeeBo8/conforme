import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { eq, and, desc } from "drizzle-orm";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { documents } from "@/server/db/schema";

export const metadata: Metadata = {
  title: "Mes documents — ConformeFR",
  robots: "noindex",
};

const DOC_LABELS: Record<string, string> = {
  mentions_legales: "Mentions légales",
  politique_confidentialite: "Politique de confidentialité",
  pack: "Pack complet",
};

const DOC_PRICES: Record<string, string> = {
  mentions_legales: "19 €",
  politique_confidentialite: "19 €",
  pack: "29 €",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/connexion?redirect=/dashboard");

  const docs = await db
    .select()
    .from(documents)
    .where(and(eq(documents.userId, session.user.id), eq(documents.status, "paid")))
    .orderBy(desc(documents.updatedAt));

  return (
    <main className="min-h-[calc(100vh-56px)] px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-8">

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mes documents</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Bonjour {session.user.name} — retrouvez ici tous vos documents achetés.
          </p>
        </div>

        {docs.length === 0 ? (
          <div className="rounded-xl border border-foreground/10 bg-foreground/5 px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">Aucun document acheté pour l&apos;instant.</p>
            <Link
              href="/generateur"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Générer mon premier document →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {docs.map((doc) => {
              const label = DOC_LABELS[doc.type] ?? doc.type;
              const price = DOC_PRICES[doc.type] ?? "—";
              const date = doc.updatedAt.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div
                  key={doc.id}
                  className="flex flex-col gap-4 rounded-xl border border-foreground/15 bg-foreground/5 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">
                      Acheté le {date} · {price}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Link
                      href={`/api/download/${doc.id}?format=pdf`}
                      className="inline-flex items-center rounded-md border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/10"
                    >
                      PDF →
                    </Link>
                    <Link
                      href={`/api/download/${doc.id}?format=html`}
                      className="inline-flex items-center rounded-md border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-foreground/10"
                    >
                      HTML →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="border-t border-foreground/10 pt-6">
          <Link
            href="/generateur"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Générer un nouveau document
          </Link>
        </div>
      </div>
    </main>
  );
}
