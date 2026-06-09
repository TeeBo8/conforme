"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-white/10">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold tracking-tight shrink-0">
          ConformeFR
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/generateur"
            className="hidden sm:inline text-xs text-muted-foreground transition-colors hover:text-white"
          >
            Générateur
          </Link>
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="text-xs text-muted-foreground transition-colors hover:text-white"
              >
                Mes documents
              </Link>
              <button
                onClick={() => signOut()}
                className="text-xs text-muted-foreground transition-colors hover:text-white"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/connexion"
                className="text-xs text-muted-foreground transition-colors hover:text-white"
              >
                Connexion
              </Link>
              <Link
                href="/generateur"
                className="sm:hidden inline-flex items-center rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5"
              >
                Générer
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
