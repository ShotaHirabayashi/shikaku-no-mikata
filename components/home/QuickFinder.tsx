import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

type Props = {
  posts: PostMeta[];
};

export default function QuickFinder({ posts }: Props) {
  const beginnerPosts = posts
    .filter((p) => p.difficulty && p.difficulty <= 2)
    .slice(0, 3);

  const lowCostPosts = posts
    .filter((p) => {
      if (!p.costRange) return false;
      const match = p.costRange.match(/(\d+)/);
      return match && parseInt(match[1]) <= 3;
    })
    .slice(0, 3);

  const shortTermPosts = posts
    .filter((p) => {
      if (!p.studyPeriod) return false;
      const match = p.studyPeriod.match(/(\d+)/);
      return match && parseInt(match[1]) <= 2;
    })
    .slice(0, 3);

  const axes = [
    {
      title: "初心者向け",
      description: "難易度が低く、初めての資格取得におすすめ",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      color: "from-blue-500 to-primary-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      posts: beginnerPosts,
    },
    {
      title: "低コスト",
      description: "3万円以下で取得できるコスパ抜群の資格",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
      posts: lowCostPosts,
    },
    {
      title: "短期取得",
      description: "2ヶ月以内で取得できるスピード資格",
      icon: (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
      posts: shortTermPosts,
    },
  ];

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            目的から探す
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            あなたの条件に合った資格をすぐに見つけられます
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {axes.map((axis) => (
            <div
              key={axis.title}
              className={`card-hover rounded-2xl ${axis.bgColor} p-6`}
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${axis.color} p-3 text-white`}
              >
                {axis.icon}
              </div>
              <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                {axis.title}
              </h3>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {axis.description}
              </p>

              {axis.posts.length > 0 ? (
                <ul className="space-y-2">
                  {axis.posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/${post.slug}`}
                        className="flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-white dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <svg className="h-3 w-3 flex-shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                        <span className="line-clamp-1">{post.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  該当する記事がまだありません
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
