"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScanSite, type SuggestionsScan } from "./ScanSite";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DocumentFormData } from "@/lib/validations/document";
import type { DocumentType, SiteType } from "@/lib/templates/types";
import {
  FORMES_JURIDIQUES,
  HEBERGEURS,
  isEntrepreneurIndividuel,
  isPersonnePhysique,
  isSiretValide,
  isSocieteAvecCapital,
  normaliserSiret,
  type Registre,
} from "@/lib/templates/entites";

interface Props {
  initial?: Partial<DocumentFormData>;
  documentType: DocumentType;
  siteType: SiteType;
  onNext: (data: Partial<DocumentFormData>) => void;
  onBack: () => void;
  /** Suggestions du scan pour les étapes suivantes (données, cookies…) */
  onScan: (suggestions: SuggestionsScan) => void;
}

const REGISTRES: { value: Registre; label: string }[] = [
  { value: "rcs", label: "RCS — activité commerciale ou société" },
  { value: "rne", label: "RNE uniquement — artisan, profession libérale" },
  { value: "aucun", label: "Aucune immatriculation" },
];

type FieldErrors = Record<string, string>;

const needsMentionsLegales = (type: DocumentType) =>
  type === "mentions_legales" || type === "pack";

const isHttpUrl = (v: string) => /^https?:\/\/.+/.test(v);

export function StepEntreprise({ initial, documentType, siteType, onNext, onBack, onScan }: Props) {
  const [fields, setFields] = useState({
    nomEntreprise: initial?.nomEntreprise ?? "",
    nomCommercial: initial?.nomCommercial ?? "",
    formeJuridique: initial?.formeJuridique ?? "",
    capitalSocial: initial?.capitalSocial ?? "",
    siret: initial?.siret ?? "",
    registre: (initial?.registre ?? "") as Registre | "",
    rcsVille: initial?.rcsVille ?? "",
    tvaIntracom: initial?.tvaIntracom ?? "",
    adresse: initial?.adresse ?? "",
    email: initial?.email ?? "",
    telephone: initial?.telephone ?? "",
    urlSite: initial?.urlSite ?? "",
    directeurPublication: initial?.directeurPublication ?? "",
    nomHebergeur: initial?.nomHebergeur ?? "",
    adresseHebergeur: initial?.adresseHebergeur ?? "",
    urlHebergeur: initial?.urlHebergeur ?? "",
    telephoneHebergeur: initial?.telephoneHebergeur ?? "",
    mediateurNom: initial?.mediateurNom ?? "",
    mediateurUrl: initial?.mediateurUrl ?? "",
    cgvUrl: initial?.cgvUrl ?? "",
    activiteDescription: initial?.activiteDescription ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [lastActivite, setLastActivite] = useState<string | undefined>();

  const set = (key: keyof typeof fields, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const forme = fields.formeJuridique;
  const physique = isPersonnePhysique(forme);
  const particulier = forme === "Particulier";
  const showCapital = isSocieteAvecCapital(forme);
  const showML = needsMentionsLegales(documentType);
  const showEcommerce = showML && siteType === "ecommerce";
  // Art. 1-1, I LCEN : téléphone de l'éditeur (sauf particulier non professionnel, art. 1-1, II)
  const telephoneRequis = showML && !particulier;

  function validate(): FieldErrors {
    const errs: FieldErrors = {};
    if (!fields.nomEntreprise) errs.nomEntreprise = "Requis";
    if (!forme) errs.formeJuridique = "Requis";
    if (!fields.adresse) errs.adresse = "Requis";
    if (!fields.email) {
      errs.email = "Requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errs.email = "Email invalide";
    }
    if (telephoneRequis && !fields.telephone) {
      errs.telephone = "Exigé par la loi pour les mentions légales (art. 1-1 LCEN)";
    }
    if (fields.siret && !isSiretValide(fields.siret)) {
      errs.siret = "Un SIRET contient 14 chiffres";
    }
    if (!fields.urlSite) {
      errs.urlSite = "Requis";
    } else if (!isHttpUrl(fields.urlSite)) {
      errs.urlSite = "Doit commencer par https:// (ex: https://monsite.fr)";
    }
    for (const key of ["urlHebergeur", "mediateurUrl", "cgvUrl"] as const) {
      if (fields[key] && !isHttpUrl(fields[key])) errs[key] = "Doit commencer par https://";
    }
    if (!fields.nomHebergeur) errs.nomHebergeur = "Requis";
    if (!fields.adresseHebergeur) errs.adresseHebergeur = "Requis";
    if (showML && !fields.directeurPublication) {
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
    const opt = (v: string) => v.trim() || undefined;
    onNext({
      nomEntreprise: fields.nomEntreprise.trim(),
      nomCommercial: physique ? opt(fields.nomCommercial) : undefined,
      formeJuridique: forme,
      capitalSocial: showCapital ? opt(fields.capitalSocial) : undefined,
      siret: fields.siret ? normaliserSiret(fields.siret) : undefined,
      registre: particulier ? undefined : fields.registre || undefined,
      rcsVille: fields.registre === "rcs" ? opt(fields.rcsVille) : undefined,
      tvaIntracom: particulier ? undefined : opt(fields.tvaIntracom),
      adresse: fields.adresse.trim(),
      email: fields.email.trim(),
      telephone: opt(fields.telephone),
      urlSite: fields.urlSite.trim(),
      directeurPublication: opt(fields.directeurPublication),
      nomHebergeur: fields.nomHebergeur.trim(),
      adresseHebergeur: fields.adresseHebergeur.trim(),
      urlHebergeur: opt(fields.urlHebergeur),
      telephoneHebergeur: opt(fields.telephoneHebergeur),
      mediateurNom: showEcommerce ? opt(fields.mediateurNom) : undefined,
      mediateurUrl: showEcommerce ? opt(fields.mediateurUrl) : undefined,
      cgvUrl: showEcommerce ? opt(fields.cgvUrl) : undefined,
      activiteDescription: showML ? opt(fields.activiteDescription) : undefined,
    });
  }

  // Le scan ne remplit que les champs encore vides : il ne remplace jamais une saisie
  function applyScan(sug: SuggestionsScan) {
    setFields((prev) => {
      const fill = (current: string, value: string | undefined) => current || value || "";
      return {
        ...prev,
        urlSite: fill(prev.urlSite, sug.urlSite),
        email: fill(prev.email, sug.email),
        telephone: fill(prev.telephone, sug.telephone),
        siret: fill(prev.siret, sug.siret),
        activiteDescription: fill(prev.activiteDescription, sug.activite),
        ...(sug.hebergeur && !prev.nomHebergeur
          ? {
              nomHebergeur: sug.hebergeur.nom,
              adresseHebergeur: fill(prev.adresseHebergeur, sug.hebergeur.adresse),
              urlHebergeur: fill(prev.urlHebergeur, sug.hebergeur.url),
              telephoneHebergeur: fill(prev.telephoneHebergeur, sug.hebergeur.telephone),
            }
          : {}),
      };
    });
    setErrors({});
    setLastActivite(sug.activite);
    onScan(sug);
  }

  function applyHebergeur(nom: string) {
    const h = HEBERGEURS.find((x) => x.nom === nom);
    if (!h) return;
    setFields((prev) => ({
      ...prev,
      nomHebergeur: h.nom,
      adresseHebergeur: h.adresse,
      urlHebergeur: h.url,
      telephoneHebergeur: h.telephone ?? "",
    }));
    setErrors((prev) => ({ ...prev, nomHebergeur: "", adresseHebergeur: "" }));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Informations sur l&apos;éditeur du site</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Ces informations seront intégrées directement dans votre document légal.
        </p>
      </div>

      <ScanSite initialUrl={fields.urlSite} onResult={applyScan} />

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Identité
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Forme juridique *" error={errors.formeJuridique}>
            <Select value={forme} onValueChange={(v) => set("formeJuridique", v)}>
              <SelectTrigger aria-label="Forme juridique">
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

          <Field
            label={physique ? "Nom et prénom *" : "Dénomination sociale *"}
            error={errors.nomEntreprise}
            hint={
              isEntrepreneurIndividuel(forme)
                ? "La mention « EI » sera ajoutée automatiquement (art. R526-27 du Code de commerce)."
                : undefined
            }
          >
            <Input
              value={fields.nomEntreprise}
              onChange={(e) => set("nomEntreprise", e.target.value)}
              placeholder={physique ? "Ex : Jean Dupont" : "Ex : Dupont Design SAS"}
            />
          </Field>

          {physique && !particulier && (
            <Field label="Nom commercial" error="">
              <Input
                value={fields.nomCommercial}
                onChange={(e) => set("nomCommercial", e.target.value)}
                placeholder="Ex : Dupont Design"
              />
            </Field>
          )}

          {showCapital && (
            <Field label="Capital social (€)" error={errors.capitalSocial}>
              <Input
                value={fields.capitalSocial}
                onChange={(e) => set("capitalSocial", e.target.value)}
                placeholder="Ex : 1000"
              />
            </Field>
          )}

          {!particulier && (
            <>
              <Field label="SIRET" error={errors.siret}>
                <Input
                  value={fields.siret}
                  onChange={(e) => set("siret", e.target.value)}
                  placeholder="Ex : 123 456 789 00012"
                  inputMode="numeric"
                />
              </Field>

              <Field label="Immatriculation" error="">
                <Select
                  value={fields.registre}
                  onValueChange={(v) => set("registre", v)}
                >
                  <SelectTrigger aria-label="Immatriculation">
                    <SelectValue placeholder="Choisir…" />
                  </SelectTrigger>
                  <SelectContent>
                    {REGISTRES.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {fields.registre === "rcs" && (
                <Field label="Ville du greffe (RCS)" error="">
                  <Input
                    value={fields.rcsVille}
                    onChange={(e) => set("rcsVille", e.target.value)}
                    placeholder="Ex : Bordeaux"
                  />
                </Field>
              )}

              <Field label="N° de TVA intracommunautaire" error="" hint="Seulement si vous êtes assujetti à la TVA.">
                <Input
                  value={fields.tvaIntracom}
                  onChange={(e) => set("tvaIntracom", e.target.value)}
                  placeholder="Ex : FR12345678901"
                />
              </Field>
            </>
          )}
        </div>

        <Field
          label={physique ? "Adresse *" : "Adresse du siège social *"}
          error={errors.adresse}
          hint={physique ? "Votre domicile, ou l'adresse de votre société de domiciliation." : undefined}
        >
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

          <Field
            label={telephoneRequis ? "Téléphone *" : "Téléphone"}
            error={errors.telephone}
            hint={telephoneRequis ? "Un numéro professionnel suffit." : undefined}
          >
            <Input
              type="tel"
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

        {showML && (
          <Field
            label="Activité (facultatif)"
            error=""
            hint={
              fields.activiteDescription && fields.activiteDescription === (lastActivite ?? "")
                ? "Proposé par l'IA à partir du texte de votre site : relisez et corrigez si besoin."
                : "Une ou deux phrases sur ce que fait votre entreprise. Laissez vide pour ne pas afficher cette rubrique."
            }
          >
            <Textarea
              value={fields.activiteDescription}
              onChange={(e) => set("activiteDescription", e.target.value)}
              placeholder="Ex : Fabrication de meubles sur mesure en bois massif."
              maxLength={600}
              rows={2}
            />
          </Field>
        )}

        {showML && (
          <Field label="Directeur de la publication *" error={errors.directeurPublication}>
            <Input
              value={fields.directeurPublication}
              onChange={(e) => set("directeurPublication", e.target.value)}
              placeholder="Prénom Nom"
            />
          </Field>
        )}
      </div>

      {showEcommerce && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Vente en ligne
          </h3>
          <p className="text-xs text-muted-foreground">
            Si vous vendez à des particuliers, les coordonnées de votre médiateur de la
            consommation doivent figurer sur votre site (art. L616-1 du Code de la consommation).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Médiateur de la consommation" error="">
              <Input
                value={fields.mediateurNom}
                onChange={(e) => set("mediateurNom", e.target.value)}
                placeholder="Nom et adresse du médiateur"
              />
            </Field>
            <Field label="Site du médiateur" error={errors.mediateurUrl}>
              <Input
                value={fields.mediateurUrl}
                onChange={(e) => set("mediateurUrl", e.target.value)}
                placeholder="https://…"
              />
            </Field>
          </div>
          <Field label="Adresse de vos CGV" error={errors.cgvUrl}>
            <Input
              value={fields.cgvUrl}
              onChange={(e) => set("cgvUrl", e.target.value)}
              placeholder="https://monsite.fr/cgv"
            />
          </Field>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Hébergeur
        </h3>

        <Field label="Hébergeur connu" error="">
          <Select onValueChange={applyHebergeur}>
            <SelectTrigger aria-label="Hébergeur connu">
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
              placeholder="Ex : OVH SAS"
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

        {showML && (
          <Field
            label="Téléphone de l'hébergeur"
            error=""
            hint="Exigé par la loi (art. 1-1 LCEN) : reprenez celui publié par votre hébergeur, sur ses propres mentions légales."
          >
            <Input
              type="tel"
              value={fields.telephoneHebergeur}
              onChange={(e) => set("telephoneHebergeur", e.target.value)}
              placeholder="Ex : 0970 808 911"
            />
          </Field>
        )}
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
  hint,
  children,
}: {
  label: string;
  error: string | undefined;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
