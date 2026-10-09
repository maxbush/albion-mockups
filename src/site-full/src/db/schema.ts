import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/**
 * Consultation enquiries and open-day requests.
 * Columns audience / age / channel were added with the two-step form: generate a migration before deploying.
 */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 32 }).notNull(),
  audience: varchar("audience", { length: 20 }),
  age: varchar("age", { length: 20 }),
  stage: varchar("stage", { length: 40 }),
  parentName: varchar("parent_name", { length: 160 }).notNull(),
  channel: varchar("channel", { length: 20 }),
  phone: varchar("phone", { length: 60 }),
  email: varchar("email", { length: 200 }),
  destination: varchar("destination", { length: 40 }),
  message: text("message"),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
