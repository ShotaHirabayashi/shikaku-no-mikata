import type { PostMeta } from "@/lib/mdx";
import ArticleCard from "@/components/ArticleCard";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        関連記事
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
