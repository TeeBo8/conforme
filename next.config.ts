import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["better-auth"],
  turbopack: {
    resolveAlias: {
      "@better-auth/kysely-adapter": path.resolve(
        "./src/lib/kysely-adapter-stub.ts"
      ),
    },
  },
};

export default nextConfig;
