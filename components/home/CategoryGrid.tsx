import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";

type Props = {
  categoryCounts: { name: string; count: number }[];
};

export default function CategoryGrid({ categoryCounts }: Props) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          カテゴリ
        </h2>
        <Link
          href="/categories"
          className="text-sm text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
        >
          すべて見る →
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:gap-4 md:overflow-visible lg:grid-cols-6">
        {CATEGORIES.map((cat) => {
          const count =
            categoryCounts.find((c) => c.name === cat.name)?.count ?? 0;
          return (
            <Link
              key={cat.name}
              href={`/category/${encodeURIComponent(cat.name)}`}
              className="group flex min-w-[140px] flex-col items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-5 text-center transition-all hover:border-primary-400 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:border-primary-500 md:min-w-0"
            >
              <span className="text-gray-400 transition-colors group-hover:text-primary-600 dark:text-gray-500 dark:group-hover:text-primary-400">
                <CategoryIcon name={cat.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {count}件
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
