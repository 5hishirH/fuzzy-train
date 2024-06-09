import {
  pgTable,
  serial,
  text,
  doublePrecision,
  real,
  integer,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export const sizecharts = pgTable("sizecharts", {
  id: serial("id").primaryKey(),
  name: text("name"),
  chest: real("chest").default(0),
  sleeve: real("sleeve").default(0),
  length: real("length").default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: doublePrecision("price"),
  info: text("info"),
  categoryId: integer("categoryId").references(() => categories.id),
  sizechartId: integer("sizechartId").references(() => sizecharts.id),
});
