import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/mdx";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import MdxContent from "@/components/MdxContent";
import Link from "next/link";

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

function JsonLd({ post }: { post: NonNullable<ReturnType<typeof getPostBySlug>> }) {
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

  return (
    <>
      <JsonLd post={post} />

      <article className="mx-auto max-w-3xl px-4 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-primary-600 transition-colors"
          >
            ホーム
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700 dark:text-gray-200">
            {post.title}
          </span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {post.category}
            </span>
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
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {post.description}
          </p>
        </header>

        {/* Content */}
        <div className="article-content">
          <MdxContent source={post.content} />
        </div>

        {/* Tags */}
        <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6 dark:border-gray-700">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Back link */}
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
    </>
  );
}
