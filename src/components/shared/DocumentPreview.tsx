const WATERMARK_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="380" height="220">` +
  `<text x="190" y="110" fill="rgba(255,255,255,0.055)" font-size="15" ` +
  `font-family="system-ui,sans-serif" text-anchor="middle" dominant-baseline="middle" ` +
  `transform="rotate(-35 190 110)">APERCU — Document non officiel</text></svg>`
);

const WATERMARK_URL = `url("data:image/svg+xml,${WATERMARK_SVG}")`;

interface Props {
  html: string;
}

export function DocumentPreview({ html }: Props) {
  return (
    <div className="relative rounded-xl border border-border overflow-hidden">
      {/* Filigrane diagonal répété */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-10"
        style={{ backgroundImage: WATERMARK_URL, backgroundRepeat: "repeat" }}
      />

      {/* Contenu du document */}
      <div
        className="
          relative z-0 p-8 md:p-12 bg-white/[0.03]
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-2
          [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-white/90 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-1.5 [&_h2]:border-b [&_h2]:border-white/10
          [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-white/65 [&_p]:mb-2
          [&_ul]:text-sm [&_ul]:text-white/65 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:mb-3
          [&_li]:leading-relaxed
          [&_a]:text-white/80 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-white
          [&_strong]:font-medium [&_strong]:text-white/85
          [&_em]:italic [&_em]:text-white/50
          [&_table]:w-full [&_table]:text-xs [&_table]:border-collapse [&_table]:mb-4 [&_table]:mt-2
          [&_thead]:bg-white/5
          [&_th]:text-left [&_th]:p-2.5 [&_th]:border [&_th]:border-white/10 [&_th]:font-medium [&_th]:text-white/75
          [&_td]:p-2.5 [&_td]:border [&_td]:border-white/10 [&_td]:text-white/55 [&_td]:align-top [&_td]:leading-relaxed
          [&_section]:mb-1
          [&_header]:mb-8 [&_header]:pb-6 [&_header]:border-b [&_header]:border-white/10
          [&_.document-date]:block [&_.document-date]:text-xs [&_.document-date]:text-white/35 [&_.document-date]:mt-1
          [&_.document-intro]:text-sm [&_.document-intro]:text-white/55 [&_.document-intro]:leading-relaxed [&_.document-intro]:mt-3 [&_.document-intro]:pl-3 [&_.document-intro]:border-l-2 [&_.document-intro]:border-white/15
          [&_.document-disclaimer]:mt-10 [&_.document-disclaimer]:pt-4 [&_.document-disclaimer]:border-t [&_.document-disclaimer]:border-white/10 [&_.document-disclaimer]:text-xs [&_.document-disclaimer]:text-white/30
          [&_hr.document-separator]:border-white/10 [&_hr.document-separator]:my-14
        "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
