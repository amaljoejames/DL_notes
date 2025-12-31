import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  unitNumber: integer("unit_number").notNull(), // 1, 2, 3, 4, 5
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  unitId: integer("unit_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(), // Markdown/HTML content
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many }) => ({
  topics: many(topics),
}));

export const topicsRelations = relations(topics, ({ one }) => ({
  unit: one(units, {
    fields: [topics.unitId],
    references: [units.id],
  }),
}));

export const insertUnitSchema = createInsertSchema(units).omit({ id: true });
export const insertTopicSchema = createInsertSchema(topics).omit({ id: true });

export type Unit = typeof units.$inferSelect;
export type InsertUnit = z.infer<typeof insertUnitSchema>;
export type Topic = typeof topics.$inferSelect;
export type InsertTopic = z.infer<typeof insertTopicSchema>;

export type UnitWithTopics = Unit & { topics: Topic[] };
