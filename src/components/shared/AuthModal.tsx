"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

type Tab = "connexion" | "inscription";

export function AuthModal({ onSuccess, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("connexion");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm rounded-xl border border-white/15 bg-black p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold">
            {tab === "connexion" ? "Connexion" : "Créer un compte"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-white transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex rounded-lg border border-white/10 p-0.5">
          <button
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              tab === "connexion"
                ? "bg-white text-black"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => { setTab("connexion"); setError(null); }}
          >
            Connexion
          </button>
          <button
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              tab === "inscription"
                ? "bg-white text-black"
                : "text-muted-foreground hover:text-white"
            }`}
            onClick={() => { setTab("inscription"); setError(null); }}
          >
            Créer un compte
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "inscription" && (
            <div className="space-y-1.5">
              <Label htmlFor="auth-name" className="text-xs">Nom</Label>
              <Input
                id="auth-name"
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
            <Label htmlFor="auth-email" className="text-xs">Email</Label>
            <Input
              id="auth-email"
              type="email"
              placeholder="jean@exemple.fr"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="auth-password" className="text-xs">Mot de passe</Label>
            <Input
              id="auth-password"
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
              ? "Se connecter et payer"
              : "Créer le compte et payer"}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {tab === "connexion" ? (
            <>
              Pas encore de compte ?{" "}
              <button
                className="underline hover:text-white transition-colors"
                onClick={() => { setTab("inscription"); setError(null); }}
              >
                En créer un
              </button>
            </>
          ) : (
            <>
              Déjà un compte ?{" "}
              <button
                className="underline hover:text-white transition-colors"
                onClick={() => { setTab("connexion"); setError(null); }}
              >
                Se connecter
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
