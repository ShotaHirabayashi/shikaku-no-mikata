import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

type Props = {
  posts: PostMeta[];
};

export default function SidebarPopularPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
        <svg className="h-4 w-4 text-accent-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
        人気記事
      </h3>
      <ul className="space-y-3">
        {posts.slice(0, 5).map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}`}
              className="group flex items-start gap-3"
            >
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 transition-colors group-hover:text-primary-600 dark:text-gray-300 dark:group-hover:text-primary-400">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
