ALTER TABLE "sizecharts" ADD COLUMN "chart" text;--> statement-breakpoint
ALTER TABLE "sizecharts" DROP COLUMN IF EXISTS "chest";--> statement-breakpoint
ALTER TABLE "sizecharts" DROP COLUMN IF EXISTS "sleeve";--> statement-breakpoint
ALTER TABLE "sizecharts" DROP COLUMN IF EXISTS "length";