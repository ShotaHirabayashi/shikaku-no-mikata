import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/mdx";

export default function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      {post.thumbnail && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
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

        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
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
