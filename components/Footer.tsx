import Link from "next/link";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* サイト説明 */}
          <div>
            <Link href="/" className="mb-3 inline-block">
              <span className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-white">
                シカクのミカタ
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400 dark:text-gray-500">
              「何か始めたい」を行動に変える資格メディア。
              マイナーだけど実力派の資格を、費用・難易度・期間で比較できます。
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              カテゴリ
            </h3>
            <ul className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/category/${encodeURIComponent(cat.name)}`}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報 */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              サイト情報
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  サイトについて
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                  カテゴリ一覧
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6 text-center text-xs text-gray-400 dark:border-gray-800 dark:text-gray-600">
          &copy; {new Date().getFullYear()} {SITE_NAME}
        </div>
      </div>
    </footer>
  );
}
