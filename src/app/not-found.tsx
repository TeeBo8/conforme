import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable — ConformeFR",
  robots: "noindex",
};

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/20 bg-white/5 text-2xl font-mono font-bold text-muted-foreground">
          404
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Page introuvable</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Cette page n&apos;existe pas ou a été déplacée.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">Retour à l&apos;accueil →</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/generateur">Générer un document</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
