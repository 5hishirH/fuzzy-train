CREATE TABLE IF NOT EXISTS "quantities" (
	"id" serial PRIMARY KEY NOT NULL,
	"size" text NOT NULL,
	"quantity" text NOT NULL,
	"colorName" text,
	"colorCode" text,
	"productId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "quantities" ADD CONSTRAINT "quantities_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
