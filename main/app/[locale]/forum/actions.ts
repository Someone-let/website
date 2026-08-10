"use server";

import { toggleLike as toggleLikeAction } from "@/server/actions/like-post";
import { createComment as createCommentAction } from "@/server/actions/comment";

export async function toggleLike(postId: string) {
  return toggleLikeAction(postId);
}

export async function createComment(postId: string, content: string) {
  return createCommentAction(postId, content);
}
