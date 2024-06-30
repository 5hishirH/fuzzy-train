import { Hono } from "hono";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { orders } from "../db/schema";
import dbConnectionWithSchema from "../utils/dbConnectionWithSchema";

const order = new Hono<{ Bindings: Env }>();

order
  .get("/", async (c) => {
    try {
      const db = dbConnectionWithSchema(c.env.DATABASE_URL);

      const result = await db.query.orders.findMany();

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: true }, 500);
    }
  })

export default order;