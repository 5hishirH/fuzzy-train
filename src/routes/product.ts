import { Hono } from "hono";
import { products } from "../db/schema";
import { Env } from "../index";
import dbConnection from "../db/db-connection";
import { desc, eq } from "drizzle-orm";

const product = new Hono<{ Bindings: Env }>();

product
  .get("/", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const result = await db.query.products.findMany({
        orderBy: [desc(products.launchedat)],
        columns: {
          categoryId: false,
          sizechartId: false,
        },
        with: {
          category: true,
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
      const db = dbConnection(c.env.DATABASE_URL);

      const productId = c.req.param("id");

      const result = await db.query.products.findFirst({
        where: eq(products.id, productId),
        columns: {
          categoryId: false,
          sizechartId: false,
        },
        with: {
          category: true,
          sizechart: true,
        },
      });

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Internal server error!" }, 500);
    }
  });

export default product;
