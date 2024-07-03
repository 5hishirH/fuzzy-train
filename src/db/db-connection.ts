import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema";

const dbConnectionWithSchema = (url: string) => {
  const sql = neon(url);
  const db = drizzle(sql, { schema });

  return db;
};

export default dbConnectionWithSchema;
