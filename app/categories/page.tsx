import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleCard from "@/components/ArticleCard";
import CategoryIcon from "@/components/CategoryIcon";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
  description: `${SITE_NAME}の全カテゴリ一覧。資格比較、ライフスタイル、ビジネス、IT・Web、医療・健康、クリエイティブなど。`,
};

export default function CategoriesPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: "カテゴリ一覧" },
        ]}
      />

      <h1 className="mb-2 mt-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl">
        カテゴリ一覧
      </h1>
      <p className="mb-10 text-gray-600 dark:text-gray-400">
        興味のあるカテゴリから資格情報を探しましょう
      </p>

      <div className="space-y-16">
        {CATEGORIES.map((cat) => {
          const categoryPosts = posts.filter(
            (p) => p.category === cat.name
          );
          const displayPosts = categoryPosts.slice(0, 3);

          return (
            <section key={cat.name}>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary-100 p-2.5 text-primary-600 dark:bg-primary-900 dark:text-primary-400">
                    <CategoryIcon name={cat.icon} className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
                      {cat.name}
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                        {categoryPosts.length}件
                      </span>
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {cat.description}
                    </p>
                  </div>
                </div>
                {categoryPosts.length > 3 && (
                  <Link
                    href={`/category/${encodeURIComponent(cat.name)}`}
                    className="hidden items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300 sm:inline-flex"
                  >
                    すべて見る
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                )}
              </div>

              {displayPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {displayPosts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-10 text-center dark:border-gray-600">
                  <p className="text-sm text-gray-400 dark:text-gray-500">
                    このカテゴリにはまだ記事がありません
                  </p>
                </div>
              )}

              {categoryPosts.length > 3 && (
                <div className="mt-4 text-center sm:hidden">
                  <Link
                    href={`/category/${encodeURIComponent(cat.name)}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400"
                  >
                    すべて見る
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
