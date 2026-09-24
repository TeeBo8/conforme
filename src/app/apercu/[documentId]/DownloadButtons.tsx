"use client";

import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";

interface Props {
  documentId: string;
  documentType: string;
}

export function DownloadButtons({ documentId, documentType }: Props) {
  const href = (format: "pdf" | "html") => `/api/download/${documentId}?format=${format}`;

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild size="sm">
        <a
          href={href("pdf")}
          onClick={() => track("Téléchargement", { documentType, format: "pdf" })}
        >
          Télécharger le PDF
        </a>
      </Button>
      <Button asChild size="sm" variant="outline">
        <a
          href={href("html")}
          onClick={() => track("Téléchargement", { documentType, format: "html" })}
        >
          Télécharger le HTML
        </a>
      </Button>
    </div>
  );
}
