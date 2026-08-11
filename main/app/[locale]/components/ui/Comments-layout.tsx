"use client";

import { useEffect, useState, useTransition } from "react";
import { MessageCircle, MoreHorizontal, Reply, Send, Star } from "lucide-react";
import { createComment, getCommentsForPost } from "@/app/[locale]/forum/actions";

type Comment = {
  id: string;
  user: string;
  time: string;
  text: string;
  stars: number;
};

type CommentsSectionProps = {
  postId: string;
  initialCommentCount?: number;
  onCommentCountChange?: (count: number) => void;
};

function formatCommentTime(value?: Date | string | null) {
  if (!value) return "Just now";

  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return "Just now";
  }
}

export default function CommentsSection({ postId, initialCommentCount = 0, onCommentCountChange }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    startTransition(async () => {
      const result = await getCommentsForPost(postId);

      if (!isActive) return;

      const mappedComments: Comment[] = (result.comments ?? []).map((comment) => ({
        id: comment.id,
        user: comment.authorName || "Anonymous",
        time: formatCommentTime(comment.createdAt),
        text: comment.content,
        stars: 0,
      }));

      setComments(mappedComments);
      setCommentCount(mappedComments.length);
      onCommentCountChange?.(mappedComments.length);
    });

    return () => {
      isActive = false;
    };
  }, [onCommentCountChange, postId]);

  const submitComment = () => {
    if (!text.trim()) return;
    setError(null);

    startTransition(async () => {
      const result = await createComment(postId, text.trim());

      if (!result.success) {
        setError(result.error ?? "Something went wrong");
        return;
      }

      const newComment: Comment = {
        id: result.comment?.id ?? String(Date.now()),
        user: result.comment?.authorName ?? "Anonymous",
        time: "Just now",
        text: text.trim(),
        stars: 0,
      };

      setComments((prev) => [newComment, ...prev]);
      setCommentCount((prev) => prev + 1);
      onCommentCountChange?.(commentCount + 1);
      setText("");
    });
  };

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <MessageCircle size={20} strokeWidth={1.8} />

            <h2 className="text-xl font-semibold tracking-tight text-black">
              Comments
            </h2>
          </div>

          <p className="mt-1 text-sm text-neutral-500">
            {commentCount} thoughts on this post
          </p>
        </div>

        <span className="hidden text-xs uppercase tracking-[0.2em] text-neutral-400 sm:block">
          Discussion
        </span>
      </div>

      {/* Comments */}
      <div className="space-y-3">

        {comments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 px-5 py-6 text-center text-sm text-neutral-500">
            No comments yet. Be the first to share your thoughts.
          </div>
        ) : null}

        {comments.map((comment) => (
          <article
            key={comment.id}
            className="
              group relative
              rounded-2xl
              border border-neutral-200
              bg-white
              p-5
              transition-all duration-300
              hover:-translate-y-[2px]
              hover:border-neutral-300
              hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)]
            "
          >
            {/* Top row */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                {/* Anonymous avatar */}
                <div
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-full
                    bg-neutral-100
                    text-sm font-medium text-neutral-600
                  "
                >
                  A
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {comment.user}
                  </p>

                  <p className="text-xs text-neutral-400">
                    {comment.time}
                  </p>
                </div>

              </div>

              <button
                className="
                  rounded-full p-2
                  text-neutral-400
                  transition
                  hover:bg-neutral-100
                  hover:text-black
                "
              >
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Comment */}
            <p className="mt-4 pr-6 text-[15px] leading-7 text-neutral-700">
              {comment.text}
            </p>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-2">

              <button
                className="
                  group/star flex items-center gap-2
                  rounded-full
                  border border-neutral-200
                  px-3 py-1.5
                  text-xs font-medium
                  text-neutral-500
                  transition
                  hover:border-black
                  hover:bg-black
                  hover:text-white
                "
              >
                <Star
                  size={14}
                  className="transition group-hover/star:rotate-12"
                />

                {comment.stars}
              </button>

              <button
                className="
                  flex items-center gap-2
                  rounded-full
                  px-3 py-1.5
                  text-xs font-medium
                  text-neutral-500
                  transition
                  hover:bg-neutral-100
                  hover:text-black
                "
              >
                <Reply size={14} />
                Reply
              </button>

            </div>

            {/* Subtle hover indicator */}
            <div
              className="
                absolute left-0 top-6
                h-0 w-[2px]
                rounded-full bg-black
                transition-all duration-300
                group-hover:h-8
              "
            />
          </article>
        ))}

      </div>

      {/* Divider */}
      <div className="my-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-neutral-200" />

        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Join the discussion
        </span>

        <div className="h-px flex-1 bg-neutral-200" />
      </div>

      {error && (
        <p className="mb-4 text-center text-sm text-red-500">{error}</p>
      )}

      {/* Input */}
      <div
        className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border border-neutral-200
          bg-neutral-50
          transition-all duration-300
          focus-within:border-neutral-400
          focus-within:bg-white
          focus-within:shadow-[0_15px_45px_rgba(0,0,0,0.07)]
        "
      >

        {/* Top accent */}
        <div
          className="
            absolute left-0 top-0
            h-[2px] w-0
            bg-black
            transition-all duration-500
            group-focus-within:w-full
          "
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          maxLength={500}
          rows={4}
          className="
            w-full
            resize-none
            bg-transparent
            px-5 pt-5
            text-sm
            leading-6
            text-black
            outline-none
            placeholder:text-neutral-400
          "
        />

        {/* Bottom controls */}
        <div className="flex items-center justify-between px-4 pb-4">

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">
              {text.length} / 500
            </span>
          </div>

          <button
            onClick={submitComment}
            disabled={!text.trim() || isPending}
            className="
              group/send
              flex items-center gap-2
              rounded-full
              bg-black
              px-4 py-2.5
              text-xs font-medium
              text-white
              transition-all duration-300
              hover:gap-3
              hover:bg-neutral-800
              disabled:cursor-not-allowed
              disabled:bg-neutral-200
              disabled:text-neutral-400
            "
          >
            {isPending ? "Posting…" : "Comment"}

            <Send
              size={14}
              className="
                transition-transform duration-300
                group-hover/send:translate-x-0.5
              "
            />
          </button>

        </div>
      </div>

      {/* Bottom hint */}
      <p className="mt-3 text-center text-xs text-neutral-400">
        Be respectful. Your comment will be visible to everyone.
      </p>

    </section>
  );
}