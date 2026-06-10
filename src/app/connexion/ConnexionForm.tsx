"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, useSession } from "@/lib/auth-client";

type Tab = "connexion" | "inscription";

export function ConnexionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [tab, setTab] = useState<Tab>("connexion");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rawRedirect = searchParams.get("redirect") ?? "/dashboard";
  // Uniquement des chemins internes (anti open-redirect)
  const redirect =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/dashboard";

  const redirectedRef = useRef(false);
  const goToRedirect = useCallback(() => {
    if (redirectedRef.current) return;
    redirectedRef.current = true;
    if (redirect.startsWith("/api/")) {
      // Lien de téléchargement direct (ex: email) : déclenche le download
      // puis affiche le dashboard
      window.location.assign(redirect);
      router.replace("/dashboard");
    } else {
      router.replace(redirect);
    }
  }, [redirect, router]);

  useEffect(() => {
    if (session?.user) goToRedirect();
  }, [session, goToRedirect]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === "connexion") {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) {
          setError(res.error.message ?? "Email ou mot de passe incorrect.");
          return;
        }
      } else {
        if (!name.trim()) {
          setError("Veuillez saisir votre prénom ou nom.");
          return;
        }
        const res = await authClient.signUp.email({ email, password, name });
        if (res.error) {
          setError(res.error.message ?? "Impossible de créer le compte.");
          return;
        }
      }
      goToRedirect();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight">
          {tab === "connexion" ? "Connexion" : "Créer un compte"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tab === "connexion"
            ? "Retrouvez vos documents légaux"
            : "Déverrouillez et re-téléchargez vos documents à vie"}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg border border-foreground/10 p-0.5">
        <button
          className={`flex-1 rounded-md py-2 text-xs font-medium transition-colors ${
            tab === "connexion"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => { setTab("connexion"); setError(null); }}
        >
          Connexion
        </button>
        <button
          className={`flex-1 rounded-md py-2 text-xs font-medium transition-colors ${
            tab === "inscription"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => { setTab("inscription"); setError(null); }}
        >
          Créer un compte
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {tab === "inscription" && (
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs">Nom</Label>
            <Input
              id="name"
              type="text"
              placeholder="Jean Dupont"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="jean@exemple.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={tab === "connexion" ? "current-password" : "new-password"}
          />
        </div>

        {error && (
          <p className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading
            ? "Chargement…"
            : tab === "connexion"
            ? "Se connecter"
            : "Créer mon compte"}
        </Button>
      </form>
    </div>
  );
}
