import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/mdx";
import { DIFFICULTY_LABELS, CATEGORIES } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";

function getCategoryIcon(categoryName: string) {
  const cat = CATEGORIES.find((c) => c.name === categoryName);
  return cat?.icon ?? "scale";
}

const gradients = [
  "from-primary-400 to-primary-600",
  "from-accent-400 to-accent-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-rose-400 to-rose-600",
  "from-violet-400 to-violet-600",
];

function getGradient(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export default function ArticleCard({ post }: { post: PostMeta }) {
  const difficultyInfo =
    post.difficulty ? DIFFICULTY_LABELS[post.difficulty] : null;

  return (
    <article className="card-hover group overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="relative aspect-video overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${getGradient(post.slug)}`}
          >
            <CategoryIcon
              name={getCategoryIcon(post.category)}
              className="h-12 w-12 text-white/80"
            />
          </div>
        )}
        {difficultyInfo && (
          <span
            className={`absolute right-2 top-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${difficultyInfo.className}`}
          >
            {difficultyInfo.label}
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-2">
          <Link
            href={`/category/${encodeURIComponent(post.category)}`}
            className="rounded-full bg-primary-100 px-3 py-0.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800"
          >
            {post.category}
          </Link>
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

        <h2 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>

        <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {post.description}
        </p>

        {(post.costRange || post.studyPeriod) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.costRange && (
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
                {post.costRange}
              </span>
            )}
            {post.studyPeriod && (
              <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {post.studyPeriod}
              </span>
            )}
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
