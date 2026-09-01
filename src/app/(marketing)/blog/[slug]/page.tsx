import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getArticle } from "@/content/blog/registry";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article introuvable — ConformeFR" };

  return {
    title: `${article.meta.title} | ConformeFR`,
    description: article.meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: article.meta.title,
      description: article.meta.description,
      publishedTime: article.meta.publishedAt,
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { meta, Body } = article;
  const date = new Date(meta.publishedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: meta.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-2xl px-4 py-16 space-y-12">
        <div className="space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Tous les articles
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full border border-foreground/15 px-2.5 py-0.5">
                {meta.tag}
              </span>
              <span>{date}</span>
              <span>·</span>
              <span>{meta.readingTime} min de lecture</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {meta.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{meta.description}</p>
          </div>
        </div>

        <div
          className="
            space-y-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-2
            [&_p]:text-muted-foreground [&_p]:leading-relaxed
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:text-muted-foreground
            [&_li]:leading-relaxed
            [&_li>strong]:text-foreground
            [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-foreground/30 [&_a]:hover:decoration-foreground
            [&_strong]:text-foreground [&_strong]:font-semibold
            [&_.callout]:rounded-xl [&_.callout]:border [&_.callout]:border-amber-300 [&_.callout]:dark:border-amber-500/25 [&_.callout]:bg-amber-50 [&_.callout]:dark:bg-amber-500/5 [&_.callout]:p-5 [&_.callout]:my-8
            [&_.callout_p]:text-amber-900 [&_.callout_p]:dark:text-amber-200/80 [&_.callout_strong]:text-amber-950 [&_.callout_strong]:dark:text-amber-200
            [&_.cta]:rounded-xl [&_.cta]:border [&_.cta]:border-foreground/10 [&_.cta]:bg-foreground/5 [&_.cta]:p-8 [&_.cta]:my-8 [&_.cta]:text-center [&_.cta]:space-y-3
            [&_.cta-title]:font-semibold [&_.cta-title]:text-foreground [&_.cta-title]:text-lg
            [&_.cta-text]:text-sm [&_.cta-text]:text-muted-foreground
            [&_.cta-button]:inline-flex [&_.cta-button]:items-center [&_.cta-button]:justify-center [&_.cta-button]:rounded-md [&_.cta-button]:bg-foreground [&_.cta-button]:text-background [&_.cta-button]:px-4 [&_.cta-button]:py-2 [&_.cta-button]:text-sm [&_.cta-button]:font-medium [&_.cta-button]:no-underline [&_.cta-button]:hover:bg-foreground/90 [&_.cta-button]:transition-colors
          "
        >
          <Body />
        </div>

        {meta.faq.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Questions fréquentes</h2>
            <dl className="space-y-6">
              {meta.faq.map(({ question, answer }) => (
                <div key={question} className="border-b border-foreground/10 pb-6 last:border-0 last:pb-0">
                  <dt className="font-semibold text-foreground mb-2">{question}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </main>
    </>
  );
}
