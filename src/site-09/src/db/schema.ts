import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

/** Consultation enquiries and open-day registrations. */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  kind: varchar("kind", { length: 32 }).notNull(),
  parentName: varchar("parent_name", { length: 160 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 60 }),
  stage: varchar("stage", { length: 40 }),
  destination: varchar("destination", { length: 40 }),
  message: text("message"),
  consent: boolean("consent").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
