import Link from "next/link";

type Props = {
  totalPosts: number;
  totalCategories: number;
};

export default function HeroSection({ totalPosts, totalCategories }: Props) {
  return (
    <section className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 md:pb-20 md:pt-24">
        <h1 className="mb-6 max-w-3xl text-4xl font-extrabold leading-[1.3] tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          あなたにぴったりの
          <span className="marker-highlight">マイナー資格</span>
          が、きっと見つかる。
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-gray-500 dark:text-gray-400">
          「何か始めたい」を行動に変える第一歩。
          費用・難易度・学習期間をひと目で比較して、自分に合った資格を探せます。
        </p>

        <div className="mb-10 flex items-center gap-6 text-sm text-gray-400 dark:text-gray-500">
          <span>
            <strong className="text-gray-900 dark:text-white">{totalPosts}</strong> 件の資格情報
          </span>
          <span className="text-gray-300 dark:text-gray-600" aria-hidden>|</span>
          <span>
            <strong className="text-gray-900 dark:text-white">{totalCategories}</strong> カテゴリ
          </span>
        </div>

        <Link
          href="/categories"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-900 bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white hover:text-gray-900 dark:border-gray-100 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-transparent dark:hover:text-gray-100"
        >
          カテゴリから探す
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
