ALTER TABLE "categories" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "info" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "categoryId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sizecharts" ALTER COLUMN "name" SET NOT NULL;