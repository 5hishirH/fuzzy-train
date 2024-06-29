CREATE TABLE IF NOT EXISTS "items0" (
	"id" serial PRIMARY KEY NOT NULL,
	"productId" integer NOT NULL,
	"sizeId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"orderId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders0" (
	"id" serial PRIMARY KEY NOT NULL,
	"mobile" integer NOT NULL,
	"customer" text NOT NULL,
	"address" json
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items0" ADD CONSTRAINT "items0_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items0" ADD CONSTRAINT "items0_sizeId_quantities_id_fk" FOREIGN KEY ("sizeId") REFERENCES "public"."quantities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items0" ADD CONSTRAINT "items0_orderId_orders0_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders0"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
