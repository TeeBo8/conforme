"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
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

  const mutation = api.order.createOrder.useMutation({
    onSuccess({ checkoutUrl }) {
      window.location.href = checkoutUrl;
    },
    onError(err) {
      toast.error(err.message ?? "Une erreur est survenue. Veuillez réessayer.");
    },
  });

  function handleClick() {
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
      <Button
        size={size}
        disabled={mutation.isPending}
        onClick={handleClick}
        className={`gap-2 ${size === "lg" ? "min-w-44 text-base" : ""}`}
      >
        {mutation.isPending && <Spinner size="sm" />}
        {mutation.isPending
          ? "Chargement…"
          : `${size === "lg" ? "Payer " : "Débloquer — "}${price}`}
        {size === "lg" && !mutation.isPending && " →"}
      </Button>

      {showAuth && (
        <AuthModal
          onSuccess={handleAuthSuccess}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}
