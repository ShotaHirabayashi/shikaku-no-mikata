import { Metadata } from "next";
import Link from "next/link";
import { getQualificationsByGroup } from "@/lib/quiz";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import QuizQualificationCard from "@/components/quiz/QuizQualificationCard";

export const metadata: Metadata = {
  title: `練習問題一覧 | ${SITE_NAME}`,
  description:
    "資格試験の練習問題を分野別に収録。色彩検定など、各資格の重要ポイントを問題形式で学べます。",
  alternates: {
    canonical: `${SITE_URL}/quiz`,
  },
  openGraph: {
    type: "website",
    title: `練習問題一覧 | ${SITE_NAME}`,
    description:
      "資格試験の練習問題を分野別に収録。色彩検定など、各資格の重要ポイントを問題形式で学べます。",
    url: `${SITE_URL}/quiz`,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `練習問題一覧 | ${SITE_NAME}`,
    description:
      "資格試験の練習問題を分野別に収録。色彩検定など、各資格の重要ポイントを問題形式で学べます。",
  },
};

function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `練習問題一覧 | ${SITE_NAME}`,
    description:
      "資格試験の練習問題を分野別に収録。色彩検定など、各資格の重要ポイントを問題形式で学べます。",
    url: `${SITE_URL}/quiz`,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function QuizTopPage() {
  const groups = getQualificationsByGroup();

  return (
    <>
      <JsonLd />

      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8">
          <Breadcrumb
            items={[
              { name: "ホーム", href: "/" },
              { name: "練習問題" },
            ]}
          />
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            練習問題
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            資格試験の練習問題を分野別に収録しています。問題と解説で知識を確認しましょう。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {groups.map((group) => (
          <section key={group.group} className="mb-10 last:mb-0">
            <h2 className="mb-4 border-l-[3px] border-primary-500 pl-4 text-lg font-bold text-gray-900 dark:border-primary-400 dark:text-white">
              {group.group}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.qualifications.map((q) => (
                <QuizQualificationCard key={q.slug} qualification={q} />
              ))}
            </div>
          </section>
        ))}

        {groups.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            練習問題は現在準備中です。
          </p>
        )}

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </>
  );
}
