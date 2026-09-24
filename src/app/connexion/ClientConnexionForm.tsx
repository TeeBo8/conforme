"use client";

import dynamic from "next/dynamic";

// better-auth est externalisé côté serveur (serverExternalPackages) : son hook
// useSession plante au rendu SSR (2e copie de React). Même contournement que ClientNavbar.
const ConnexionForm = dynamic(
  () => import("./ConnexionForm").then((m) => ({ default: m.ConnexionForm })),
  { ssr: false, loading: () => <div className="h-96 w-full max-w-sm" /> }
);

export function ClientConnexionForm() {
  return <ConnexionForm />;
}
