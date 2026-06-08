import { pgTable, text, timestamp, jsonb, integer } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id"),
  type: text("type", {
    enum: ["mentions_legales", "politique_confidentialite", "pack"],
  }).notNull(),
  siteType: text("site_type", {
    enum: ["vitrine", "ecommerce", "blog", "saas"],
  }).notNull(),
  inputs: jsonb("inputs").notNull(),
  generatedContent: text("generated_content"),
  status: text("status", { enum: ["preview", "paid"] })
    .notNull()
    .default("preview"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id"),
  documentIds: text("document_ids").array().notNull(),
  stripeSessionId: text("stripe_session_id").notNull(),
  amount: integer("amount").notNull(),
  status: text("status", { enum: ["pending", "paid", "failed"] })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
