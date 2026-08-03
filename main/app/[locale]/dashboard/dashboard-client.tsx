"use client";

import { Eye, Search, Star, MessageCircle, Trash2, UserX } from "lucide-react";
import { useMemo, useState } from "react";
import { deletePost as deletePostAction } from "../../../../server/actions/delete-post";

export type DashboardPost = {
  id: string;
  title: string;
  description: string;
  author: string;
  stars: number;
  comments: number;
  image?: string;
  createdAt: string;
};

type DashboardClientProps = {
  initialPosts: DashboardPost[];
};

export default function DashboardClient({ initialPosts }: DashboardClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return posts.filter((p) =>
      `${p.title} ${p.description}`.toLowerCase().includes(search.toLowerCase())
    );
  }, [posts, search]);

  async function deletePost(id: string) {
    if (!confirm("Delete this post?")) return;

    const result = await deletePostAction(id);

    if (!result.success) {
      alert(result.error ?? "Failed to delete post");
      return;
    }

    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="min-h-screen text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-3xl font-bold">Moderation Dashboard</h1>
            <p className="mt-1 text-sm text-zinc-500">Manage community posts</p>
          </div>

          <div className="relative w-80 max-w-full">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 py-3 pl-11 pr-4 outline-none transition focus:border-white"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <h2 className="mb-6 text-xl font-semibold">Posts ({filtered.length})</h2>

        {filtered.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-zinc-950">
            <UserX className="mb-5 h-16 w-16 text-zinc-700" />

            <h3 className="text-2xl font-semibold">No posts found</h3>

            <p className="mt-2 text-zinc-500">Try another search.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((post) => (
              <article
                key={post.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-zinc-900"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-video w-full object-cover"
                  />
                )}

                <div className="p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900">
                      <UserX className="h-6 w-6 text-zinc-400" />
                    </div>

                    <div>
                      <p className="font-medium">{post.author}</p>

                      <span className="text-sm text-zinc-500">{post.createdAt}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold">{post.title}</h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-400">{post.description}</p>

                  <div className="mt-6 flex items-center gap-6 text-sm text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Star size={17} />
                      {post.stars}
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageCircle size={17} />
                      {post.comments}
                    </div>
                  </div>

                  <div className="mt-7 flex gap-3">
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-3 font-medium text-black transition hover:scale-[1.02]">
                      <Eye size={18} />
                      View
                    </button>

                    <button
                      onClick={() => deletePost(post.id)}
                      className="flex items-center justify-center rounded-xl border border-white/10 px-5 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
