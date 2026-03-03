import Link from "next/link";
import type { QuizTopicMeta } from "@/lib/quiz";
import ImportanceStars from "./ImportanceStars";

type Props = {
  topics: QuizTopicMeta[];
  qualificationSlug: string;
};

export default function QuizTopicList({ topics, qualificationSlug }: Props) {
  return (
    <div className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white dark:divide-gray-800 dark:border-gray-700 dark:bg-gray-900">
      {topics.map((topic) => (
        <Link
          key={topic.slug}
          href={`/quiz/${qualificationSlug}/${topic.slug}`}
          className="group flex items-center justify-between px-5 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-gray-900 group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
                {topic.topicName}
              </span>
              <ImportanceStars level={topic.importance} />
            </div>
            <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
              {topic.description}
            </p>
          </div>
          <span className="ml-4 shrink-0 text-sm text-gray-400 dark:text-gray-500">
            {topic.questionCount}問
          </span>
        </Link>
      ))}
    </div>
  );
}
