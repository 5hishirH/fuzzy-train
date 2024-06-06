import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Hono } from "hono";
import { products } from "../db/schemas/product.schema";

export type Env = {
  DATABASE_URL: string;
};

const product = new Hono<{ Bindings: Env }>();

product.get("/", async (c) => {
  try {
    const sql = neon(c.env.DATABASE_URL);
    const db = drizzle(sql);

    const result = await db.select().from(products);

    return c.json(result);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Interal server error!" }, 500);
  }
});

export default product;
