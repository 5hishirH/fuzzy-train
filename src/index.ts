import { Hono } from "hono";
import product from "./routes/product";

const app = new Hono();

app.get("/", (c) => {
  return c.text("fuzzy train");
});

app.route("/product", product);

export default app;
