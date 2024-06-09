import { Hono } from "hono";
import product from "./routes/product";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono();

app.get("/", (c) => {
  return c.text("fuzzy train");
});

app.route("/product", product);

export default app;
