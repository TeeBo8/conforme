// Les champs du formulaire (et le texte IA) sont injectés dans du HTML rendu
// via dangerouslySetInnerHTML : tout doit être échappé avant interpolation.

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ENTITIES[c] ?? c);
}

/** URL utilisable dans un href : uniquement http(s), sinon undefined. */
export function safeHttpUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

/** Échappe toutes les valeurs string d'un objet (les tableaux de strings aussi). */
export function escapeVars<T extends object>(vars: T): T {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(vars)) {
    if (typeof value === "string") out[key] = escapeHtml(value);
    else if (Array.isArray(value))
      out[key] = value.map((v) => (typeof v === "string" ? escapeHtml(v) : v));
    else out[key] = value;
  }
  return out as T;
}
