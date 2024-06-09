import { Hono } from "hono";
import product from "./routes/product";
import category from "./routes/category";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono();

app.get("/", (c) => {
  return c.text("fuzzy train");
});

app.route("/product", product);
app.route("/category", category);

export default app;
