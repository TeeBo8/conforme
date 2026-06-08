"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentForm } from "@/components/shared/DocumentForm";
import type { DocumentFormData } from "@/lib/validations/document";

export default function GenerateurClient() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate(data: DocumentFormData) {
    setIsGenerating(true);
    // Phase 5 : appel tRPC generateDocument + redirect vers /apercu/[id]
    console.log("TODO Phase 5 — données du formulaire :", data);
    // Placeholder : on simule un délai
    await new Promise((r) => setTimeout(r, 500));
    setIsGenerating(false);
    router.push("/apercu/preview");
  }

  return <DocumentForm onGenerate={handleGenerate} isGenerating={isGenerating} />;
}
