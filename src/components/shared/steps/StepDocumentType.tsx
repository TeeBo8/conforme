"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DocumentType } from "@/lib/templates/types";

interface Props {
  initial?: DocumentType;
  onNext: (documentType: DocumentType) => void;
}

const OPTIONS: {
  value: DocumentType;
  label: string;
  description: string;
  badge?: string;
}[] = [
  {
    value: "mentions_legales",
    label: "Mentions légales",
    description: "Obligatoires pour tout site professionnel (loi LCEN)",
  },
  {
    value: "politique_confidentialite",
    label: "Politique de confidentialité",
    description: "Exigée par le RGPD dès que vous collectez des données personnelles",
  },
  {
    value: "pack",
    label: "Pack complet",
    description: "Mentions légales + Politique de confidentialité — la solution tout-en-un",
  },
];

export function StepDocumentType({ initial, onNext }: Props) {
  const [selected, setSelected] = useState<DocumentType | undefined>(initial);
  const [error, setError] = useState("");

  function handleNext() {
    if (!selected) {
      setError("Sélectionnez un type de document pour continuer.");
      return;
    }
    onNext(selected);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Quel document souhaitez-vous générer ?</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Sélectionnez un document — vous pourrez le vérifier avant de l&apos;utiliser.
        </p>
      </div>

      <div className="space-y-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setSelected(opt.value);
              setError("");
            }}
            className={`w-full text-left p-4 rounded-lg border transition-colors ${
              selected === opt.value
                ? "border-primary bg-primary/10 ring-1 ring-primary/30"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium">{opt.label}</span>
                  {opt.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {opt.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{opt.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-end">
        <Button onClick={handleNext}>Continuer</Button>
      </div>
    </div>
  );
}
