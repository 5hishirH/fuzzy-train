import { pgTable, serial, text, doublePrecision } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: doublePrecision("price"),
  description: text("description"),
});
