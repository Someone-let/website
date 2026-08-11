ALTER TABLE "post" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;