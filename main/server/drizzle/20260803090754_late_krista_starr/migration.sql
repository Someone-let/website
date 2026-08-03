CREATE TABLE "likes" (
	"user_id" text,
	"post_id" text,
	CONSTRAINT "likes_pkey" PRIMARY KEY("user_id","post_id")
);
--> statement-breakpoint
ALTER TABLE "post" DROP COLUMN "stars";