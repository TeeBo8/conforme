import type { Metadata } from "next";
import { Antic, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
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

export const metadata: Metadata = {
  title: "ConformeFR — Générateur de documents légaux",
  description:
    "Générez en 3 minutes des mentions légales et une politique de confidentialité RGPD conformes au droit français.",
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
              <div className="mx-auto max-w-3xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                <span>© {new Date().getFullYear()} ConformeFR — Documents légaux pour sites web français</span>
                <div className="flex items-center gap-4">
                  <a href="/generateur" className="hover:text-foreground transition-colors">Générateur</a>
                  <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
                  <a href="/connexion" className="hover:text-foreground transition-colors">Connexion</a>
                </div>
              </div>
            </footer>
            <Toaster position="bottom-right" richColors />
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
