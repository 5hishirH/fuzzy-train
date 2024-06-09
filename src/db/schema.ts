import {
  pgTable,
  serial,
  text,
  doublePrecision,
  integer,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const sizecharts = pgTable("sizecharts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  chart: text("chart"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull(),
  info: text("info").notNull(),
  categoryId: integer("categoryId")
    .references(() => categories.id)
    .notNull(),
  sizechartId: integer("sizechartId").references(() => sizecharts.id),
});
