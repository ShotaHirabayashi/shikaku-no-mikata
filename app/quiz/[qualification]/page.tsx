import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllQualificationSlugs,
  getQualificationBySlug,
  getQuizTopics,
} from "@/lib/quiz";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import QuizTopicList from "@/components/quiz/QuizTopicList";

type Props = {
  params: { qualification: string };
};

export function generateStaticParams() {
  return getAllQualificationSlugs().map((slug) => ({ qualification: slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const qualification = getQualificationBySlug(params.qualification);
  if (!qualification) return {};

  const title = `${qualification.qualificationName} 練習問題 | ${SITE_NAME}`;

  return {
    title,
    description: qualification.description,
    alternates: {
      canonical: `${SITE_URL}/quiz/${qualification.slug}`,
    },
    openGraph: {
      type: "website",
      title,
      description: qualification.description,
      url: `${SITE_URL}/quiz/${qualification.slug}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: qualification.description,
    },
  };
}

function JsonLd({
  qualification,
}: {
  qualification: NonNullable<ReturnType<typeof getQualificationBySlug>>;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${qualification.qualificationName} 練習問題`,
    description: qualification.description,
    url: `${SITE_URL}/quiz/${qualification.slug}`,
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

export default function QualificationPage({ params }: Props) {
  const qualification = getQualificationBySlug(params.qualification);
  if (!qualification) notFound();

  const topics = getQuizTopics(params.qualification);
  const totalQuestions = topics.reduce((sum, t) => sum + t.questionCount, 0);

  return (
    <>
      <JsonLd qualification={qualification} />

      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8">
          <Breadcrumb
            items={[
              { name: "ホーム", href: "/" },
              { name: "練習問題", href: "/quiz" },
              { name: qualification.qualificationName },
            ]}
            currentPath={`/quiz/${params.qualification}`}
          />
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {qualification.qualificationName} 練習問題
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {qualification.description}
          </p>
          <div className="mt-4 flex gap-4 text-sm text-gray-400 dark:text-gray-500">
            <span>{topics.length}分野</span>
            <span>{totalQuestions}問</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
          分野一覧
        </h2>
        <QuizTopicList
          topics={topics}
          qualificationSlug={params.qualification}
        />

        <div className="mt-8">
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← 練習問題一覧に戻る
          </Link>
        </div>
      </div>
    </>
  );
}
