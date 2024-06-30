CREATE TABLE IF NOT EXISTS "orders0" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mobile" integer NOT NULL,
	"customer" text NOT NULL,
	"address" json NOT NULL,
	"time" timestamp DEFAULT now(),
	"deliveryPrice" integer NOT NULL,
	"totalItemsPrice" integer NOT NULL,
	"totalOrderPrice" integer NOT NULL,
	"isCompleted" boolean DEFAULT false,
	"isApproved" boolean DEFAULT false,
	"items" json NOT NULL
);
