import { Hono } from "hono";
import product from "./routes/product";
import category from "./routes/category";
import sizechart from "./routes/sizechart";
import quantity from "./routes/quantity";
import { cors } from "hono/cors";
import order from "./routes/order";

export type Env = {
  DATABASE_URL: string;
};

const app = new Hono();

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (c) => {
  return c.text("fuzzy train");
});

app.route("/category", category);
app.route("/sizechart", sizechart);
app.route("/product", product);
app.route("/quantity", quantity);
app.route("/order", order);

export default app;
