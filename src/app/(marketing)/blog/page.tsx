import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/content/blog/registry";

export const metadata: Metadata = {
  title: "Blog — Droit du web pour entrepreneurs | ConformeFR",
  description:
    "Conseils pratiques sur le droit du web français : mentions légales, RGPD, cookies, e-commerce. Guides simples pour entrepreneurs et indépendants.",
  alternates: { canonical: "/blog" },
};

const upcoming = [
  { title: "Auto-entrepreneur : les 3 documents légaux obligatoires pour votre site", tag: "Auto-entrepreneur" },
  { title: "Site vitrine : êtes-vous en règle ? Checklist en 10 points", tag: "Site vitrine" },
  { title: "E-commerce : mentions légales + CGV, ce qui change", tag: "E-commerce" },
  { title: "Hébergeur, directeur de publication, SIRET : qui mettre dans vos mentions légales ?", tag: "Mentions légales" },
  { title: "Copier les mentions légales d'un concurrent : pourquoi c'est une (très) mauvaise idée", tag: "Mentions légales" },
  { title: "Freelance : peut-on mettre son adresse perso dans les mentions légales ?", tag: "Auto-entrepreneur" },
  { title: "RGPD 2026 : ce qui a changé, ce qui arrive", tag: "RGPD" },
  { title: "Combien coûte la mise en conformité d'un site ?", tag: "Guide" },
];

export default function BlogPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.meta.publishedAt).getTime() - new Date(a.meta.publishedAt).getTime()
  );

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground">
          Conseils pratiques sur le droit du web pour entrepreneurs, indépendants et PME françaises.
        </p>
      </div>

      <div className="space-y-6">
        {sorted.map(({ meta }) => (
          <Link key={meta.slug} href={`/blog/${meta.slug}`} className="block group">
            <article className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 space-y-3 group-hover:border-foreground/25 transition-colors">
              <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-xs text-muted-foreground">
                {meta.tag}
              </span>
              <h2 className="font-semibold text-foreground leading-snug">{meta.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{meta.description}</p>
            </article>
          </Link>
        ))}

        {upcoming.map((article) => (
          <article
            key={article.title}
            className="rounded-xl border border-dashed border-foreground/15 p-6 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-xs text-muted-foreground">
                {article.tag}
              </span>
              <span className="text-xs text-muted-foreground">Bientôt disponible</span>
            </div>
            <h2 className="font-semibold text-muted-foreground leading-snug">{article.title}</h2>
          </article>
        ))}
      </div>

      <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 text-center space-y-3">
        <p className="text-sm font-medium">Besoin d&apos;un document légal maintenant ?</p>
        <Link
          href="/generateur"
          className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Générer mon document →
        </Link>
      </div>
    </main>
  );
}
