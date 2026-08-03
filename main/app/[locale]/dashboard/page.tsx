import { getPosts } from "../../../../server/actions/form-post";
import AnimatedBackground from "@/app/[locale]/components/ui/background";
import DashboardClient, {
  type DashboardPost,
} from "@/app/[locale]/dashboard/dashboard-client";

export default async function DashboardPage() {
  const result = await getPosts();
  const initialPosts: DashboardPost[] = (result.posts ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    author: post.authorName ?? "Anonymous",
    stars: post.likesCount ?? 0,
    comments: 0,
    image: post.image ?? undefined,
    createdAt: "Recently",
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
