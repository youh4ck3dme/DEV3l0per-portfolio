import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Zod schema for validating package.json structure.
 * Defines the expected shape of a package.json file with all required and optional fields.
 */
export const packageJsonSchema = z.object({
  name: z.string(),
  version: z.string(),
  type: z.string().optional(),
  license: z.string(),
  scripts: z.record(z.string()),
  dependencies: z.record(z.string()),
  devDependencies: z.record(z.string()),
  optionalDependencies: z.record(z.string()).optional(),
});

export type PackageJson = z.infer<typeof packageJsonSchema>;

/**
 * Drizzle ORM table definition for users.
 * Defines the database schema for user accounts with unique usernames.
 */
export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
