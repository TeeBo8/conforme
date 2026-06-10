interface Props {
  html: string;
}

export function DocumentPreview({ html }: Props) {
  return (
    <div className="relative rounded-xl border border-border overflow-hidden">
      {/* Filigrane diagonal répété — couleurs light/dark dans globals.css */}
      <div
        aria-hidden
        className="preview-watermark absolute inset-0 pointer-events-none z-10"
      />

      {/* Contenu du document — select-none : l'aperçu gratuit ne se copie pas */}
      <div
        className="
          relative z-0 p-8 md:p-12 bg-foreground/[0.03] select-none
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-2
          [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground/90 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-1.5 [&_h2]:border-b [&_h2]:border-foreground/10
          [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-foreground/65 [&_p]:mb-2
          [&_ul]:text-sm [&_ul]:text-foreground/65 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
          [&_li]:leading-relaxed
          [&_a]:text-foreground/80 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-foreground
          [&_strong]:font-medium [&_strong]:text-foreground/85
          [&_em]:italic [&_em]:text-foreground/50
          [&_table]:w-full [&_table]:text-xs [&_table]:border-collapse [&_table]:mb-4 [&_table]:mt-2
          [&_thead]:bg-foreground/5
          [&_th]:text-left [&_th]:p-2.5 [&_th]:border [&_th]:border-foreground/10 [&_th]:font-medium [&_th]:text-foreground/75
          [&_td]:p-2.5 [&_td]:border [&_td]:border-foreground/10 [&_td]:text-foreground/55 [&_td]:align-top [&_td]:leading-relaxed
          [&_section]:mb-1
          [&_header]:mb-8 [&_header]:pb-6 [&_header]:border-b [&_header]:border-foreground/10
          [&_.document-date]:block [&_.document-date]:text-xs [&_.document-date]:text-foreground/35 [&_.document-date]:mt-1
          [&_.document-intro]:text-sm [&_.document-intro]:text-foreground/55 [&_.document-intro]:leading-relaxed [&_.document-intro]:mt-3 [&_.document-intro]:pl-3 [&_.document-intro]:border-l-2 [&_.document-intro]:border-foreground/15
          [&_.document-disclaimer]:mt-10 [&_.document-disclaimer]:pt-4 [&_.document-disclaimer]:border-t [&_.document-disclaimer]:border-foreground/10 [&_.document-disclaimer]:text-xs [&_.document-disclaimer]:text-foreground/30
          [&_hr.document-separator]:border-foreground/10 [&_hr.document-separator]:my-14
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
