import { Hono } from "hono";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";
import { eq } from "drizzle-orm";
import { sizecharts } from "../db/schema";

const sizechart = new Hono<{ Bindings: Env }>();

sizechart
  .get("/", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const result = await db.select().from(sizecharts);

      return c.json(result);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  })
  .get("/:id", async (c) => {
    try {
      const db = dbConnection(c.env.DATABASE_URL);

      const sizeChartId = parseInt(c.req.param("id"));

      const result = await db
        .select()
        .from(sizecharts)
        .where(eq(sizecharts.id, sizeChartId));

      return c.json(result[0]);
    } catch (error) {
      console.log(error);
      return c.json({ error: "Interal server error!" }, 500);
    }
  });

export default sizechart;
