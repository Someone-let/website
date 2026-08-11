import { getPosts } from "@/server/actions/form-post";
import AnimatedBackground from "@/app/[locale]/components/ui/background";
import DashboardClient, {
  type DashboardPost,
} from "@/app/[locale]/dashboard/dashboard-client";

export default async function DashboardPage() {
  const result = await getPosts();
  const formatCreatedAt = (value: Date | string) =>
    new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));

  const initialPosts: DashboardPost[] = (result.posts ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    author: post.authorName ?? "Anonymous",
    stars: post.likesCount ?? 0,
    comments: post.commentsCount ?? 0,
    image: post.image ?? undefined,
    category: post.category ?? "Uncategorized",
    createdAt: formatCreatedAt(post.createdAt),
  }));

  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        <DashboardClient initialPosts={initialPosts} />
      </div>
    </>
  );
}
