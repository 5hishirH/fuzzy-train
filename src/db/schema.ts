import {
  pgTable,
  serial,
  text,
  doublePrecision,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

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

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  sizechart: one(sizecharts, {
    fields: [products.sizechartId],
    references: [sizecharts.id],
  }),
  quantities: many(quantities),
}));

export const quantities = pgTable("quantities", {
  id: serial("id").primaryKey(),
  size: text("size").notNull(),
  quantity: integer("quantity"),
  isStock: boolean("isStock").default(true),
  colorName: text("colorName"),
  colorCode: text("colorCode"),
  productId: integer("productId")
    .notNull()
    .references(() => products.id),
});

export const quantitiesRelations = relations(quantities, ({ one }) => ({
  product: one(products, {
    fields: [quantities.productId],
    references: [products.id],
  }),
}));
