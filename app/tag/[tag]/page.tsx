import { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/mdx";
import { SITE_NAME } from "@/lib/constants";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {
  params: { tag: string };
};

export function generateStaticParams() {
  return getAllTags().map((t) => ({
    tag: t.name,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag}の記事一覧`,
    description: `${SITE_NAME}の「${tag}」タグが付いた記事一覧です。`,
  };
}

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: `#${tag}` },
        ]}
      />

      <h1 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
        「#{tag}」の記事一覧
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          このタグの記事はまだありません。
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
