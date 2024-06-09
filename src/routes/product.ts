import { Hono } from "hono";
import { categories, products } from "../db/schema";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { eq } from "drizzle-orm";

const product = new Hono<{ Bindings: Env }>();

product
  .get("/", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const result = await db.select().from(products);

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const productId = parseInt(c.req.param("id"));

      const result = await db
        .select()
        .from(products)
        .innerJoin(categories, eq(products.id, productId));

      return c.json(result[0]);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  })
  .post("/new", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const body = await c.req.json();
      const newProduct = await db.insert(products).values(body).returning();

      return c.json(newProduct);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  })
  .patch("/:id", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);
      const productId = parseInt(c.req.param("id"));
      const body = await c.req.json();

      const result = await db
        .update(products)
        .set(body)
        .where(eq(products.id, productId))
        .returning();

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  })
  .delete("/delete/:id", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const productId = parseInt(c.req.param("id"));

      const result = await db
        .delete(products)
        .where(eq(products.id, productId))
        .returning();

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  });

export default product;
