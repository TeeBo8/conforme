import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY?.replace(/^﻿/, "").trim();
  return new Resend(key);
}

interface SendDocumentUnlockedParams {
  to: string;
  downloadUrl: string;
}

export async function sendDocumentUnlocked({ to, downloadUrl }: SendDocumentUnlockedParams) {
  await getResend().emails.send({
    from: "ConformeFR <noreply@conformefr.com>",
    to,
    subject: "Votre document légal est prêt — ConformeFR",
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <head><meta charset="UTF-8" /></head>
      <body style="font-family: system-ui, sans-serif; background: #fff; color: #111; max-width: 520px; margin: 0 auto; padding: 32px 24px;">
        <h1 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">Votre document est prêt ✓</h1>
        <p style="color: #555; margin-bottom: 24px;">Merci pour votre achat. Votre document légal est maintenant débloqué et téléchargeable à vie.</p>
        <a href="${downloadUrl}?format=pdf" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;margin-bottom:12px;">
          Télécharger le PDF →
        </a>
        <p style="color: #888; font-size: 13px; margin-top: 24px;">
          Vous pouvez aussi accéder à votre document HTML depuis ce lien :<br />
          <a href="${downloadUrl}?format=html" style="color: #555;">${downloadUrl}?format=html</a>
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="color: #aaa; font-size: 12px;">ConformeFR — Générateur de documents légaux conformes au droit français.</p>
      </body>
      </html>
    `,
  });
}
