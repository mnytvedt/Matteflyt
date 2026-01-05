import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
});

export const diplomas = pgTable("diplomas", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  level: integer("level").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertDiplomaSchema = createInsertSchema(diplomas);
export const selectDiplomaSchema = createSelectSchema(diplomas);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Diploma = typeof diplomas.$inferSelect;
export type InsertDiploma = typeof diplomas.$inferInsert;
