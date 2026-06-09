"use client";

import { useState } from "react";
import { StepDocumentType } from "./steps/StepDocumentType";
import { StepSiteType } from "./steps/StepSiteType";
import { StepEntreprise } from "./steps/StepEntreprise";
import { StepDonnees } from "./steps/StepDonnees";
import { StepRecap } from "./steps/StepRecap";
import type { DocumentFormData } from "@/lib/validations/document";
import type { DocumentType, SiteType } from "@/lib/templates/types";

interface Props {
  onGenerate: (data: DocumentFormData) => void;
  isGenerating?: boolean;
  initialData?: Partial<DocumentFormData>;
}

const STEP_LABELS = ["Document", "Site", "Infos", "Données", "Récap"];

function getTotalSteps(documentType?: string) {
  const hasDonnees =
    documentType === "politique_confidentialite" || documentType === "pack";
  return hasDonnees ? 5 : 4;
}

function getStepLabel(step: number, documentType?: string): string {
  const hasDonnees =
    documentType === "politique_confidentialite" || documentType === "pack";
  if (!hasDonnees && step >= 3) return STEP_LABELS[4]; // skip "Données"
  return STEP_LABELS[step] ?? "";
}

export function DocumentForm({ onGenerate, isGenerating, initialData }: Props) {
  const [step, setStep] = useState(() => (initialData?.documentType ? 1 : 0));
  const [data, setData] = useState<Partial<DocumentFormData>>(initialData ?? {});

  const totalSteps = getTotalSteps(data.documentType);

  function merge(partial: Partial<DocumentFormData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function advance(partial: Partial<DocumentFormData>) {
    merge(partial);
    setStep((s) => s + 1);
  }

  const hasDonnees =
    data.documentType === "politique_confidentialite" || data.documentType === "pack";

  // step 0 = document type
  // step 1 = site type
  // step 2 = entreprise
  // step 3 = données (if hasDonnees) OR recap
  // step 4 = recap (if hasDonnees)
  const isRecapStep = hasDonnees ? step === 4 : step === 3;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8 space-y-2">
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-white" : "bg-white/15"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Étape {step + 1} sur {totalSteps} — {getStepLabel(step, data.documentType)}
        </p>
      </div>

      {/* Steps */}
      {step === 0 && (
        <StepDocumentType
          initial={data.documentType}
          onNext={(documentType: DocumentType) => advance({ documentType })}
        />
      )}

      {step === 1 && (
        <StepSiteType
          initial={data.siteType}
          onNext={(siteType: SiteType) => advance({ siteType })}
          onBack={() => setStep(0)}
        />
      )}

      {step === 2 && (
        <StepEntreprise
          initial={data}
          documentType={data.documentType!}
          siteType={data.siteType!}
          onNext={(partial) => advance(partial)}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && hasDonnees && (
        <StepDonnees
          initial={data}
          siteType={data.siteType!}
          onNext={(partial) => advance(partial)}
          onBack={() => setStep(2)}
        />
      )}

      {isRecapStep && (
        <StepRecap
          data={data as DocumentFormData}
          isGenerating={isGenerating}
          onGenerate={onGenerate}
          onBack={() => setStep(hasDonnees ? 3 : 2)}
        />
      )}
    </div>
  );
}
