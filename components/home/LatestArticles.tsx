import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";
import ArticleCard from "@/components/ArticleCard";

type Props = {
  posts: PostMeta[];
};

export default function LatestArticles({ posts }: Props) {
  return (
    <section id="latest" className="section-padding mx-auto max-w-6xl">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            最新記事
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            新しく公開された記事をチェック
          </p>
        </div>
        <Link
          href="/categories"
          className="hidden items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 sm:inline-flex"
        >
          すべての記事を見る
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          まだ記事がありません。
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
        >
          すべての記事を見る
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
