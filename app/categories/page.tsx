import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "カテゴリ一覧",
  description: `${SITE_NAME}の全カテゴリ一覧。資格比較、ライフスタイル、ビジネス、IT・Web、医療・健康、クリエイティブ。`,
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

      <h1 className="mb-1 mt-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-3xl">
        カテゴリ一覧
      </h1>
      <p className="mb-12 text-sm text-gray-400 dark:text-gray-500">
        興味のあるカテゴリから資格を探しましょう
      </p>

      <div className="space-y-16">
        {CATEGORIES.map((cat) => {
          const categoryPosts = posts.filter((p) => p.category === cat.name);
          const displayPosts = categoryPosts.slice(0, 3);

          return (
            <section key={cat.name}>
              <div className="mb-6 flex items-baseline justify-between">
                <div>
                  <h2 className="flex items-baseline gap-2 text-lg font-bold text-gray-900 dark:text-white">
                    {cat.name}
                    <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                      {categoryPosts.length}件
                    </span>
                  </h2>
                  <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
                    {cat.description}
                  </p>
                </div>
                {categoryPosts.length > 3 && (
                  <Link
                    href={`/category/${encodeURIComponent(cat.name)}`}
                    className="hidden text-sm text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400 sm:inline-block"
                  >
                    すべて見る →
                  </Link>
                )}
              </div>

              {displayPosts.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {displayPosts.map((post) => (
                    <ArticleCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-200 px-6 py-10 text-center dark:border-gray-700">
                  <p className="text-sm text-gray-300 dark:text-gray-600">
                    記事を準備中です
                  </p>
                </div>
              )}

              {categoryPosts.length > 3 && (
                <div className="mt-4 text-center sm:hidden">
                  <Link
                    href={`/category/${encodeURIComponent(cat.name)}`}
                    className="text-sm text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    すべて見る →
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
