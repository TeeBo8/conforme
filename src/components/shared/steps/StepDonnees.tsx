"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DocumentFormData } from "@/lib/validations/document";
import type { DonneeCollectee, Finalite, TypeCookie, SiteType } from "@/lib/templates/types";

interface Props {
  initial?: Partial<DocumentFormData>;
  siteType: SiteType;
  onNext: (data: Partial<DocumentFormData>) => void;
  onBack: () => void;
}

const DONNEES_OPTIONS: { value: DonneeCollectee; label: string }[] = [
  { value: "email", label: "Adresse email" },
  { value: "nom_prenom", label: "Nom et prénom" },
  { value: "telephone", label: "Numéro de téléphone" },
  { value: "adresse_postale", label: "Adresse postale" },
  { value: "donnees_paiement", label: "Données de paiement" },
  { value: "donnees_compte", label: "Données de compte" },
  { value: "donnees_navigation", label: "Données de navigation" },
  { value: "logs_techniques", label: "Journaux techniques" },
  { value: "adresse_ip", label: "Adresse IP" },
  { value: "cookies", label: "Cookies et traceurs" },
];

const FINALITES_OPTIONS: { value: Finalite; label: string }[] = [
  { value: "gestion_commandes", label: "Gestion des commandes" },
  { value: "envoi_newsletter", label: "Envoi de newsletter" },
  { value: "support_client", label: "Support client" },
  { value: "statistiques", label: "Statistiques d'audience" },
  { value: "personnalisation", label: "Personnalisation" },
  { value: "facturation", label: "Facturation" },
  { value: "compte_utilisateur", label: "Gestion des comptes" },
  { value: "securite", label: "Sécurité du site" },
];

const COOKIES_OPTIONS: { value: TypeCookie; label: string }[] = [
  { value: "analytics", label: "Analytiques (audience)" },
  { value: "fonctionnels", label: "Fonctionnels (préférences)" },
  { value: "publicitaires", label: "Publicitaires (annonces)" },
  { value: "tiers", label: "Tiers (services intégrés)" },
];

const DUREES_OPTIONS = ["6 mois", "1 an", "2 ans", "3 ans", "5 ans", "10 ans"];

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

export function StepDonnees({ initial, onNext, onBack }: Props) {
  const [donneesCollectees, setDonnees] = useState<DonneeCollectee[]>(
    (initial?.donneesCollectees as DonneeCollectee[]) ?? []
  );
  const [finalites, setFinalites] = useState<Finalite[]>(
    (initial?.finalites as Finalite[]) ?? []
  );
  const [cookiesUtilises, setCookies] = useState<boolean>(
    initial?.cookiesUtilises ?? false
  );
  const [typesCookies, setTypesCookies] = useState<TypeCookie[]>(
    (initial?.typesCookies as TypeCookie[]) ?? []
  );
  const [dureeConservation, setDuree] = useState(initial?.dureeConservation ?? "");
  const [dureeCustom, setDureeCustom] = useState(
    initial?.dureeConservation && !DUREES_OPTIONS.includes(initial.dureeConservation)
      ? initial.dureeConservation
      : ""
  );
  const [transfertHorsUE, setTransfert] = useState<boolean>(
    initial?.transfertHorsUE ?? false
  );
  const [paysTransfert, setPays] = useState(initial?.paysTransfert ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const effectiveDuree = dureeConservation === "autre" ? dureeCustom : dureeConservation;

  function validate() {
    const errs: Record<string, string> = {};
    if (donneesCollectees.length === 0)
      errs.donnees = "Sélectionnez au moins une donnée collectée";
    if (finalites.length === 0)
      errs.finalites = "Sélectionnez au moins une finalité";
    if (!effectiveDuree) errs.duree = "Requis";
    return errs;
  }

  function handleNext() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onNext({
      donneesCollectees,
      finalites,
      cookiesUtilises,
      typesCookies: cookiesUtilises ? typesCookies : undefined,
      dureeConservation: effectiveDuree,
      transfertHorsUE,
      paysTransfert: transfertHorsUE ? paysTransfert : undefined,
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Données collectées et finalités</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Ces informations structurent votre politique de confidentialité.
        </p>
      </div>

      {/* Données collectées */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Données personnelles collectées *</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Cochez toutes les données que vous collectez sur vos utilisateurs.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {DONNEES_OPTIONS.map((opt) => (
            <ToggleChip
              key={opt.value}
              label={opt.label}
              selected={donneesCollectees.includes(opt.value)}
              onToggle={() => {
                setDonnees((prev) => toggle(prev, opt.value));
                setErrors((prev) => ({ ...prev, donnees: "" }));
              }}
            />
          ))}
        </div>
        {errors.donnees && <p className="text-xs text-destructive">{errors.donnees}</p>}
      </div>

      {/* Finalités */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Finalités du traitement *</Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Pourquoi collectez-vous ces données ?
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {FINALITES_OPTIONS.map((opt) => (
            <ToggleChip
              key={opt.value}
              label={opt.label}
              selected={finalites.includes(opt.value)}
              onToggle={() => {
                setFinalites((prev) => toggle(prev, opt.value));
                setErrors((prev) => ({ ...prev, finalites: "" }));
              }}
            />
          ))}
        </div>
        {errors.finalites && <p className="text-xs text-destructive">{errors.finalites}</p>}
      </div>

      {/* Durée de conservation */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Durée de conservation des données *</Label>
        <div className="flex flex-wrap gap-2">
          {DUREES_OPTIONS.map((d) => (
            <ToggleChip
              key={d}
              label={d}
              selected={dureeConservation === d}
              onToggle={() => {
                setDuree(d);
                setErrors((prev) => ({ ...prev, duree: "" }));
              }}
            />
          ))}
          <ToggleChip
            label="Autre"
            selected={dureeConservation === "autre"}
            onToggle={() => {
              setDuree("autre");
              setErrors((prev) => ({ ...prev, duree: "" }));
            }}
          />
        </div>
        {dureeConservation === "autre" && (
          <Input
            value={dureeCustom}
            onChange={(e) => {
              setDureeCustom(e.target.value);
              setErrors((prev) => ({ ...prev, duree: "" }));
            }}
            placeholder="Ex : 18 mois"
            className="max-w-48"
          />
        )}
        {errors.duree && <p className="text-xs text-destructive">{errors.duree}</p>}
      </div>

      {/* Cookies */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Votre site utilise-t-il des cookies ?</Label>
        <div className="flex gap-2">
          <ToggleChip
            label="Oui"
            selected={cookiesUtilises === true}
            onToggle={() => setCookies(true)}
          />
          <ToggleChip
            label="Non"
            selected={cookiesUtilises === false}
            onToggle={() => setCookies(false)}
          />
        </div>
        {cookiesUtilises && (
          <div className="space-y-2 pt-1">
            <p className="text-xs text-muted-foreground">Types de cookies utilisés :</p>
            <div className="flex flex-wrap gap-2">
              {COOKIES_OPTIONS.map((opt) => (
                <ToggleChip
                  key={opt.value}
                  label={opt.label}
                  selected={typesCookies.includes(opt.value)}
                  onToggle={() => setTypesCookies((prev) => toggle(prev, opt.value))}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Transfert hors UE */}
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">
            Vos données sont-elles transférées hors de l&apos;UE ?
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ex : hébergeur américain, outil analytics US…
          </p>
        </div>
        <div className="flex gap-2">
          <ToggleChip
            label="Oui"
            selected={transfertHorsUE === true}
            onToggle={() => setTransfert(true)}
          />
          <ToggleChip
            label="Non"
            selected={transfertHorsUE === false}
            onToggle={() => setTransfert(false)}
          />
        </div>
        {transfertHorsUE && (
          <Input
            value={paysTransfert}
            onChange={(e) => setPays(e.target.value)}
            placeholder="Ex : États-Unis, Inde"
            className="max-w-xs"
          />
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

function ToggleChip({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
        selected
          ? "border-white bg-white/10 text-white"
          : "border-border text-muted-foreground hover:border-white/40 hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}
