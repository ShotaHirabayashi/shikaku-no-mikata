import type { PostMeta } from "@/lib/mdx";
import { DIFFICULTY_LABELS } from "@/lib/constants";

type Props = {
  post: PostMeta;
};

function StarRating({ level }: { level: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i <= level ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function QualificationSummary({ post }: Props) {
  const hasData =
    post.difficulty || post.costRange || post.studyPeriod || post.passingRate || post.examInfo;

  if (!hasData) return null;

  const difficultyInfo =
    post.difficulty ? DIFFICULTY_LABELS[post.difficulty] : null;

  const items = [
    {
      show: !!post.difficulty,
      label: "難易度",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      content: (
        <div className="space-y-1">
          {post.difficulty && <StarRating level={post.difficulty} />}
          {difficultyInfo && (
            <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${difficultyInfo.className}`}>
              {difficultyInfo.label}
            </span>
          )}
        </div>
      ),
    },
    {
      show: !!post.costRange,
      label: "費用目安",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
        </svg>
      ),
      content: (
        <span className="font-semibold text-gray-900 dark:text-white">
          {post.costRange}
        </span>
      ),
    },
    {
      show: !!post.studyPeriod,
      label: "学習期間",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      content: (
        <span className="font-semibold text-gray-900 dark:text-white">
          {post.studyPeriod}
        </span>
      ),
    },
    {
      show: !!post.passingRate,
      label: "合格率",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      content: (
        <span className="font-semibold text-gray-900 dark:text-white">
          {post.passingRate}
        </span>
      ),
    },
    {
      show: !!post.examInfo,
      label: "試験形式",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      content: (
        <span className="font-semibold text-gray-900 dark:text-white">
          {post.examInfo}
        </span>
      ),
    },
  ];

  const visibleItems = items.filter((item) => item.show);

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-primary-50/50 to-accent-50/50 dark:border-gray-700 dark:from-gray-800/50 dark:to-gray-800/50">
      <div className="border-b border-gray-200/60 bg-white/50 px-6 py-3 dark:border-gray-700/60 dark:bg-gray-800/50">
        <h2 className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
          <svg className="h-4 w-4 text-primary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          資格情報サマリー
        </h2>
      </div>
      <div className={`grid gap-4 p-6 ${visibleItems.length <= 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"}`}>
        {visibleItems.map((item) => (
          <div key={item.label} className="text-center">
            <div className="mb-2 inline-flex rounded-lg bg-white p-2 text-primary-500 shadow-sm dark:bg-gray-700 dark:text-primary-400">
              {item.icon}
            </div>
            <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
              {item.label}
            </div>
            {item.content}
          </div>
        ))}
      </div>
      {post.officialUrl && (
        <div className="border-t border-gray-200/60 bg-white/30 px-6 py-3 text-center dark:border-gray-700/60 dark:bg-gray-800/30">
          <a
            href={post.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            公式サイトを見る
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
