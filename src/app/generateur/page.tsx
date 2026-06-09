import type { Metadata } from "next";
import type { DocumentFormData } from "@/lib/validations/document";
import GenerateurClient from "./GenerateurClient";

export const metadata: Metadata = {
  title: "Générateur de documents légaux — ConformeFR",
  description: "Créez vos mentions légales et politique de confidentialité RGPD en 3 minutes. Aperçu gratuit, téléchargement PDF et HTML à partir de 19 €.",
};

interface Props {
  searchParams: Promise<{ type?: string; siteType?: string }>;
}

export default async function GenerateurPage({ searchParams }: Props) {
  const { type, siteType } = await searchParams;

  const initialData: Partial<DocumentFormData> = {};
  if (type === "mentions_legales" || type === "politique_confidentialite" || type === "pack") {
    initialData.documentType = type;
  }
  if (siteType === "vitrine" || siteType === "ecommerce" || siteType === "blog" || siteType === "saas") {
    initialData.siteType = siteType as DocumentFormData["siteType"];
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Générer mon document légal</h1>
        <p className="text-muted-foreground mt-2">
          Répondez aux questions ci-dessous — l&apos;aperçu est immédiat et gratuit.
        </p>
      </div>
      <GenerateurClient initialData={Object.keys(initialData).length > 0 ? initialData : undefined} />
    </main>
  );
}
