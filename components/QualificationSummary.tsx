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
          className={`h-3.5 w-3.5 ${i <= level ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}`}
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
    post.difficulty && {
      label: "難易度",
      value: (
        <div className="flex items-center gap-2">
          {post.difficulty && <StarRating level={post.difficulty} />}
          {difficultyInfo && (
            <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${difficultyInfo.className}`}>
              {difficultyInfo.label}
            </span>
          )}
        </div>
      ),
    },
    post.costRange && { label: "費用目安", value: post.costRange },
    post.studyPeriod && { label: "学習期間", value: post.studyPeriod },
    post.passingRate && { label: "合格率", value: post.passingRate },
    post.examInfo && { label: "試験形式", value: post.examInfo },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-100 px-5 py-3 dark:border-gray-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          資格情報
        </h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between px-5 py-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      {post.officialUrl && (
        <div className="border-t border-gray-100 px-5 py-3 dark:border-gray-800">
          <a
            href={post.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            公式サイト →
          </a>
        </div>
      )}
    </div>
  );
}
