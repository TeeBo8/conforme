"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { SiteType } from "@/lib/templates/types";

interface Props {
  initial?: SiteType;
  onNext: (siteType: SiteType) => void;
  onBack: () => void;
}

const OPTIONS: {
  value: SiteType;
  label: string;
  description: string;
  examples: string;
}[] = [
  {
    value: "vitrine",
    label: "Site vitrine",
    description: "Présentation d'une activité ou d'une entreprise",
    examples: "Portfolio, site d'artisan, cabinet médical, restaurant…",
  },
  {
    value: "ecommerce",
    label: "E-commerce",
    description: "Vente de produits ou services en ligne",
    examples: "Boutique Shopify, WooCommerce, vente de formations…",
  },
  {
    value: "blog",
    label: "Blog / Site éditorial",
    description: "Publication de contenus, articles, actualités",
    examples: "Blog personnel, média en ligne, newsletter…",
  },
  {
    value: "saas",
    label: "SaaS / Application web",
    description: "Logiciel ou service accessible en ligne avec compte utilisateur",
    examples: "Outil SaaS, plateforme, application en ligne…",
  },
];

export function StepSiteType({ initial, onNext, onBack }: Props) {
  const [selected, setSelected] = useState<SiteType | undefined>(initial);
  const [error, setError] = useState("");

  function handleNext() {
    if (!selected) {
      setError("Sélectionnez un type de site pour continuer.");
      return;
    }
    onNext(selected);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Quel type de site web possédez-vous ?</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Le type de site détermine les clauses spécifiques à inclure.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setSelected(opt.value);
              setError("");
            }}
            className={`text-left p-4 rounded-lg border transition-colors ${
              selected === opt.value
                ? "border-white bg-white/5"
                : "border-border hover:border-white/40"
            }`}
          >
            <p className="font-medium">{opt.label}</p>
            <p className="text-sm text-muted-foreground mt-0.5">{opt.description}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">{opt.examples}</p>
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={handleNext}>Continuer</Button>
      </div>
    </div>
  );
}
