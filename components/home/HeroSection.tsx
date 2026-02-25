import { SITE_DESCRIPTION } from "@/lib/constants";
import Link from "next/link";

type Props = {
  totalPosts: number;
  totalCategories: number;
};

export default function HeroSection({ totalPosts, totalCategories }: Props) {
  return (
    <section className="relative overflow-hidden">
      {/* メッシュグラデーション背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
      <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary-200/30 blur-3xl dark:bg-primary-900/20" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-accent-200/30 blur-3xl dark:bg-accent-900/20" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          {/* テキスト */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              あなたにぴったりの
              <br />
              <span className="gradient-text">マイナー資格</span>
              が見つかる
            </h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300 md:text-xl">
              {SITE_DESCRIPTION}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                資格を探す
              </Link>
              <Link
                href="#latest"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition-all hover:border-primary-300 hover:bg-primary-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-primary-500 dark:hover:bg-gray-700"
              >
                最新記事を読む
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 統計カウンター + イラスト */}
          <div className="flex flex-shrink-0 flex-col items-center gap-6">
            <div className="animate-float rounded-3xl bg-white/60 p-8 shadow-2xl backdrop-blur-sm dark:bg-gray-800/60">
              <div className="mb-4 text-center text-6xl">📚</div>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                    {totalPosts}+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    掲載資格数
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-accent-600 dark:text-accent-400">
                    {totalCategories}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    カテゴリ
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {totalPosts}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    記事数
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
