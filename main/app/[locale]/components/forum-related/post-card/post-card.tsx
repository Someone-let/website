"use client";

import { Star, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";

import { toggleLike } from "../../../forum/actions";
import CommentsSection from "@/app/[locale]/components/ui/Comments-layout";

function isHttpImage(url: string) {
  return /^https?:\/\//i.test(url);
}

type ForumPostProps = {
  post: {
    id: string;
    title: string;
    category: string | null;
    description: string;
    image: string | null;
    authorName: string | null;
    createdAt: Date;
    likesCount: number;
    likedByViewer: boolean;
    commentsCount: number;
  };
};

function formatPostTime(value: Date | string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ForumPost({ post }: ForumPostProps) {
  const t = useTranslations("postCard");
  const imageUrl = post.image?.trim() ?? "";
  const showImage = imageUrl.length > 0 && isHttpImage(imageUrl);
  const [liked, setLiked] = useState(post.likedByViewer);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount);
  const [isPending, startTransition] = useTransition();
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

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
  <div id={post.id} className="w-full max-w-4xl">
  <article className="group w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-sm font-semibold text-white">
            {post.authorName
              ? post.authorName
                  .split(" ")
                  .filter(Boolean)
                  .slice(0, 2)
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()
              : "?"}
          </div>

          <div>
            <h3 className="font-semibold text-zinc-900">
              {post.authorName || t("anonymous")}
            </h3>

            <p className="text-sm text-zinc-500">
              {t("posted")} {formatPostTime(post.createdAt)}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <div>
          {post.category ? (
            <span className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-zinc-600">
              {post.category}
            </span>
          ) : null}

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
          <button
            type="button"
            onClick={() => setIsCommentsOpen((v) => !v)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition ${isCommentsOpen ? "border-zinc-400 bg-zinc-100" : "border-zinc-200 hover:bg-zinc-100"}`}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium text-zinc-700">
              {commentsCount}
            </span>
          </button>
        </div>
      </div>
    </article>
      {isCommentsOpen ? (
        <CommentsSection
          postId={post.id}
          initialCommentCount={post.commentsCount}
          onCommentCountChange={setCommentsCount}
        />
      ) : null}
    </div>
  );
}