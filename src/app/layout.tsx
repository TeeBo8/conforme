import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { TRPCProvider } from "@/components/providers/TRPCProvider";
import { ClientNavbar } from "@/components/shared/ClientNavbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TRPCProvider>
          <ClientNavbar />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-white/10 mt-auto">
            <div className="mx-auto max-w-3xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} ConformeFR — Documents légaux pour sites web français</span>
              <div className="flex items-center gap-4">
                <a href="/generateur" className="hover:text-white transition-colors">Générateur</a>
                <a href="/blog" className="hover:text-white transition-colors">Blog</a>
                <a href="/connexion" className="hover:text-white transition-colors">Connexion</a>
              </div>
            </div>
          </footer>
          <Toaster theme="dark" position="bottom-right" richColors />
        </TRPCProvider>
      </body>
    </html>
  );
}
