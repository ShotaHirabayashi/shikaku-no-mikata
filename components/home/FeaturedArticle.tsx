import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/mdx";
import { DIFFICULTY_LABELS, CATEGORIES } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";

type Props = {
  post: PostMeta;
};

const gradients = [
  "from-primary-400 to-primary-600",
  "from-accent-400 to-accent-600",
  "from-emerald-400 to-emerald-600",
];

export default function FeaturedArticle({ post }: Props) {
  const difficultyInfo =
    post.difficulty ? DIFFICULTY_LABELS[post.difficulty] : null;
  const cat = CATEGORIES.find((c) => c.name === post.category);

  return (
    <section className="section-padding mx-auto max-w-6xl">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          注目の記事
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          編集部がおすすめする特集記事
        </p>
      </div>

      <Link
        href={`/${post.slug}`}
        className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:flex-row"
      >
        {/* サムネイル */}
        <div className="relative aspect-video overflow-hidden lg:aspect-auto lg:w-1/2">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div
              className={`flex h-full min-h-[240px] w-full items-center justify-center bg-gradient-to-br ${gradients[0]}`}
            >
              <CategoryIcon
                name={cat?.icon ?? "scale"}
                className="h-20 w-20 text-white/80"
              />
            </div>
          )}
          <div className="absolute left-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
            注目
          </div>
        </div>

        {/* テキスト */}
        <div className="flex flex-1 flex-col justify-center p-6 lg:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-100 px-3 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {post.category}
            </span>
            {difficultyInfo && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${difficultyInfo.className}`}
              >
                {difficultyInfo.label}
              </span>
            )}
            <time
              dateTime={post.date}
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 lg:text-3xl">
            {post.title}
          </h3>

          <p className="mb-5 line-clamp-3 text-gray-600 dark:text-gray-300">
            {post.description}
          </p>

          {/* 資格情報バッジ */}
          {(post.costRange || post.studyPeriod || post.examInfo) && (
            <div className="flex flex-wrap gap-3">
              {post.costRange && (
                <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                  {post.costRange}
                </div>
              )}
              {post.studyPeriod && (
                <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  <svg className="h-4 w-4 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {post.studyPeriod}
                </div>
              )}
              {post.examInfo && (
                <div className="flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  {post.examInfo}
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </section>
  );
}
