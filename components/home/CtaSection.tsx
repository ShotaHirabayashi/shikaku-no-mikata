import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 px-8 py-14 text-center text-white shadow-2xl md:px-16">
          {/* 装飾 */}
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">
              あなたの可能性を広げる資格を見つけよう
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              シカクのミカタでは、マイナーだけど実力派の資格を多数紹介中。
              費用・難易度・学習期間をひと目で比較して、ぴったりの資格を見つけましょう。
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 font-bold text-primary-600 shadow-lg transition-all hover:bg-gray-50 hover:shadow-xl"
              >
                カテゴリから探す
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#latest"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-8 py-3.5 font-bold text-white transition-all hover:bg-white/10"
              >
                最新記事を読む
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
