import type { Metadata } from "next";
import { Antic, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import Link from "next/link";
import { TRPCProvider } from "@/components/providers/TRPCProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClientNavbar } from "@/components/shared/ClientNavbar";
import "./globals.css";

const fontSans = Antic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://conformefr.com";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "ConformeFR — Générateur de documents légaux",
  description:
    "Générez en 3 minutes des mentions légales et une politique de confidentialité RGPD, rédigées d'après la LCEN et le RGPD.",
  openGraph: {
    siteName: "ConformeFR",
    locale: "fr_FR",
    type: "website",
    url: appUrl,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TRPCProvider>
            <ClientNavbar />
            <div className="flex-1">{children}</div>
            <footer className="border-t border-border mt-auto">
              <div className="mx-auto max-w-3xl px-4 py-6 space-y-4 text-xs text-muted-foreground">
                <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2" aria-label="Guides">
                  <span className="font-medium text-foreground/70">Guides :</span>
                  <Link href="/mentions-legales-auto-entrepreneur" className="hover:text-foreground transition-colors">Mentions légales auto-entrepreneur</Link>
                  <Link href="/mentions-legales-site-vitrine" className="hover:text-foreground transition-colors">Site vitrine</Link>
                  <Link href="/mentions-legales-ecommerce" className="hover:text-foreground transition-colors">E-commerce</Link>
                  <Link href="/politique-confidentialite-rgpd-petite-entreprise" className="hover:text-foreground transition-colors">Politique RGPD TPE</Link>
                </nav>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span>© {new Date().getFullYear()} ConformeFR — Documents légaux pour sites web français</span>
                  <div className="flex items-center gap-4">
                    <Link href="/generateur" className="hover:text-foreground transition-colors">Générateur</Link>
                    <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                    <Link href="/mentions-legales" className="hover:text-foreground transition-colors">Mentions légales</Link>
                    <Link href="/politique-confidentialite" className="hover:text-foreground transition-colors">Confidentialité</Link>
                    <a href="mailto:contact@teebostudio.fr?subject=ConformeFR%20%E2%80%94%20retour" className="hover:text-foreground transition-colors">Contact &amp; retours</a>
                  </div>
                </div>
              </div>
            </footer>
            <Toaster position="bottom-right" richColors />
          </TRPCProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
