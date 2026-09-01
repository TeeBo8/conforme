"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

export function TrackPurchase({ documentType }: { documentType: string }) {
  useEffect(() => {
    track("Paiement réussi", { documentType });
  }, [documentType]);

  return null;
}
