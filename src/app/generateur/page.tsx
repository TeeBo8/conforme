export const metadata = {
  title: "Générateur de documents légaux — ConformeFR",
  description: "Créez vos mentions légales et politique de confidentialité en 3 minutes.",
};

export default function GenerateurPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Générer mon document légal</h1>
        <p className="text-muted-foreground mt-2">
          Répondez aux questions ci-dessous — l&apos;aperçu est immédiat et gratuit.
        </p>
      </div>
      <GenerateurClient />
    </main>
  );
}

// Client wrapper — isolated pour garder la page en Server Component
import GenerateurClient from "./GenerateurClient";
