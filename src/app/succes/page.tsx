import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paiement confirmé — ConformeFR",
  robots: "noindex",
};

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function SuccesPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-white/20 bg-white/5 text-2xl">
          ✓
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Paiement confirmé</h1>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Votre document légal est débloqué. Un email avec le lien de téléchargement
            vous a été envoyé dans les prochaines secondes.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-left space-y-2">
          <p className="text-sm font-medium text-white">Ce que vous avez obtenu :</p>
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
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/generateur"
            className="inline-flex items-center justify-center rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
          >
            Générer un autre document
          </Link>
        </div>

      </div>
    </main>
  );
}
