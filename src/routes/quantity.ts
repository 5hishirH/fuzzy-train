import { Hono } from "hono";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { quantities } from "../db/schema";
import { and, eq, gt } from "drizzle-orm";
import dbConnectionWithSchema from "../utils/dbConnectionWithSchema";

const quantity = new Hono<{ Bindings: Env }>();

quantity.get("/:id", async (c) => {
  try {
    const db = dbConnectionWithSchema(c.env.DATABASE_URL);
    const productId = parseInt(c.req.param("id"));
    const result = await db.query.quantities.findMany({
      where: eq(quantities.productId, productId),
    });

    return c.json(result);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export default quantity;
