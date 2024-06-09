import {
  pgTable,
  serial,
  text,
  doublePrecision,
  integer,
  boolean,
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
  pictures: text("pictures").notNull(),
  info: text("info").notNull(),
  categoryId: integer("categoryId")
    .references(() => categories.id)
    .notNull(),
  sizechartId: integer("sizechartId").references(() => sizecharts.id),
});

// temp table, will be removed later
export const stocks = pgTable("stocks", {
  id: serial("id").primaryKey(),
  isStock: boolean("isStock").default(true),
  productId: integer("productId")
    .notNull()
    .references(() => products.id),
});
