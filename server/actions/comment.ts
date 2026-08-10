"use server";

import { db } from "..";
import { comments } from "../schema";
import { revalidatePath } from "next/cache";
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

    revalidatePath(`/forum`);

    return { success: true, comment };
  } catch (error) {
    console.error("CREATE_COMMENT_ERROR:", error);
    return { success: false, error: "Failed to create comment" };
  }
}