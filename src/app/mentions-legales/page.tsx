import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — ConformeFR",
  description: "Mentions légales du site conformefr.com, outil gratuit édité à titre non professionnel.",
};

const CONTACT = "contact@teebostudio.fr";

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold mb-2">Mentions légales</h1>
      <p className="text-muted-foreground text-sm mb-8">Dernière mise à jour : 24 septembre 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-foreground">
        <p className="text-muted-foreground">
          Les présentes mentions légales concernent le site <strong>conformefr.com</strong>, en
          application de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie
          numérique (LCEN).
        </p>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">1. Éditeur du site</h2>
          <p>
            ConformeFR est un outil gratuit, sans activité commerciale, édité à titre non
            professionnel par Thibault Leture, développeur (particulier). Conformément à
            l&apos;article 1-1, II de la LCEN, ses coordonnées personnelles ne sont pas publiées :
            l&apos;hébergeur est identifié ci-dessous.
          </p>
          <p>
            Contact :{" "}
            <a href={`mailto:${CONTACT}`} className="underline hover:text-primary">
              {CONTACT}
            </a>
          </p>
          <p>Directeur de la publication : Thibault Leture</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">2. Hébergeur</h2>
          <p>Vercel Inc.</p>
          <p>440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis</p>
          <p>
            Contact publié par l&apos;hébergeur :{" "}
            <a href="mailto:privacy@vercel.com" className="underline hover:text-primary">
              privacy@vercel.com
            </a>{" "}
            —{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              vercel.com
            </a>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">3. Documents générés</h2>
          <p>
            Les documents produits par ConformeFR sont générés automatiquement à partir des
            informations que vous saisissez. Ils sont fournis gratuitement, à titre informatif, et
            ne constituent pas un conseil juridique. Relisez-les avant de les publier et, pour une
            situation complexe ou une activité réglementée, faites-les vérifier par un
            professionnel du droit.
          </p>
          <p>
            Vous pouvez librement utiliser, modifier et publier les documents générés pour votre
            propre site.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">4. Propriété intellectuelle</h2>
          <p>
            Les autres contenus du site (textes, interface, code) appartiennent à Thibault Leture,
            sauf mention contraire. Leur reproduction est interdite sans autorisation écrite.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">5. Données personnelles et cookies</h2>
          <p>
            Le traitement des données personnelles et l&apos;usage des cookies sont détaillés dans
            la{" "}
            <a href="/politique-confidentialite" className="underline hover:text-primary">
              politique de confidentialité
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-semibold text-base">6. Contact et retours</h2>
          <p>
            Une question, une erreur repérée dans un document, une suggestion ? Écrivez à{" "}
            <a
              href={`mailto:${CONTACT}?subject=ConformeFR%20%E2%80%94%20retour`}
              className="underline hover:text-primary"
            >
              {CONTACT}
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
