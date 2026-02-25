import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

type Props = {
  posts: PostMeta[];
};

type Axis = {
  label: string;
  emoji: string;
  posts: PostMeta[];
};

export default function QuickFinder({ posts }: Props) {
  const axes: Axis[] = [
    {
      label: "初心者向け",
      emoji: "🌱",
      posts: posts.filter((p) => p.difficulty && p.difficulty <= 2).slice(0, 4),
    },
    {
      label: "低コスト",
      emoji: "💰",
      posts: posts
        .filter((p) => {
          if (!p.costRange) return false;
          const m = p.costRange.match(/(\d+)/);
          return m && parseInt(m[1]) <= 3;
        })
        .slice(0, 4),
    },
    {
      label: "短期取得",
      emoji: "⚡",
      posts: posts
        .filter((p) => {
          if (!p.studyPeriod) return false;
          const m = p.studyPeriod.match(/(\d+)/);
          return m && parseInt(m[1]) <= 2;
        })
        .slice(0, 4),
    },
  ];

  return (
    <section className="border-y border-gray-200 bg-white py-14 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            条件から探す
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {axes.map((axis) => (
            <div key={axis.label}>
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                <span>{axis.emoji}</span>
                {axis.label}
              </h3>

              {axis.posts.length > 0 ? (
                <ul className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
                  {axis.posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/${post.slug}`}
                        className="group flex items-baseline gap-2 py-3"
                      >
                        <span className="h-1 w-1 flex-shrink-0 translate-y-[-2px] rounded-full bg-primary-400" />
                        <span className="text-sm text-gray-600 transition-colors group-hover:text-primary-700 dark:text-gray-300 dark:group-hover:text-primary-400">
                          {post.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-3 text-sm text-gray-300 dark:text-gray-600">
                  記事を準備中です
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
