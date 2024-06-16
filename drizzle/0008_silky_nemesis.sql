ALTER TABLE "quantities" ALTER COLUMN "quantity" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "quantities" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "quantities" ADD COLUMN "isStock" boolean DEFAULT true;