// Stub to prevent Turbopack from tracing @better-auth/kysely-adapter's SQLite
// dialect files (which import missing exports from kysely 0.29.x).
// BetterAuth only calls getKyselyDatabaseType(); returning undefined is fine
// because we use the Drizzle adapter, not the Kysely adapter.
export function getKyselyDatabaseType() {
  return undefined;
}
export function createKyselyAdapter() {
  return null;
}
export const kyselyAdapter = null;
