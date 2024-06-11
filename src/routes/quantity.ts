import {Hono} from "hono";
import {Env} from "../index";
import dbConnection from "../utils/dbConnection";
import {quantities} from "../db/schema";
import {and, eq, gt} from "drizzle-orm"

const quantity = new Hono<{ Bindings: Env }>();

quantity.get("/:id",
    async (c) => {
        try {
            const db = dbConnection(c.env.DATABASE_URL);
            const productId = parseInt(c.req.param("id"));
            const result = await db.select().from(quantities).where(and(eq(quantities.productId, productId), gt(quantities.quantity, 0)));

            return c.json(result);
        } catch (error) {
            console.log(error);
            return c.json({error: "Internal server error"}, 500);
        }
    }
).post("/new", async (c) => {
    try {
        const db = dbConnection(c.env.DATABASE_URL);

        const body = await c.req.json();

        const result = await db.insert(quantities).values(body).returning();

        return c.json(result);
    } catch (error) {
        console.log(error);
        return c.json({error: "Internal server error!"}, 500);
    }
});

export default quantity;
