import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
  getSameQualificationPosts,
  getAllPosts,
  getAllCategories,
  extractFaqFromContent,
} from "@/lib/mdx";
import type { FaqItem } from "@/lib/mdx";
import { getAllQualifications } from "@/lib/quiz";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { extractToc } from "@/lib/toc";
import MdxContent from "@/components/MdxContent";
import Breadcrumb from "@/components/Breadcrumb";
import QualificationSummary from "@/components/QualificationSummary";
import RelatedPosts from "@/components/RelatedPosts";
import SameQualificationPosts from "@/components/SameQualificationPosts";
import ShareButtons from "@/components/ShareButtons";
import SidebarToc from "@/components/sidebar/SidebarToc";
import SidebarPopularPosts from "@/components/sidebar/SidebarPopularPosts";
import SidebarCategories from "@/components/sidebar/SidebarCategories";
import RelatedQuizBanner from "@/components/quiz/RelatedQuizBanner";

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
    alternates: {
      canonical: `${SITE_URL}/${post.slug}`,
    },
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
  faqItems,
}: {
  post: NonNullable<ReturnType<typeof getPostBySlug>>;
  faqItems: FaqItem[];
}) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    image: post.thumbnail ?? `${SITE_URL}/og-image.png`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${post.slug}`,
    },
  };

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}

export default async function ArticlePage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const tocItems = extractToc(post.content);
  const faqItems = extractFaqFromContent(post.content);
  const relatedPosts = getRelatedPosts(post.slug);
  const sameQualificationPosts = getSameQualificationPosts(post.slug);
  const qualificationName = post.keyword?.split(/\s+/)[0] ?? "";
  const popularPosts = getAllPosts().slice(0, 5);
  const categories = getAllCategories();

  // 関連する練習問題を検索
  const allQualifications = getAllQualifications();
  const relatedQuiz = allQualifications.find((q) =>
    q.relatedArticleSlugs.includes(post.slug)
  );

  return (
    <>
      <JsonLd post={post} faqItems={faqItems} />

      {/* 記事ヘッダー */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8">
          <Breadcrumb
            items={[
              { name: "ホーム", href: "/" },
              {
                name: post.category,
                href: `/category/${encodeURIComponent(post.category)}`,
              },
              { name: post.title },
            ]}
            currentPath={`/${post.slug}`}
          />

          <header className="mt-5">
            <div className="mb-3 flex items-center gap-2 text-xs">
              <Link
                href={`/category/${encodeURIComponent(post.category)}`}
                className="font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {post.category}
              </Link>
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <time
                dateTime={post.date}
                className="text-gray-400 dark:text-gray-500"
              >
                {new Date(post.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="mb-3 max-w-3xl text-3xl font-extrabold leading-[1.3] tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {post.title}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {post.description}
            </p>
          </header>
        </div>
      </div>

      {/* 2カラム */}
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 lg:flex-row">
        {/* メイン */}
        <article className="min-w-0 flex-1">
          <QualificationSummary post={post} />

          <div className="article-content">
            <MdxContent source={post.content} />
          </div>

          <SameQualificationPosts
            posts={sameQualificationPosts}
            qualificationName={qualificationName}
          />

          {relatedQuiz && <RelatedQuizBanner qualification={relatedQuiz} />}

          {/* タグ */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-800">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="rounded bg-gray-100 px-2.5 py-1 text-xs text-gray-500 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              >
                #{tag}
              </Link>
            ))}
          </div>

          <ShareButtons url={`${SITE_URL}/${post.slug}`} title={post.title} />
          <RelatedPosts posts={relatedPosts} />

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
            >
              ← 記事一覧に戻る
            </Link>
          </div>
        </article>

        {/* サイドバー */}
        <aside className="w-full space-y-5 lg:sticky lg:top-20 lg:w-72 lg:self-start">
          <SidebarToc items={tocItems} />
          <SidebarPopularPosts posts={popularPosts} />
          <SidebarCategories categories={categories} />
        </aside>
      </div>
    </>
  );
}
