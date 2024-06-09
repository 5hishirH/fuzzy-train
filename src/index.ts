import { Hono } from "hono";
import product from "./routes/product";
import category from "./routes/category";
import sizechart from "./routes/sizechart";
import stock from "./routes/stocks";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono();

app.get("/", (c) => {
  return c.text("fuzzy train");
});

app.route("/category", category);
app.route("/sizechart", sizechart);
app.route("/product", product);
app.route("/stock", stock);

export default app;
