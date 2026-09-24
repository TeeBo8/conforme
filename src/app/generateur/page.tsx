import type { Metadata } from "next";
import type { DocumentFormData } from "@/lib/validations/document";
import Link from "next/link";
import GenerateurClient from "./GenerateurClient";
import { RelatedLinks } from "@/components/shared/RelatedLinks";

export const metadata: Metadata = {
  title: "Générateur de politique de confidentialité RGPD | ConformeFR",
  description: "Créez vos mentions légales et politique de confidentialité RGPD en 3 minutes. Gratuit, téléchargement PDF et HTML sans inscription.",
  alternates: { canonical: "/generateur" },
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
          Répondez aux questions ci-dessous — c&apos;est gratuit et sans inscription.
        </p>
      </div>
      <GenerateurClient initialData={Object.keys(initialData).length > 0 ? initialData : undefined} />

      <div className="max-w-2xl mx-auto mt-20 space-y-10 text-sm leading-relaxed text-muted-foreground">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Comment fonctionne le générateur</h2>
          <ol className="list-decimal pl-5 space-y-1.5">
            <li>Choisissez le document : mentions légales, politique de confidentialité, ou les deux.</li>
            <li>
              Renseignez votre statut et vos coordonnées, ou laissez l&apos;analyse de votre site
              pré-remplir les champs (contact, SIRET, hébergeur, services tiers).
            </li>
            <li>Relisez le document à l&apos;écran, puis téléchargez-le en PDF ou en HTML prêt à intégrer.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Ce que vérifie le générateur</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              Les informations d&apos;identification exigées par l&apos;article 1-1 de la loi pour la
              confiance dans l&apos;économie numérique (LCEN) : identité de l&apos;éditeur, téléphone,
              immatriculation, directeur de la publication, hébergeur.
            </li>
            <li>La mention « EI » pour les entrepreneurs individuels et micro-entrepreneurs.</li>
            <li>
              Pour la politique de confidentialité, les informations prévues par l&apos;article 13 du
              RGPD : finalités, bases légales, destinataires, durées, transferts hors UE, droits.
            </li>
            <li>
              Pour les cookies, les règles de la CNIL : consentement préalable pour les traceurs non
              essentiels, refus aussi simple que l&apos;acceptation.
            </li>
          </ul>
          <p>
            Les documents sont gratuits, sans inscription, et ne constituent pas un conseil
            juridique. Pour comprendre chaque obligation, lisez nos{" "}
            <Link href="/blog" className="underline underline-offset-2 hover:text-foreground">
              guides
            </Link>
            .
          </p>
        </section>

        <RelatedLinks current="/generateur" />
      </div>
    </main>
  );
}
