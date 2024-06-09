import { Hono } from "hono";
import { products } from "../db/schema";
import { Env } from "../index";
import dbConnection from "../utils/dbConnection";

const product = new Hono<{ Bindings: Env }>();

product.get("/", async (c) => {
  try {
    const db = dbConnection(c.env.DATABASE_URL);

    const result = await db.select().from(products);

    return c.json(result);
  } catch (error) {
    console.log(error);
    return c.json({ error: "Interal server error!" }, 500);
  }
});

export default product;
