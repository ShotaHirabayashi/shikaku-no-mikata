import Link from "next/link";
import type { QualificationMeta } from "@/lib/quiz";

type Props = {
  qualification: QualificationMeta;
};

export default function QuizQualificationCard({ qualification }: Props) {
  return (
    <Link
      href={`/quiz/${qualification.slug}`}
      className="card-accent group block rounded-lg"
    >
      <div className="p-5">
        <h3 className="mb-2 text-[15px] font-bold text-gray-900 transition-colors group-hover:text-primary-700 dark:text-white dark:group-hover:text-primary-400">
          {qualification.qualificationName}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {qualification.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
          <span>{qualification.totalQuestions}問</span>
          <span>
            {new Date(qualification.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
