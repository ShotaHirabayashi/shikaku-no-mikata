import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* カラム1: ロゴ + サイト説明 */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="mb-3 inline-block">
              <span className="text-xl font-extrabold text-white">
                シカクのミカタ
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* カラム2: カテゴリ */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-white">カテゴリ</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={`/category/${encodeURIComponent(cat.name)}`}
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* カラム3: サイト情報 */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-white">サイト情報</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  サイトについて
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  カテゴリ一覧
                </Link>
              </li>
            </ul>
          </div>

          {/* カラム4: CTA */}
          <div>
            <h3 className="mb-3 text-sm font-bold text-white">
              資格を見つけよう
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              あなたに合った資格がきっと見つかります。カテゴリから探してみましょう。
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              カテゴリ一覧を見る
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
