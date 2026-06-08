import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  // Routers ajoutés par phase
});

export type AppRouter = typeof appRouter;
