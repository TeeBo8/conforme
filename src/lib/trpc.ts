import { createTRPCReact } from "@trpc/react-query";
import { httpBatchStreamLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "@/server/api/root";

export const api = createTRPCReact<AppRouter>();

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getTRPCClientConfig() {
  return {
    links: [
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === "development" ||
          (op.direction === "down" && op.result instanceof Error),
      }),
      httpBatchStreamLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
  };
}
