"use client";

import { Star, MessageCircle, UserRoundX } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";

import { toggleLike } from "../../../forum/actions";

function isHttpImage(url: string) {
  return /^https?:\/\//i.test(url);
}

type ForumPostProps = {
  post: {
    id: string;
    title: string;
    description: string;
    image: string | null;
    authorName: string | null;
    likesCount: number;
    likedByViewer: boolean;
  };
};

export default function ForumPost({ post }: ForumPostProps) {
  const imageUrl = post.image?.trim() ?? "";
  const showImage = imageUrl.length > 0 && isHttpImage(imageUrl);
  const [liked, setLiked] = useState(post.likedByViewer);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [isPending, startTransition] = useTransition();

  const onToggleLike = () => {
    startTransition(async () => {
      const result = await toggleLike(post.id);

      if (result?.error) {
        alert(result.error);
        return;
      }

      setLiked(Boolean(result?.liked));
      setLikesCount(result?.likesCount ?? 0);
    });
  };

  return (
  <article className="group w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black transition group-hover:bg-black group-hover:text-white">
            <UserRoundX className="h-6 w-6 " />
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              {post.authorName || "Anonymous User"}
            </h3>

            <p className="text-sm text-zinc-500">
              Posted 2 hours ago
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">
            {post.title}
          </h2>

          <p className="mt-3 leading-7 text-zinc-600">
            {post.description}
          </p>
        </div>

        {showImage ? (
          <div className="overflow-hidden rounded-2xl border border-zinc-200">
            <Image
              src={imageUrl}
              alt={post.title}
              width={1200}
              height={700}
              className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-5">
        <div className="flex gap-3">
          {/* Likes */}
          <button
            type="button"
            onClick={onToggleLike}
            disabled={isPending}
            className="group/star flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 transition hover:border-yellow-300 hover:bg-yellow-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Star
              className={`h-5 w-5 transition ${
                liked
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-zinc-300 text-zinc-300 group-hover/star:fill-yellow-400 group-hover/star:text-yellow-400"
              }`}
            />
            <span className="font-medium text-zinc-700">
              {likesCount}
            </span>
          </button>

          {/* Comments */}
          <button className="flex items-center gap-2 rounded-xl border border-zinc-200 px-4 py-2 transition hover:bg-zinc-100">
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium text-zinc-700">
              42
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}