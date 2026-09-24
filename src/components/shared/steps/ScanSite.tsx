"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/trpc";
import type { RouterOutputs } from "@/lib/trpc";

export type SuggestionsScan = RouterOutputs["document"]["scanSite"];

interface Props {
  initialUrl: string;
  onResult: (suggestions: SuggestionsScan) => void;
}

export function ScanSite({ initialUrl, onResult }: Props) {
  const [url, setUrl] = useState(initialUrl);
  const [resume, setResume] = useState<SuggestionsScan | null>(null);

  const scan = api.document.scanSite.useMutation({
    onSuccess(data) {
      track("Scan site", { resultat: "ok" });
      setResume(data);
      onResult(data);
    },
    onError() {
      track("Scan site", { resultat: "erreur" });
    },
  });

  const trouve = resume
    ? [
        resume.email && "email",
        resume.telephone && "téléphone",
        resume.siret && "SIRET",
        resume.hebergeur && `hébergeur (${resume.hebergeur.nom})`,
        resume.activite && "description de l'activité",
      ].filter(Boolean)
    : [];

  return (
    <section
      aria-labelledby="scan-titre"
      className="rounded-lg border border-foreground/15 bg-foreground/[0.03] p-4 space-y-3"
    >
      <div>
        <h3 id="scan-titre" className="text-sm font-semibold">
          Gagnez du temps : analysez votre site
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Nous lisons votre page d&apos;accueil publique pour pré-remplir les champs vides
          (contact, SIRET, hébergeur, services tiers). Vous vérifiez et corrigez tout ensuite.
        </p>
      </div>

      <form
        className="flex flex-col sm:flex-row gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (url.trim()) scan.mutate({ url: url.trim() });
        }}
      >
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://monsite.fr"
          aria-label="Adresse de votre site"
          inputMode="url"
        />
        <Button type="submit" variant="outline" disabled={scan.isPending || !url.trim()} className="gap-2 shrink-0">
          {scan.isPending && <Spinner size="sm" />}
          {scan.isPending ? "Analyse…" : "Analyser"}
        </Button>
      </form>

      <div aria-live="polite" className="space-y-2 text-xs">
        {scan.error && <p className="text-destructive">{scan.error.message}</p>}
        {resume && (
          <>
            <p>
              {trouve.length > 0
                ? `Pré-rempli : ${trouve.join(", ")}.`
                : "Aucune information d'identification trouvée sur la page d'accueil."}{" "}
              <span className="text-muted-foreground">Vérifiez chaque champ avant de continuer.</span>
            </p>
            {resume.services.length > 0 && (
              <p className="text-muted-foreground">
                Services détectés : {resume.services.join(", ")}. Ils serviront à pré-remplir
                l&apos;étape « Données » de la politique de confidentialité.
              </p>
            )}
            {resume.alertes.map((a) => (
              <p key={a} className="text-amber-700 dark:text-amber-400">
                {a}
              </p>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
