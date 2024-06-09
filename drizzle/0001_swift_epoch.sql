CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sizecharts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"chest" real DEFAULT 0,
	"sleeve" real DEFAULT 0,
	"length" real DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "description" TO "info";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "categoryId" integer;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sizechartId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_sizechartId_sizecharts_id_fk" FOREIGN KEY ("sizechartId") REFERENCES "public"."sizecharts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
