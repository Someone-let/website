"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import ForumPost from "@/app/[locale]/components/forum-related/post-card/post-card";
import CreatePostForm from "@/app/[locale]/components/forum-related/post-form/post-form";
import PostCategories, {
  type PostSortMode,
} from "@/app/[locale]/components/ui/categories";
import AuthPromptModal from "@/app/[locale]/components/ui/account-not-found";

type PostItem = {
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

type ForumClientProps = {
  title: string;
  description: string;
  initialPosts: PostItem[];
};

export default function ForumClient({ title, description, initialPosts }: ForumClientProps) {
  const router = useRouter();
  const t = useTranslations("forumClient");
  const { status } = useSession();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [sortMode, setSortMode] = useState<PostSortMode>("liked");

  const sortedPosts = [...initialPosts].sort((firstPost, secondPost) => {
    const aTime = new Date(firstPost.createdAt).getTime();
    const bTime = new Date(secondPost.createdAt).getTime();
    switch (sortMode) {
      case "comments":
        return (
          secondPost.commentsCount - firstPost.commentsCount ||
          bTime - aTime
        );
      case "recent":
        return bTime - aTime;
      case "popular":
        return (
          (secondPost.likesCount + secondPost.commentsCount) -
          (firstPost.likesCount + firstPost.commentsCount) ||
          bTime - aTime
        );
      case "liked":
      default:
        return (
          secondPost.likesCount - firstPost.likesCount ||
          bTime - aTime
        );
    }
  });

  const handleCreatePostClick = () => {
    if (status === "authenticated") {
      setIsCreatePostOpen((value) => !value);
      return;
    }

    setIsCreatePostOpen(false);
    setIsAuthPromptOpen(true);
  };

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <button
            type="button"
            onClick={handleCreatePostClick}
            className="w-full rounded-xl border border-white/25 bg-black/45 px-4 py-2.5 text-left text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-black/60 hover:border-white/40"
          >
            {t("createPost")}
          </button>

          <PostCategories active={sortMode} onChange={setSortMode} />
        </aside>

        <section className="space-y-6 xl:max-w-4xl">
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>

          {sortedPosts.length === 0 ? (
            <p className="text-sm text-zinc-500">
              {t("noPosts")}
            </p>
          ) : (
            sortedPosts.map((post) => (
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
              onAuthRequired={() => setIsAuthPromptOpen(true)}
              onPostCreated={() => {
                setIsCreatePostOpen(false);
                router.refresh();
              }}
            />
          </div>
        </div>
      ) : null}

      <AuthPromptModal
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
      />
    </main>
  );
}
