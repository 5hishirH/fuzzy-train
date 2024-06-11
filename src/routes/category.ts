import { Hono } from "hono";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { categories, products, quantities, stocks } from "../db/schema";
import { eq } from "drizzle-orm";

const category = new Hono<{ Bindings: Env }>();

category
  .get("/", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const result = await db.select().from(categories);

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const categoryId = parseInt(c.req.param("id"));

      const result = await db
        .select({
          id: products.id,
          name: products.name,
          price: products.price,
          category: categories.name,
          pictures: products.pictures,
          stock: stocks.isStock,
        })
        .from(products)
        .innerJoin(categories, eq(products.categoryId, categories.id))
        .innerJoin(stocks, eq(products.id, stocks.productId))
        .where(eq(categories.id, categoryId));

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  })
  .post("/new", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const body = await c.req.json();

      const result = await db.insert(categories).values(body).returning();

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  })
  .patch("/:id", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);
      const categoryId = parseInt(c.req.param("id"));
      const { name } = await c.req.json();

      const result = await db
        .update(categories)
        .set({ name })
        .where(eq(categories.id, categoryId));

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  })
  .delete("/:id", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const categoryId = parseInt(c.req.param("id"));

      const deletedProducts = await db
        .delete(products)
        .where(eq(products.categoryId, categoryId))
        .returning();

      const deletedCategory = await db
        .delete(products)
        .where(eq(categories.id, categoryId))
        .returning();

      return c.json({ category: deletedCategory, products: deletedProducts });
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  });

export default category;
