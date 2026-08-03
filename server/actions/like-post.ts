"use server";

import { and, eq, sql } from "drizzle-orm";

import { auth } from "../auth";
import { db } from "..";
import { likes, users } from "../schema";

export async function toggleLike(postId: string) {
  if (!db) {
    return { error: "Database is not configured" };
  }

  const session = await auth();
  if (!session?.user?.email) {
    return { error: "Please sign in to like posts" };
  }

  const [viewer] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!viewer?.id) {
    return { error: "User account not found" };
  }

  const existingLike = await db
    .select({ userId: likes.userId })
    .from(likes)
    .where(and(eq(likes.userId, viewer.id), eq(likes.postId, postId)))
    .limit(1);

  if (existingLike.length > 0) {
    await db
      .delete(likes)
      .where(and(eq(likes.userId, viewer.id), eq(likes.postId, postId)));

    const [countRow] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(likes)
      .where(eq(likes.postId, postId));

    return {
      liked: false,
      likesCount: countRow?.count ?? 0,
    };
  }

  try {
    await db.insert(likes).values({
      userId: viewer.id,
      postId,
    });
  } catch {
    // Another request may have inserted the same like concurrently.
  }

  const [countRow] = await db
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(likes)
    .where(eq(likes.postId, postId));

  return {
    liked: true,
    likesCount: countRow?.count ?? 0,
  };
}