import Anthropic from "@anthropic-ai/sdk";

// Point d'entrée unique vers Claude : même délai, même journalisation des
// échecs, même nettoyage de la réponse, pour toutes les fonctionnalités.

const MODEL = "claude-haiku-4-5-20251001";

/** Une clé copiée depuis un fichier peut commencer par un BOM invisible, refusé dans l'en-tête HTTP. */
export function cleanApiKey(raw: string | undefined): string | undefined {
  return raw?.replace(/^﻿/, "").trim() || undefined;
}

export async function callClaude(
  prompt: string,
  { label, maxTokens = 256, system }: { label: string; maxTokens?: number; system?: string }
): Promise<string | undefined> {
  const apiKey = cleanApiKey(process.env.ANTHROPIC_API_KEY);
  if (!apiKey) return undefined;
  try {
    const client = new Anthropic({
      apiKey,
      timeout: 15_000,
      maxRetries: 1,
    });
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: maxTokens,
      ...(system ? { system } : {}),
      messages: [{ role: "user", content: prompt }],
    });
    const block = msg.content[0];
    return block?.type === "text" ? block.text : undefined;
  } catch (err) {
    // La fonctionnalité continue sans l'IA, mais l'échec doit être visible dans les logs
    console.error(`[${label}] appel IA échoué :`, err);
    return undefined;
  }
}

/** Le texte IA est inséré comme un paragraphe : on retire le markdown (titres, gras, puces). */
export function toPlainText(text: string | undefined): string | undefined {
  if (!text) return undefined;
  const plain = text
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .map((line) => line.replace(/^\s*[-•]\s+/, ""))
    .join(" ")
    .replace(/[*_`]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain || undefined;
}
