import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq, and } from "drizzle-orm";
import { renderToBuffer } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import React from "react";
import { auth } from "@/lib/auth";
import { db } from "@/server/db";
import { documents } from "@/server/db/schema";
import { DocumentPDF } from "@/lib/pdf/DocumentPDF";
import { parseDocument } from "@/lib/pdf/parse-html";

const DOC_LABELS: Record<string, string> = {
  mentions_legales: "Mentions légales",
  politique_confidentialite: "Politique de confidentialité",
  pack: "Pack complet",
};

const DOC_FILENAMES: Record<string, string> = {
  mentions_legales: "mentions-legales",
  politique_confidentialite: "politique-confidentialite",
  pack: "pack-complet",
};

function htmlDocument(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — ConformeFR</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; font-size: 15px; line-height: 1.7; color: #1a1a1a; max-width: 800px; margin: 0 auto; padding: 40px 24px 64px; }
    h1 { font-size: 1.6rem; font-weight: 700; margin-bottom: 2rem; }
    h2 { font-size: 1.1rem; font-weight: 700; margin-top: 2rem; margin-bottom: 0.5rem; }
    p { margin: 0.5rem 0; }
    ul { padding-left: 1.5rem; margin: 0.5rem 0; }
    li { margin-bottom: 0.2rem; }
    a { color: inherit; }
    hr.document-separator { border: none; border-top: 2px solid #ddd; margin: 3rem 0; }
    .footer { margin-top: 4rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.75rem; color: #999; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <h1>${title}</h1>
  ${content}
  <div class="footer">Document généré par <a href="https://conformefr.com">ConformeFR</a> — générateur de documents légaux pour sites web français</div>
</body>
</html>`;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ documentId: string }> }
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    const target = `${req.nextUrl.pathname}${req.nextUrl.search}`;
    return NextResponse.redirect(
      new URL(`/connexion?redirect=${encodeURIComponent(target)}`, req.nextUrl)
    );
  }

  const { documentId } = await params;
  const format = req.nextUrl.searchParams.get("format") ?? "pdf";

  const [doc] = await db
    .select()
    .from(documents)
    .where(
      and(
        eq(documents.id, documentId),
        eq(documents.userId, session.user.id),
        eq(documents.status, "paid")
      )
    )
    .limit(1);

  if (!doc) {
    return NextResponse.json({ error: "Document introuvable" }, { status: 404 });
  }

  const content = doc.generatedContent ?? "";
  const title = DOC_LABELS[doc.type] ?? "Document";
  const filename = DOC_FILENAMES[doc.type] ?? "document";

  if (format === "html") {
    const html = htmlDocument(title, content);
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}.html"`,
      },
    });
  }

  const generatedAt = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const parts = parseDocument(content, doc.type);
  const element = React.createElement(DocumentPDF, { parts, generatedAt });
  const buffer = await renderToBuffer(
    element as React.ReactElement<DocumentProps>
  );

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}.pdf"`,
    },
  });
}
