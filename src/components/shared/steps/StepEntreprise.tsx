"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocumentFormData } from "@/lib/validations/document";
import type { DocumentType, SiteType } from "@/lib/templates/types";

interface Props {
  initial?: Partial<DocumentFormData>;
  documentType: DocumentType;
  siteType: SiteType;
  onNext: (data: Partial<DocumentFormData>) => void;
  onBack: () => void;
}

const FORMES_JURIDIQUES = [
  "Auto-entrepreneur / Micro-entreprise",
  "Entreprise individuelle (EI)",
  "EURL",
  "SARL",
  "SAS",
  "SASU",
  "SA",
  "Association (loi 1901)",
  "Particulier",
];

const FORMES_AVEC_CAPITAL = ["EURL", "SARL", "SAS", "SASU", "SA"];

const HEBERGEURS = [
  { nom: "Vercel", adresse: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis", url: "https://vercel.com" },
  { nom: "OVHcloud", adresse: "2 rue Kellermann, 59100 Roubaix, France", url: "https://www.ovhcloud.com" },
  { nom: "o2switch", adresse: "222-224 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France", url: "https://www.o2switch.fr" },
  { nom: "Netlify", adresse: "44 Montgomery Street, Suite 300, San Francisco, CA 94104, États-Unis", url: "https://www.netlify.com" },
  { nom: "Ionos", adresse: "7 Place de la Gare, 57200 Sarreguemines, France", url: "https://www.ionos.fr" },
  { nom: "Scaleway", adresse: "8 rue de la Ville l'Évêque, 75008 Paris, France", url: "https://www.scaleway.com" },
  { nom: "Infomaniak", adresse: "Rue Eugène-Marziano 25, 1227 Genève, Suisse", url: "https://www.infomaniak.com" },
  { nom: "Cloudflare", adresse: "101 Townsend St, San Francisco, CA 94107, États-Unis", url: "https://www.cloudflare.com" },
  { nom: "AWS (Amazon)", adresse: "410 Terry Ave N, Seattle, WA 98109, États-Unis", url: "https://aws.amazon.com" },
];

type FieldErrors = Record<string, string>;

const needsMentionsLegales = (type: DocumentType) =>
  type === "mentions_legales" || type === "pack";

export function StepEntreprise({ initial, documentType, onNext, onBack }: Props) {
  const [fields, setFields] = useState({
    nomEntreprise: initial?.nomEntreprise ?? "",
    formeJuridique: initial?.formeJuridique ?? "",
    capitalSocial: initial?.capitalSocial ?? "",
    siret: initial?.siret ?? "",
    rcsVille: initial?.rcsVille ?? "",
    adresse: initial?.adresse ?? "",
    email: initial?.email ?? "",
    telephone: initial?.telephone ?? "",
    urlSite: initial?.urlSite ?? "",
    directeurPublication: initial?.directeurPublication ?? "",
    nomHebergeur: initial?.nomHebergeur ?? "",
    adresseHebergeur: initial?.adresseHebergeur ?? "",
    urlHebergeur: initial?.urlHebergeur ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const set = (key: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const showCapital = FORMES_AVEC_CAPITAL.some((f) =>
    fields.formeJuridique.includes(f)
  );
  const showDirecteur = needsMentionsLegales(documentType);

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!fields.nomEntreprise) errs.nomEntreprise = "Requis";
    if (!fields.formeJuridique) errs.formeJuridique = "Requis";
    if (!fields.adresse) errs.adresse = "Requis";
    if (!fields.email) {
      errs.email = "Requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = "Email invalide";
    }
    if (!fields.urlSite) {
      errs.urlSite = "Requis";
    } else if (!/^https?:\/\/.+/.test(fields.urlSite)) {
      errs.urlSite = "Doit commencer par https:// (ex: https://monsite.fr)";
    }
    if (!fields.nomHebergeur) errs.nomHebergeur = "Requis";
    if (!fields.adresseHebergeur) errs.adresseHebergeur = "Requis";
    if (showDirecteur && !fields.directeurPublication) {
      errs.directeurPublication = "Requis pour les mentions légales";
    }
    return errs;
  }

  function handleNext() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext({
      nomEntreprise: fields.nomEntreprise,
      formeJuridique: fields.formeJuridique,
      capitalSocial: fields.capitalSocial || undefined,
      siret: fields.siret || undefined,
      rcsVille: fields.rcsVille || undefined,
      adresse: fields.adresse,
      email: fields.email,
      telephone: fields.telephone || undefined,
      urlSite: fields.urlSite,
      directeurPublication: fields.directeurPublication || undefined,
      nomHebergeur: fields.nomHebergeur,
      adresseHebergeur: fields.adresseHebergeur,
      urlHebergeur: fields.urlHebergeur || undefined,
    });
  }

  function applyHebergeur(nom: string) {
    const h = HEBERGEURS.find((x) => x.nom === nom);
    if (h) {
      setFields((prev) => ({
        ...prev,
        nomHebergeur: h.nom,
        adresseHebergeur: h.adresse,
        urlHebergeur: h.url,
      }));
      setErrors((prev) => ({
        ...prev,
        nomHebergeur: "",
        adresseHebergeur: "",
      }));
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Informations sur votre entreprise</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Ces informations seront intégrées directement dans votre document légal.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Identité
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom de l'entreprise *" error={errors.nomEntreprise}>
            <Input
              value={fields.nomEntreprise}
              onChange={(e) => set("nomEntreprise", e.target.value)}
              placeholder="Ex : Studio Leture"
            />
          </Field>

          <Field label="Forme juridique *" error={errors.formeJuridique}>
            <Select
              value={fields.formeJuridique}
              onValueChange={(v) => set("formeJuridique", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir…" />
              </SelectTrigger>
              <SelectContent>
                {FORMES_JURIDIQUES.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {showCapital && (
            <Field label="Capital social (€)" error={errors.capitalSocial}>
              <Input
                value={fields.capitalSocial}
                onChange={(e) => set("capitalSocial", e.target.value)}
                placeholder="Ex : 1000"
              />
            </Field>
          )}

          <Field label="SIRET" error={errors.siret}>
            <Input
              value={fields.siret}
              onChange={(e) => set("siret", e.target.value)}
              placeholder="Ex : 123 456 789 00012"
            />
          </Field>

          <Field label="Ville d'immatriculation RCS" error={errors.rcsVille}>
            <Input
              value={fields.rcsVille}
              onChange={(e) => set("rcsVille", e.target.value)}
              placeholder="Ex : Paris"
            />
          </Field>
        </div>

        <Field label="Adresse du siège social *" error={errors.adresse}>
          <Input
            value={fields.adresse}
            onChange={(e) => set("adresse", e.target.value)}
            placeholder="Ex : 12 rue de la Paix, 75001 Paris"
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Email de contact *" error={errors.email}>
            <Input
              type="email"
              value={fields.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="contact@monsite.fr"
            />
          </Field>

          <Field label="Téléphone" error={errors.telephone}>
            <Input
              value={fields.telephone}
              onChange={(e) => set("telephone", e.target.value)}
              placeholder="Ex : 01 23 45 67 89"
            />
          </Field>
        </div>

        <Field label="URL du site web *" error={errors.urlSite}>
          <Input
            value={fields.urlSite}
            onChange={(e) => set("urlSite", e.target.value)}
            placeholder="https://monsite.fr"
          />
        </Field>

        {showDirecteur && (
          <Field label="Directeur de la publication *" error={errors.directeurPublication}>
            <Input
              value={fields.directeurPublication}
              onChange={(e) => set("directeurPublication", e.target.value)}
              placeholder="Prénom Nom"
            />
          </Field>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Hébergeur
        </h3>

        <Field label="Hébergeur connu" error="">
          <Select onValueChange={applyHebergeur}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un hébergeur connu (optionnel)…" />
            </SelectTrigger>
            <SelectContent>
              {HEBERGEURS.map((h) => (
                <SelectItem key={h.nom} value={h.nom}>
                  {h.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Nom de l'hébergeur *" error={errors.nomHebergeur}>
            <Input
              value={fields.nomHebergeur}
              onChange={(e) => set("nomHebergeur", e.target.value)}
              placeholder="Ex : OVHcloud"
            />
          </Field>

          <Field label="URL de l'hébergeur" error={errors.urlHebergeur}>
            <Input
              value={fields.urlHebergeur}
              onChange={(e) => set("urlHebergeur", e.target.value)}
              placeholder="https://www.ovhcloud.com"
            />
          </Field>
        </div>

        <Field label="Adresse de l'hébergeur *" error={errors.adresseHebergeur}>
          <Input
            value={fields.adresseHebergeur}
            onChange={(e) => set("adresseHebergeur", e.target.value)}
            placeholder="Ex : 2 rue Kellermann, 59100 Roubaix, France"
          />
        </Field>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button onClick={handleNext}>Continuer</Button>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
