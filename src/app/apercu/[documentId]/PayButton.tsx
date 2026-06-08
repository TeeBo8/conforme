"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/trpc";
import { useSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/shared/AuthModal";

interface Props {
  documentId: string;
  price: string;
  size?: "sm" | "lg";
}

export function PayButton({ documentId, price, size = "sm" }: Props) {
  const { data: session } = useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = api.order.createOrder.useMutation({
    onSuccess({ checkoutUrl }) {
      window.location.href = checkoutUrl;
    },
    onError(err) {
      setError(err.message ?? "Une erreur est survenue.");
    },
  });

  function handleClick() {
    setError(null);
    if (!session?.user) {
      setShowAuth(true);
      return;
    }
    mutation.mutate({ documentId });
  }

  function handleAuthSuccess() {
    setShowAuth(false);
    mutation.mutate({ documentId });
  }

  return (
    <>
      <div className="flex flex-col items-center gap-1.5">
        <Button
          size={size}
          disabled={mutation.isPending}
          onClick={handleClick}
          className={size === "lg" ? "min-w-44 text-base" : ""}
        >
          {mutation.isPending
            ? "Chargement…"
            : `${size === "lg" ? "Payer " : "Débloquer — "}${price}`}
          {size === "lg" && !mutation.isPending && " →"}
        </Button>
        {error && (
          <p className="text-xs text-red-400 text-center max-w-xs">{error}</p>
        )}
      </div>

      {showAuth && (
        <AuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}
