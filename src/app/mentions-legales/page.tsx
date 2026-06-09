import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — ConformeFR",
  description: "Mentions légales du site conformefr.com, conformément à la loi LCEN du 21 juin 2004.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold mb-8">Mentions légales</h1>

      <div className="space-y-8 text-sm leading-relaxed text-foreground">
        <p className="text-muted-foreground">
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance
          en l&apos;économie numérique (LCEN), les présentes mentions légales concernent le site{" "}
          <strong>conformefr.com</strong>.
        </p>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">1. Éditeur du site</h2>
          <p>Nom : Leture Thibault</p>
          <p>Statut : Personne physique</p>
          <p>Adresse : 28 rue de la Pépinière, 75008 Paris</p>
          <p>
            Email :{" "}
            <a href="mailto:contact@teebostudio.fr" className="underline hover:text-primary">
              contact@teebostudio.fr
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">2. Directeur de la publication</h2>
          <p>Leture Thibault</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">3. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <p>Vercel Inc.</p>
          <p>340 Pine Street, Suite 2600</p>
          <p>San Francisco, CA 94104 — États-Unis</p>
          <p>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              https://vercel.com
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">4. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, interface, code) est la propriété de
            Leture Thibault, sauf mention contraire. Toute reproduction, même partielle, est
            interdite sans autorisation préalable écrite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">5. Données personnelles</h2>
          <p>
            Le traitement des données personnelles collectées sur ce site est détaillé dans notre{" "}
            <a href="/politique-confidentialite" className="underline hover:text-primary">
              Politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">6. Cookies</h2>
          <p>
            Ce site n&apos;utilise pas de cookies publicitaires ou de traçage tiers. Un cookie de
            session est utilisé pour maintenir la connexion de l&apos;utilisateur authentifié.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">7. Contact</h2>
          <p>
            Pour toute question relative au site :{" "}
            <a href="mailto:contact@teebostudio.fr" className="underline hover:text-primary">
              contact@teebostudio.fr
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
