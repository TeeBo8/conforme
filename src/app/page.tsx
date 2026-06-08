import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-4 py-24 text-center">
      <div className="max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-muted-foreground">
          ✓ Conforme RGPD & loi LCEN — droit français
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          Mentions légales &amp; politique de confidentialité{" "}
          <span className="text-muted-foreground">en 3 minutes</span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Générateur de documents légaux pour sites web français. Aperçu gratuit,
          téléchargement PDF et HTML à partir de 19&nbsp;€.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild size="lg" className="text-base px-8">
            <Link href="/generateur">Générer mon document →</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">
          <span>📄 Mentions légales</span>
          <span>🔒 Politique RGPD</span>
          <span>📦 Pack complet — 29&nbsp;€</span>
        </div>
      </div>
    </main>
  );
}
