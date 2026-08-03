ALTER TABLE "post" ADD COLUMN "authorId" text;--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "authorName" text;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "post_authorId_user_id_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL;