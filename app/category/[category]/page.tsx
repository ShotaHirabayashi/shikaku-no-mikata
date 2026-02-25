import { Metadata } from "next";
import { getAllCategories, getPostsByCategory } from "@/lib/mdx";
import { SITE_NAME } from "@/lib/constants";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {
  params: { category: string };
};

export function generateStaticParams() {
  return getAllCategories().map((c) => ({
    category: encodeURIComponent(c.name),
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category}の記事一覧`,
    description: `${SITE_NAME}の「${category}」カテゴリの記事一覧です。`,
  };
}

export default function CategoryPage({ params }: Props) {
  const category = decodeURIComponent(params.category);
  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: category },
        ]}
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
    </div>
  );
}
