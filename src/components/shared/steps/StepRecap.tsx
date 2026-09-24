"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import type { DocumentFormData } from "@/lib/validations/document";

interface Props {
  data: DocumentFormData;
  isGenerating?: boolean;
  onGenerate: (data: DocumentFormData) => void;
  onBack: () => void;
}

const DOC_LABELS: Record<string, string> = {
  mentions_legales: "Mentions légales",
  politique_confidentialite: "Politique de confidentialité",
  pack: "Pack complet",
};

const SITE_LABELS: Record<string, string> = {
  vitrine: "Site vitrine",
  ecommerce: "E-commerce",
  blog: "Blog / Éditorial",
  saas: "SaaS / App web",
};

const DONNEES_LABELS: Record<string, string> = {
  email: "Email",
  nom_prenom: "Nom & prénom",
  telephone: "Téléphone",
  adresse_postale: "Adresse postale",
  donnees_paiement: "Données de paiement",
  donnees_compte: "Données de compte",
  donnees_navigation: "Navigation",
  logs_techniques: "Logs techniques",
  adresse_ip: "Adresse IP",
  cookies: "Cookies",
};

const FINALITES_LABELS: Record<string, string> = {
  gestion_commandes: "Gestion des commandes",
  envoi_newsletter: "Newsletter",
  support_client: "Support client",
  statistiques: "Statistiques",
  personnalisation: "Personnalisation",
  facturation: "Facturation",
  compte_utilisateur: "Gestion comptes",
  securite: "Sécurité",
};

export function StepRecap({ data, isGenerating, onGenerate, onBack }: Props) {
  const hasDonnees =
    data.documentType === "politique_confidentialite" || data.documentType === "pack";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Récapitulatif</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Vérifiez vos informations avant de générer le document.
        </p>
      </div>

      <div className="space-y-4">
        {/* Document & site */}
        <RecapSection title="Document & site">
          <RecapRow label="Document" value={DOC_LABELS[data.documentType]} />
          <RecapRow label="Type de site" value={SITE_LABELS[data.siteType]} />
        </RecapSection>

        {/* Entreprise */}
        <RecapSection title="Entreprise">
          <RecapRow label="Nom" value={data.nomEntreprise} />
          <RecapRow label="Forme juridique" value={data.formeJuridique} />
          {data.siret && <RecapRow label="SIRET" value={data.siret} />}
          <RecapRow label="Adresse" value={data.adresse} />
          <RecapRow label="Email" value={data.email} />
          {data.telephone && <RecapRow label="Téléphone" value={data.telephone} />}
          <RecapRow label="URL du site" value={data.urlSite} />
          {data.directeurPublication && (
            <RecapRow label="Directeur de publication" value={data.directeurPublication} />
          )}
        </RecapSection>

        {/* Hébergeur */}
        <RecapSection title="Hébergeur">
          <RecapRow label="Nom" value={data.nomHebergeur} />
          <RecapRow label="Adresse" value={data.adresseHebergeur} />
        </RecapSection>

        {/* Données (si applicable) */}
        {hasDonnees && data.donneesCollectees && data.donneesCollectees.length > 0 && (
          <RecapSection title="Données & confidentialité">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Données collectées</p>
              <div className="flex flex-wrap gap-1.5">
                {data.donneesCollectees.map((d) => (
                  <Badge key={d} variant="outline" className="text-xs">
                    {DONNEES_LABELS[d] ?? d}
                  </Badge>
                ))}
              </div>
            </div>
            {data.finalites && data.finalites.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Finalités</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.finalites.map((f) => (
                    <Badge key={f} variant="outline" className="text-xs">
                      {FINALITES_LABELS[f] ?? f}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <RecapRow
              label="Durée de conservation"
              value={data.dureeConservation ?? "—"}
            />
            <RecapRow
              label="Cookies"
              value={data.cookiesUtilises ? "Oui" : "Non"}
            />
            <RecapRow
              label="Transfert hors UE"
              value={data.transfertHorsUE ? `Oui${data.paysTransfert ? ` (${data.paysTransfert})` : ""}` : "Non"}
            />
          </RecapSection>
        )}
      </div>

      <div className="rounded-lg border border-foreground/20 bg-foreground/5 p-4 space-y-2">
        <span className="font-medium">{DOC_LABELS[data.documentType]}</span>
        <p className="text-xs text-muted-foreground">
          Gratuit, sans inscription.
        </p>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button
          onClick={() => onGenerate(data)}
          disabled={isGenerating}
          className="min-w-40 gap-2"
        >
          {isGenerating && <Spinner size="sm" />}
          {isGenerating ? "Génération…" : "Générer mon document →"}
        </Button>
      </div>
    </div>
  );
}

function RecapSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border p-4 space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}

function RecapRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}
