import { getTranslations } from "next-intl/server";
import { getPosts } from "../../../../server/actions/form-post";
import AnimatedBackground from "@/app/[locale]/components/ui/background";
import ForumClient from "./forum-client";

export default async function ForumPage() {
  const t = await getTranslations("forum");
  const result = await getPosts();
  const posts = result.posts ?? [];

  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        <ForumClient
          title={t("title")}
          description={t("description")}
          initialPosts={posts}
        />
      </div>
    </>
  );
}
