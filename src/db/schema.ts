import {
  pgTable,
  serial,
  uuid,
  text,
  integer,
  doublePrecision,
  boolean,
  json,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const sizecharts = pgTable("sizecharts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  chart: json("chart"),
});

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price: doublePrecision("price").notNull(),
  pictures: json("pictures").notNull().$type<string[]>(),
  info: text("info").notNull(),
  sizes: json("sizes").$type<string[]>(),
  categoryId: uuid("categoryId")
    .references(() => categories.id)
    .notNull(),
  sizechartId: integer("sizechartId").references(() => sizecharts.id),
  launchedat: timestamp("launchedat").defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  sizechart: one(sizecharts, {
    fields: [products.sizechartId],
    references: [sizecharts.id],
  }),
}));

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  mobile: integer("mobile").notNull(),
  customer: text("customer").notNull(),
  address: json("address").notNull(),
  time: timestamp("time").defaultNow(),
  shippingcost: integer("shipping").notNull(),
  subtotal: integer("subtotal").notNull(),
  total: integer("total").notNull(),
  isCompleted: boolean("isCompleted").default(false),
  isApproved: boolean("isApproved").default(false),
  items: json("items").notNull(),
});
