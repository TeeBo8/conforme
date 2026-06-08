import { createTRPCRouter } from "./trpc";
import { documentRouter } from "./routers/document";
import { orderRouter } from "./routers/order";

export const appRouter = createTRPCRouter({
  document: documentRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
