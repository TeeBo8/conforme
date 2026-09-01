"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { track } from "@vercel/analytics";
import { DocumentForm } from "@/components/shared/DocumentForm";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/trpc";
import type { DocumentFormData } from "@/lib/validations/document";

interface Props {
  initialData?: Partial<DocumentFormData>;
}

export default function GenerateurClient({ initialData }: Props) {
  const router = useRouter();

  const generateMutation = api.document.generateDocument.useMutation({
    onSuccess({ documentId }, variables) {
      track("Aperçu créé", { documentType: variables.documentType });
      router.push(`/apercu/${documentId}`);
    },
    onError(err) {
      toast.error(err.message ?? "Une erreur est survenue, veuillez réessayer.");
    },
  });

  function handleGenerate(data: DocumentFormData) {
    track("Clic Générer", { documentType: data.documentType });
    generateMutation.mutate(data);
  }

  if (generateMutation.isPending) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-3 py-6">
          <Spinner size="lg" className="mx-auto" />
          <p className="font-medium">Génération de votre document…</p>
          <p className="text-xs text-muted-foreground">
            L&apos;IA rédige vos clauses personnalisées — comptez 15 à 30 secondes.
          </p>
        </div>
        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-8 space-y-5 animate-pulse">
          <div className="space-y-2">
            <div className="h-5 w-1/2 rounded-md bg-foreground/10" />
            <div className="h-3 w-full rounded-md bg-foreground/10" />
            <div className="h-3 w-5/6 rounded-md bg-foreground/10" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/3 rounded-md bg-foreground/10" />
            <div className="h-3 w-full rounded-md bg-foreground/10" />
            <div className="h-3 w-full rounded-md bg-foreground/10" />
            <div className="h-3 w-4/5 rounded-md bg-foreground/10" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-2/5 rounded-md bg-foreground/10" />
            <div className="h-3 w-full rounded-md bg-foreground/10" />
            <div className="h-3 w-3/4 rounded-md bg-foreground/10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <DocumentForm
      onGenerate={handleGenerate}
      isGenerating={false}
      initialData={initialData}
    />
  );
}
