import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getAllPosts,
  getAllCategories,
} from "@/lib/mdx";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { extractToc } from "@/lib/toc";
import MdxContent from "@/components/MdxContent";
import Breadcrumb from "@/components/Breadcrumb";
import QualificationSummary from "@/components/QualificationSummary";
import RelatedPosts from "@/components/RelatedPosts";
import ShareButtons from "@/components/ShareButtons";
import SidebarToc from "@/components/sidebar/SidebarToc";
import SidebarPopularPosts from "@/components/sidebar/SidebarPopularPosts";
import SidebarCategories from "@/components/sidebar/SidebarCategories";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/${post.slug}`,
      siteName: SITE_NAME,
      images: [
        {
          url: post.thumbnail ?? "/og-image.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.thumbnail ?? "/og-image.png"],
    },
  };
}

function JsonLd({
  post,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    image: post.thumbnail ?? `${SITE_URL}/og-image.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ArticlePage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const tocItems = extractToc(post.content);
  const relatedPosts = getRelatedPosts(post.slug);
  const popularPosts = getAllPosts().slice(0, 5);
  const categories = getAllCategories();

  return (
    <>
      <JsonLd post={post} />

      {/* 記事ヘッダー */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-10">
          {/* パンくず */}
          <Breadcrumb
            items={[
              { name: "ホーム", href: "/" },
              {
                name: post.category,
                href: `/category/${encodeURIComponent(post.category)}`,
              },
              { name: post.title },
            ]}
          />

          {/* ヘッダー */}
          <header className="mt-4">
            <div className="mb-3 flex items-center gap-3">
              <Link
                href={`/category/${encodeURIComponent(post.category)}`}
                className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
              >
                {post.category}
              </Link>
              <time
                dateTime={post.date}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {new Date(post.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-5xl">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {post.description}
            </p>
          </header>
        </div>
      </div>

      {/* 2カラムレイアウト */}
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row">
        {/* メインカラム */}
        <article className="min-w-0 flex-1">
          {/* 資格情報サマリー */}
          <QualificationSummary post={post} />

          {/* 本文 */}
          <div className="article-content">
            <MdxContent source={post.content} />
          </div>

          {/* タグ */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-700">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* SNSシェア */}
          <ShareButtons
            url={`${SITE_URL}/${post.slug}`}
            title={post.title}
          />

          {/* 関連記事 */}
          <RelatedPosts posts={relatedPosts} />

          {/* 戻るリンク */}
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              記事一覧に戻る
            </Link>
          </div>
        </article>

        {/* サイドバー */}
        <aside className="w-full space-y-6 lg:sticky lg:top-20 lg:w-80 lg:self-start">
          <SidebarToc items={tocItems} />
          <SidebarPopularPosts posts={popularPosts} />
          <SidebarCategories categories={categories} />
        </aside>
      </div>
    </>
  );
}
