"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "..";
import { auth } from "../auth";
import { posts } from "../schema";
import { likes } from "../schema";
import { users } from "../schema";
import { postAddSchema } from "../../types/post-add-schema";

type CreatePostInput = unknown;

export async function getPosts() {
	if (!db) {
		return { error: "Database is not configured", posts: [] };
	}

	const allPosts = await db.select().from(posts);
	const session = await auth();
	const viewerEmail = session?.user?.email;

	let viewerId: string | null = null;
	if (viewerEmail) {
		const [viewer] = await db
			.select({ id: users.id })
			.from(users)
			.where(eq(users.email, viewerEmail))
			.limit(1);

		viewerId = viewer?.id ?? null;
	}

	const likesRows = await db.select().from(likes);
	const likesByPost = new Map<string, number>();
	const viewerLikedPosts = new Set<string>();

	for (const like of likesRows) {
		const count = likesByPost.get(like.postId) ?? 0;
		likesByPost.set(like.postId, count + 1);

		if (viewerId && like.userId === viewerId) {
			viewerLikedPosts.add(like.postId);
		}
	}

	const postsWithMeta = allPosts.map((post) => ({
		...post,
		likesCount: likesByPost.get(post.id) ?? 0,
		likedByViewer: viewerLikedPosts.has(post.id),
	}));

	return { posts: postsWithMeta };
}

export async function createPost(input: CreatePostInput) {
	if (!db) {
		return { error: "Database is not configured" };
	}

	const session = await auth();
	if (!session?.user?.email) {
		return { error: "Please sign in to create a post" };
	}

	const parsed = postAddSchema.safeParse(input);

	if (!parsed.success) {
		return {
			error: parsed.error.issues[0]?.message ?? "Invalid post data",
		};
	}

	const { title, description, image } = parsed.data;
	const [author] = await db
		.select({ id: users.id, name: users.name, email: users.email })
		.from(users)
		.where(eq(users.email, session.user.email))
		.limit(1);

	const authorName =
		author?.name?.trim() || author?.email?.trim() || session.user.email;

	const [createdPost] = await db
		.insert(posts)
		.values({
			title,
			description,
			image: image?.trim() ? image : null,
			authorId: author?.id ?? null,
			authorName,
		})
		.returning();

	revalidatePath("/[locale]/forum", "page");

	return {
		success: "Post published successfully",
		post: createdPost,
	};
}
