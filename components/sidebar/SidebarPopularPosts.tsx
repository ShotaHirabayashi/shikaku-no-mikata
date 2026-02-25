import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

type Props = {
  posts: PostMeta[];
};

export default function SidebarPopularPosts({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        人気記事
      </h3>
      <ul className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
        {posts.slice(0, 5).map((post, i) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}`}
              className="group flex items-start gap-3 py-2.5"
            >
              <span className="flex-shrink-0 text-xs font-bold tabular-nums text-gray-300 dark:text-gray-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-snug text-gray-600 transition-colors group-hover:text-primary-700 dark:text-gray-400 dark:group-hover:text-primary-400">
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
