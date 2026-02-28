import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

export default function SameQualificationPosts({
  posts,
  qualificationName,
}: {
  posts: PostMeta[];
  qualificationName: string;
}) {
  if (posts.length === 0) return null;

  return (
    <nav className="mt-8 rounded-lg border border-primary-200 bg-primary-50/50 p-5 dark:border-primary-800 dark:bg-primary-950/30">
      <h2 className="mb-3 text-base font-bold text-gray-900 dark:text-white">
        {qualificationName}の関連記事
      </h2>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/${post.slug}`}
              className="flex items-start gap-2 text-sm text-gray-700 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
