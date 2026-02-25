import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/mdx";
import { DIFFICULTY_LABELS, CATEGORIES } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";

type Props = {
  post: PostMeta;
};

export default function FeaturedArticle({ post }: Props) {
  const difficultyInfo =
    post.difficulty ? DIFFICULTY_LABELS[post.difficulty] : null;
  const cat = CATEGORIES.find((c) => c.name === post.category);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex items-baseline gap-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          ピックアップ
        </h2>
        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
      </div>

      <Link
        href={`/${post.slug}`}
        className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-primary-400 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-500 lg:flex-row"
      >
        {/* サムネイル */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800 lg:aspect-auto lg:w-1/2">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full min-h-[200px] items-center justify-center bg-primary-50 dark:bg-primary-950/30">
              <CategoryIcon
                name={cat?.icon ?? "scale"}
                className="h-16 w-16 text-primary-300 dark:text-primary-700"
              />
            </div>
          )}
        </div>

        {/* テキスト */}
        <div className="flex flex-1 flex-col justify-center p-6 lg:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
              {post.category}
            </span>
            {difficultyInfo && (
              <span
                className={`rounded px-2 py-0.5 text-xs font-medium ${difficultyInfo.className}`}
              >
                {difficultyInfo.label}
              </span>
            )}
          </div>

          <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400 lg:text-2xl">
            {post.title}
          </h3>

          <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {post.description}
          </p>

          {/* メタ情報 */}
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
            {post.costRange && (
              <span>費用 {post.costRange}</span>
            )}
            {post.studyPeriod && (
              <span>期間 {post.studyPeriod}</span>
            )}
            {post.examInfo && (
              <span>{post.examInfo}</span>
            )}
          </div>
        </div>
      </Link>
    </section>
  );
}
