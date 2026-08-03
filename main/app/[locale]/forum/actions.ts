"use server";

import { toggleLike as toggleLikeAction } from "../../../../server/actions/like-post";

export async function toggleLike(postId: string) {
  return toggleLikeAction(postId);
}
