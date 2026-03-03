import Link from "next/link";
import type { QuizTopicMeta } from "@/lib/quiz";

type Props = {
  qualificationSlug: string;
  prev: QuizTopicMeta | null;
  next: QuizTopicMeta | null;
};

export default function QuizTopicNav({
  qualificationSlug,
  prev,
  next,
}: Props) {
  if (!prev && !next) return null;

  return (
    <div className="mt-10 grid gap-4 border-t border-gray-200 pt-6 dark:border-gray-800 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/quiz/${qualificationSlug}/${prev.slug}`}
          className="group rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-300 hover:bg-primary-50/50 dark:border-gray-700 dark:hover:border-primary-700 dark:hover:bg-primary-950/20"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500">
            前の分野
          </span>
          <p className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
            ← {prev.topicName}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/quiz/${qualificationSlug}/${next.slug}`}
          className="group rounded-lg border border-gray-200 p-4 text-right transition-colors hover:border-primary-300 hover:bg-primary-50/50 dark:border-gray-700 dark:hover:border-primary-700 dark:hover:bg-primary-950/20"
        >
          <span className="text-xs text-gray-400 dark:text-gray-500">
            次の分野
          </span>
          <p className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
            {next.topicName} →
          </p>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
