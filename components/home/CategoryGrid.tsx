import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";

type Props = {
  categoryCounts: { name: string; count: number }[];
};

const colorMap: Record<string, string> = {
  primary:
    "bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-950 dark:text-primary-400 dark:hover:bg-primary-900",
  pink: "bg-pink-50 text-pink-600 hover:bg-pink-100 dark:bg-pink-950 dark:text-pink-400 dark:hover:bg-pink-900",
  amber:
    "bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:hover:bg-amber-900",
  emerald:
    "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:hover:bg-emerald-900",
  rose: "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-400 dark:hover:bg-rose-900",
  violet:
    "bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-950 dark:text-violet-400 dark:hover:bg-violet-900",
};

export default function CategoryGrid({ categoryCounts }: Props) {
  return (
    <section className="section-padding mx-auto max-w-6xl">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          カテゴリから探す
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          あなたの興味に合ったジャンルから資格を見つけましょう
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const count =
            categoryCounts.find((c) => c.name === cat.name)?.count ?? 0;
          return (
            <Link
              key={cat.name}
              href={`/category/${encodeURIComponent(cat.name)}`}
              className={`card-hover group flex items-start gap-4 rounded-2xl p-5 transition-colors ${colorMap[cat.color] ?? colorMap.primary}`}
            >
              <div className="flex-shrink-0 rounded-xl bg-white/60 p-3 dark:bg-gray-800/60">
                <CategoryIcon name={cat.icon} className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{cat.name}</h3>
                  <span className="rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium dark:bg-gray-800/60">
                    {count}件
                  </span>
                </div>
                <p className="mt-1 text-sm opacity-80">{cat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
