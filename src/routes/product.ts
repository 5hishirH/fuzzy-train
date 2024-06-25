import { Hono } from "hono";
import { categories, products, quantities } from "../db/schema";
import * as schema from "../db/schema";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { desc, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const product = new Hono<{ Bindings: Env }>();

product
  .get("/", async (c) => {
    try {
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql, { schema });

      const result = await db.query.products.findMany({
        orderBy: [desc(products.id)],
        columns: {
          categoryId: false,
          sizechartId: false,
        },
        with: {
          category: true,
          quantities: {
            columns: {
              id: true,
              size: true,
            },
          },
          sizechart: true,
        },
      });

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ message: "Internal server error!" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const sql = neon(c.env.DATABASE_URL);
      const db = drizzle(sql, { schema });

      const productId = parseInt(c.req.param("id"));

      const result = await db.query.products.findFirst({
        where: eq(products.id, productId),
        columns: {
          categoryId: false,
          sizechartId: false,
        },
        with: {
          category: true,
          sizechart: true,
          quantities: {
            columns: {
              id: true,
              size: true,
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
      return c.json({ error: "Internal server error!" }, 500);
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
      return c.json({ error: "Internal server error!" }, 500);
    }
  });

export default product;

/*
  .post("/new", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const body = await c.req.json();
      const newProduct = await db.insert(products).values(body).returning();

      return c.json(newProduct);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  })
*/
