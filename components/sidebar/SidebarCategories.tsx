import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import CategoryIcon from "@/components/CategoryIcon";

type Props = {
  categories: { name: string; count: number }[];
};

export default function SidebarCategories({ categories }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
        <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        カテゴリ
      </h3>
      <ul className="space-y-1">
        {CATEGORIES.map((cat) => {
          const found = categories.find((c) => c.name === cat.name);
          const count = found?.count ?? 0;
          return (
            <li key={cat.name}>
              <Link
                href={`/category/${encodeURIComponent(cat.name)}`}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <CategoryIcon name={cat.icon} className="h-4 w-4 flex-shrink-0 opacity-60" />
                <span className="flex-1">{cat.name}</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-600 dark:text-gray-400">
                  {count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
