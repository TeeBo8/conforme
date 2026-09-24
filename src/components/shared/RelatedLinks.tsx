import Link from "next/link";
import { articles } from "@/content/blog/registry";

// Maillage interne : chaque page de contenu renvoie vers les guides et les
// articles voisins, pour que les moteurs (et les lecteurs) découvrent tout le site.

export const GUIDES = [
  { href: "/mentions-legales-auto-entrepreneur", label: "Mentions légales auto-entrepreneur" },
  { href: "/mentions-legales-site-vitrine", label: "Mentions légales d'un site vitrine" },
  { href: "/mentions-legales-ecommerce", label: "Mentions légales e-commerce" },
  { href: "/politique-confidentialite-rgpd-petite-entreprise", label: "Politique de confidentialité RGPD pour TPE" },
];

export function RelatedLinks({ current }: { current: string }) {
  const guides = GUIDES.filter((g) => g.href !== current);
  const posts = articles
    .filter((a) => `/blog/${a.meta.slug}` !== current)
    .sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt))
    .slice(0, 3);

  return (
    <nav aria-labelledby="a-lire-aussi" className="space-y-4 border-t border-foreground/10 pt-8">
      <h2 id="a-lire-aussi" className="text-lg font-semibold">
        À lire aussi
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 text-sm">
        <ul className="space-y-2">
          {guides.map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground">
                {g.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="space-y-2">
          {posts.map(({ meta }) => (
            <li key={meta.slug}>
              <Link
                href={`/blog/${meta.slug}`}
                className="underline underline-offset-2 decoration-foreground/30 hover:decoration-foreground"
              >
                {meta.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
