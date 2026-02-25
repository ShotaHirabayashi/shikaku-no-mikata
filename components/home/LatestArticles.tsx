import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";
import ArticleCard from "@/components/ArticleCard";

type Props = {
  posts: PostMeta[];
};

export default function LatestArticles({ posts }: Props) {
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;

  return (
    <section id="latest" className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          最新記事
        </h2>
        <Link
          href="/categories"
          className="text-sm text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
        >
          すべて見る →
        </Link>
      </div>

      {/* リード記事（大きく表示） */}
      <div className="mb-6">
        <ArticleCard post={lead} variant="lead" />
      </div>

      {/* 残りの記事 */}
      {rest.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
