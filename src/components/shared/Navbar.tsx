"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
      aria-label="Basculer le thème"
    >
      {resolvedTheme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-border">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="text-sm font-semibold tracking-tight shrink-0">
          ConformeFR
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/generateur"
            className="hidden sm:inline text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Générateur
          </Link>
          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Mes documents
              </Link>
              <button
                onClick={() => signOut()}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                href="/generateur"
                className="sm:hidden inline-flex items-center rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent"
              >
                Générer
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
