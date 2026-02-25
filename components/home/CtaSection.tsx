import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center dark:border-gray-700 dark:bg-gray-900 md:px-12 md:py-14">
        <p className="mb-2 text-sm font-medium tracking-wider text-primary-600 dark:text-primary-400">
          FIND YOUR NEXT STEP
        </p>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          新しい一歩を、ここから。
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          資格は「取って終わり」ではなく「始まり」です。
          あなたのキャリアや暮らしを変える資格を、一緒に探しましょう。
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-gray-900 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-transparent dark:hover:text-gray-100"
          >
            カテゴリ一覧を見る
          </Link>
          <Link
            href="#latest"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-600 transition-all hover:border-gray-400 hover:text-gray-900 dark:border-gray-600 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-white"
          >
            最新記事を読む
          </Link>
        </div>
      </div>
    </section>
  );
}
