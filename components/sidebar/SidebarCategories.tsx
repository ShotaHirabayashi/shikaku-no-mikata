import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

type Props = {
  categories: { name: string; count: number }[];
};

export default function SidebarCategories({ categories }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        カテゴリ
      </h3>
      <ul className="space-y-0 divide-y divide-gray-100 dark:divide-gray-800">
        {CATEGORIES.map((cat) => {
          const found = categories.find((c) => c.name === cat.name);
          const count = found?.count ?? 0;
          return (
            <li key={cat.name}>
              <Link
                href={`/category/${encodeURIComponent(cat.name)}`}
                className="flex items-center justify-between py-2.5 text-sm text-gray-600 transition-colors hover:text-primary-700 dark:text-gray-400 dark:hover:text-primary-400"
              >
                <span>{cat.name}</span>
                <span className="text-xs tabular-nums text-gray-300 dark:text-gray-600">
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
