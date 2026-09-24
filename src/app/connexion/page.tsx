import type { Metadata } from "next";
import { ClientConnexionForm } from "./ClientConnexionForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connexion — ConformeFR",
  robots: "noindex",
};

export default function ConnexionPage() {
  return (
    <main className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4">
      <ClientConnexionForm />
    </main>
  );
}
