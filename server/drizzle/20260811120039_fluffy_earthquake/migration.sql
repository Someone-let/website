CREATE TABLE "comment" (
	"id" text PRIMARY KEY,
	"postId" text NOT NULL,
	"authorId" text,
	"authorName" text,
	"content" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_postId_post_id_fkey" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_authorId_user_id_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE SET NULL;