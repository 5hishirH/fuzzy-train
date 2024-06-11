import {Hono} from "hono";
import product from "./routes/product";
import category from "./routes/category";
import sizechart from "./routes/sizechart";
import stock from "./routes/stocks";
import quantity from "./routes/quantity";
import {cors} from "hono/cors"

export type Env = {
    DATABASE_URL: string;
};

const app = new Hono();

app.use(cors({
    origin: ["http://192.168.0.105:3000", "http://localhost:3000", "https://journeyy-clothes.vercel.app"],
}))

app.get("/", (c) => {
    return c.text("fuzzy train");
});

app.route("/category", category);
app.route("/sizechart", sizechart);
app.route("/product", product);
app.route("/quantity", quantity);
app.route("/stock", stock);

export default app;
