import Link from "next/link";
import type { QualificationMeta } from "@/lib/quiz";

type Props = {
  qualification: QualificationMeta;
};

export default function RelatedQuizBanner({ qualification }: Props) {
  return (
    <div className="mt-8 rounded-lg border border-primary-200 bg-primary-50/50 p-5 dark:border-primary-800 dark:bg-primary-950/20">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
        練習問題
      </p>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
        {qualification.qualificationName}の練習問題に挑戦しませんか？全{qualification.totalQuestions}問を分野別に収録しています。
      </p>
      <Link
        href={`/quiz/${qualification.slug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
      >
        練習問題を見る →
      </Link>
    </div>
  );
}
