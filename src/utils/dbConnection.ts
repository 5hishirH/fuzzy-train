import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http";

const dbConnection = (url: string) => {
    const sql = neon(url);
    const db = drizzle(sql);

    return db;
}

export default dbConnection;