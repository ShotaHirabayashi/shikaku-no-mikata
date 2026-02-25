import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/mdx";
import { DIFFICULTY_LABELS, CATEGORIES } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";

function getCategoryIcon(categoryName: string) {
  const cat = CATEGORIES.find((c) => c.name === categoryName);
  return cat?.icon ?? "scale";
}

type Props = {
  post: PostMeta;
  variant?: "default" | "lead";
};

export default function ArticleCard({ post, variant = "default" }: Props) {
  const difficultyInfo =
    post.difficulty ? DIFFICULTY_LABELS[post.difficulty] : null;

  if (variant === "lead") {
    return <LeadCard post={post} difficultyInfo={difficultyInfo} />;
  }

  return (
    <article className="card-accent group rounded-lg">
      {/* サムネイル */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50 dark:bg-gray-800">
            <CategoryIcon
              name={getCategoryIcon(post.category)}
              className="h-10 w-10 text-gray-300 dark:text-gray-600"
            />
          </div>
        )}
        {difficultyInfo && (
          <span
            className={`absolute right-2 top-2 rounded px-2 py-0.5 text-[11px] font-semibold ${difficultyInfo.className}`}
          >
            {difficultyInfo.label}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-2 text-xs">
          <Link
            href={`/category/${encodeURIComponent(post.category)}`}
            className="font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            {post.category}
          </Link>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <time dateTime={post.date} className="text-gray-400 dark:text-gray-500">
            {new Date(post.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>

        <h2 className="mb-2 text-[15px] font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {post.description}
        </p>

        {(post.costRange || post.studyPeriod) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-gray-800 dark:text-gray-500">
            {post.costRange && <span>{post.costRange}</span>}
            {post.studyPeriod && <span>{post.studyPeriod}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

/* リード記事: 横長レイアウト */
function LeadCard({
  post,
  difficultyInfo,
}: {
  post: PostMeta;
  difficultyInfo: { label: string; className: string } | null;
}) {
  return (
    <article className="card-accent group rounded-lg">
      <div className="flex flex-col md:flex-row">
        {/* サムネイル */}
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-lg bg-gray-100 dark:bg-gray-800 md:aspect-auto md:w-1/2 md:rounded-l-lg md:rounded-tr-none">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full min-h-[200px] w-full items-center justify-center bg-gray-50 dark:bg-gray-800">
              <CategoryIcon
                name={getCategoryIcon(post.category)}
                className="h-14 w-14 text-gray-300 dark:text-gray-600"
              />
            </div>
          )}
          {difficultyInfo && (
            <span
              className={`absolute right-3 top-3 rounded px-2.5 py-0.5 text-xs font-semibold ${difficultyInfo.className}`}
            >
              {difficultyInfo.label}
            </span>
          )}
        </div>

        {/* テキスト */}
        <div className="flex flex-1 flex-col justify-center p-5 md:p-8">
          <div className="mb-2 flex items-center gap-2 text-xs">
            <Link
              href={`/category/${encodeURIComponent(post.category)}`}
              className="font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {post.category}
            </Link>
            <span className="text-gray-300 dark:text-gray-600">·</span>
            <time dateTime={post.date} className="text-gray-400 dark:text-gray-500">
              {new Date(post.date).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>

          <h2 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400 md:text-2xl">
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-400 dark:text-gray-500">
            {post.costRange && <span>費用 {post.costRange}</span>}
            {post.studyPeriod && <span>期間 {post.studyPeriod}</span>}
            {post.examInfo && <span>{post.examInfo}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
