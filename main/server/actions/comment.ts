"use server";

import { revalidatePath } from "next/cache";
import { desc, eq } from "drizzle-orm";

import { db } from "..";
import { comments } from "../schema";
import { commentSchema } from "@/types/comments-schema";

export async function createComment(postId: string, content: string) {
  if (!db) {
    return { success: false, error: "Database is not configured" };
  }

  try {
    const validated = commentSchema.parse({ postId, content });

    const [comment] = await db
      .insert(comments)
      .values({
        postId: validated.postId,
        content: validated.content,
        createdAt: new Date(),
      })
      .returning();

    revalidatePath("/forum");

    return { success: true, comment };
  } catch (error) {
    console.error("CREATE_COMMENT_ERROR:", error);
    return { success: false, error: "Failed to create comment" };
  }
}

export async function getCommentsForPost(postId: string) {
  if (!db) {
    return { comments: [] };
  }

  const rows = await db
    .select({
      id: comments.id,
      content: comments.content,
      createdAt: comments.createdAt,
      authorName: comments.authorName,
    })
    .from(comments)
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));

  return { comments: rows };
}
