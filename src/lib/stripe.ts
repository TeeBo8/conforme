import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (_stripe) return _stripe;
  const key = process.env.STRIPE_SECRET_KEY?.replace(/^﻿/, "").trim();
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  _stripe = new Stripe(key, { apiVersion: "2026-05-27.dahlia" });
  return _stripe;
}

export const PRICES = {
  mentions_legales: 1900,
  politique_confidentialite: 1900,
  pack: 2900,
} as const;

export function getPriceForType(
  type: "mentions_legales" | "politique_confidentialite" | "pack"
): number {
  return PRICES[type];
}

export function getLabelForType(
  type: "mentions_legales" | "politique_confidentialite" | "pack"
): string {
  const labels = {
    mentions_legales: "Mentions légales",
    politique_confidentialite: "Politique de confidentialité",
    pack: "Pack complet (mentions légales + politique de confidentialité)",
  };
  return labels[type];
}
