import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-auth", "@react-pdf/renderer"],
  turbopack: {
    resolveAlias: {
      "@better-auth/kysely-adapter": path.resolve(
        "./src/lib/kysely-adapter-stub.ts"
      ),
    },
  },
  async redirects() {
    // Le domaine *.vercel.app sert le même contenu que conformefr.com :
    // redirection 308 pour éviter le duplicate content côté Google
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "conforme-zeta.vercel.app" }],
        destination: "https://conformefr.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
