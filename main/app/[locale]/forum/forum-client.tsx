"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ForumPost from "@/app/[locale]/components/forum-related/post-card/post-card";
import CreatePostForm from "@/app/[locale]/components/forum-related/post-form/post-form";

type PostItem = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  authorName: string | null;
  likesCount: number;
  likedByViewer: boolean;
};

type ForumClientProps = {
  title: string;
  description: string;
  initialPosts: PostItem[];
};

export default function ForumClient({ title, description, initialPosts }: ForumClientProps) {
  const router = useRouter();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <button
            type="button"
            onClick={() => setIsCreatePostOpen((value) => !value)}
            className="w-full rounded-xl border border-white/25 bg-black/45 px-4 py-2.5 text-left text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-black/60 hover:border-white/40"
          >
            Create a post
          </button>
        </aside>

        <section className="space-y-6 xl:max-w-4xl">
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          {initialPosts.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No posts yet. Be the first to publish one.
            </p>
          ) : (
            initialPosts.map((post) => (
              <ForumPost key={post.id} post={post} />
            ))
          )}
        </section>
      </div>

      {isCreatePostOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6">
          <div className="w-full max-w-4xl">
            <CreatePostForm
              onCancel={() => setIsCreatePostOpen(false)}
              onPostCreated={() => {
                setIsCreatePostOpen(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
