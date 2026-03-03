import type { QuizTopicMeta } from "@/lib/quiz";
import ImportanceStars from "./ImportanceStars";

type Props = {
  topic: QuizTopicMeta;
};

export default function QuizTopicSummary({ topic }: Props) {
  const items = [
    {
      label: "分野",
      value: topic.topicName,
    },
    {
      label: "問題数",
      value: `${topic.questionCount}問`,
    },
    {
      label: "出題頻度",
      value: <ImportanceStars level={topic.importance} />,
    },
  ];

  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-100 px-5 py-3 dark:border-gray-800">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          問題情報
        </h2>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between px-5 py-3"
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
