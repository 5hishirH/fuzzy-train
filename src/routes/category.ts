import { Hono } from "hono";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { categories, products, quantities } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import dbConnectionWithSchema from "../utils/dbConnectionWithSchema";

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
  .get("/allproducts", async (c) => {
    try {
      const db = dbConnectionWithSchema(c.env.DATABASE_URL);

      const categories = await db.query.categories.findMany({
        with: {
          products: {
            columns: {
              id: true,
            },
          },
        },
      });

      return c.json(categories);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const db = dbConnectionWithSchema(c.env.DATABASE_URL);

      const categoryId = parseInt(c.req.param("id"));

      const result = await db.query.categories.findFirst({
        where: eq(categories.id, categoryId),
        with: {
          products: {
            orderBy: [desc(products.id)],
            columns: {
              id: true,
              name: true,
              price: true,
              pictures: true,
            },
            with: {
              quantities: {
                columns: {
                  id: true,
                  size: true,
                },
              },
            },
          },
        },
      });

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
