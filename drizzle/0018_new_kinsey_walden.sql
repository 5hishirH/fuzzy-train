ALTER TABLE "orders0" ADD COLUMN "referenceCode" uuid DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "orders0" ADD COLUMN "isCanceled" boolean DEFAULT false;