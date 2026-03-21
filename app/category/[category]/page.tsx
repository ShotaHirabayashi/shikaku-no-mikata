import { Metadata } from "next";
import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/mdx";
import { SITE_NAME, SITE_URL, CATEGORIES } from "@/lib/constants";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {
  params: { category: string };
};

export function generateStaticParams() {
  return getAllCategories().map((c) => ({
    category: c.name,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category}の記事一覧`,
    description: `${SITE_NAME}の「${category}」カテゴリの記事一覧です。`,
    alternates: {
      canonical: `${SITE_URL}/category/${encodeURIComponent(category)}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: category },
        ]}
        currentPath={`/category/${encodeURIComponent(category)}`}
      />

      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        「{category}」の記事一覧
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          このカテゴリの記事はまだありません。
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}

      {/* 他のカテゴリ */}
      <section className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-700">
        <h2 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">
          他のカテゴリ
        </h2>
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.filter((c) => c.name !== category).map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${encodeURIComponent(cat.name)}`}
              className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-600 transition-colors hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-primary-600 dark:hover:text-primary-400"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
