import { Hono } from "hono";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { qunatities } from "../db/schema";

const quantity = new Hono<{ Bindings: Env }>();

quantity.post("/new", async (c) => {
  try {
    const db = dbConnection(c.env.DATABASE_URL);

    const body = await c.req.json();

    const result = await db.insert(qunatities).values(body).returning();

    return c.json(result);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Interal server error!" }, 500);
  }
});

export default quantity;
