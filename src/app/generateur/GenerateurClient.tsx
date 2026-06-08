"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentForm } from "@/components/shared/DocumentForm";
import { api } from "@/lib/trpc";
import type { DocumentFormData } from "@/lib/validations/document";

export default function GenerateurClient() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generateMutation = api.document.generateDocument.useMutation({
    onSuccess({ documentId }) {
      router.push(`/apercu/${documentId}`);
    },
    onError(err) {
      setErrorMsg(err.message ?? "Une erreur est survenue, veuillez réessayer.");
    },
  });

  function handleGenerate(data: DocumentFormData) {
    setErrorMsg(null);
    generateMutation.mutate(data);
  }

  return (
    <>
      {errorMsg && (
        <p className="text-center text-sm text-red-400 mb-4">{errorMsg}</p>
      )}
      <DocumentForm
        onGenerate={handleGenerate}
        isGenerating={generateMutation.isPending}
      />
    </>
  );
}
