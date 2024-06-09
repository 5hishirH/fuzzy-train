import { Hono } from "hono";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { eq } from "drizzle-orm";
import { stocks } from "../db/schema";

const stock = new Hono<{ Bindings: Env }>();

stock
  .get("/", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const result = await db.select().from(stocks);

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  })
  .post("/new", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const body = await c.req.json();

      const result = await db.insert(stocks).values(body).returning();

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  });

export default stock;
