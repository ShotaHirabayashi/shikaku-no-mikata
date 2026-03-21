import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllQuizParams,
  getQualificationBySlug,
  getQuizTopic,
  getQuizTopics,
} from "@/lib/quiz";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";
import MdxContent from "@/components/MdxContent";
import QuizTopicSummary from "@/components/quiz/QuizTopicSummary";
import QuizTopicNav from "@/components/quiz/QuizTopicNav";

type Props = {
  params: { qualification: string; topic: string };
};

export function generateStaticParams() {
  return getAllQuizParams();
}

export function generateMetadata({ params }: Props): Metadata {
  const topic = getQuizTopic(params.qualification, params.topic);
  if (!topic) return {};

  const title = `${topic.qualificationName} ${topic.topicName} 練習問題 | ${SITE_NAME}`;

  return {
    title,
    description: topic.description,
    alternates: {
      canonical: `${SITE_URL}/quiz/${params.qualification}/${params.topic}`,
    },
    openGraph: {
      type: "website",
      title,
      description: topic.description,
      url: `${SITE_URL}/quiz/${params.qualification}/${params.topic}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: topic.description,
    },
  };
}

function JsonLd({ topic }: { topic: NonNullable<ReturnType<typeof getQuizTopic>> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: `${topic.qualificationName} ${topic.topicName}`,
    description: topic.description,
    educationalLevel: topic.qualificationName,
    about: {
      "@type": "Thing",
      name: topic.topicName,
    },
    url: `${SITE_URL}/quiz/${topic.qualification}/${topic.slug}`,
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

export default function QuizTopicPage({ params }: Props) {
  const qualification = getQualificationBySlug(params.qualification);
  if (!qualification) notFound();

  const topic = getQuizTopic(params.qualification, params.topic);
  if (!topic) notFound();

  const allTopics = getQuizTopics(params.qualification);
  const currentIndex = allTopics.findIndex((t) => t.slug === params.topic);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  return (
    <>
      <JsonLd topic={topic} />

      <div className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-4 pb-8 pt-8">
          <Breadcrumb
            items={[
              { name: "ホーム", href: "/" },
              { name: "練習問題", href: "/quiz" },
              {
                name: qualification.qualificationName,
                href: `/quiz/${params.qualification}`,
              },
              { name: topic.topicName },
            ]}
            currentPath={`/quiz/${params.qualification}/${params.topic}`}
          />

          <header className="mt-5">
            <div className="mb-3 flex items-center gap-2 text-xs">
              <Link
                href={`/quiz/${params.qualification}`}
                className="font-medium text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
              >
                {qualification.qualificationName}
              </Link>
              <span className="text-gray-300 dark:text-gray-600">·</span>
              <span className="text-gray-400 dark:text-gray-500">
                {topic.questionCount}問
              </span>
            </div>
            <h1 className="mb-3 max-w-3xl text-3xl font-extrabold leading-[1.3] tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {topic.qualificationName} {topic.topicName}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              {topic.description}
            </p>
          </header>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <QuizTopicSummary topic={topic} />

        <div className="article-content">
          <MdxContent source={topic.content} />
        </div>

        <QuizTopicNav
          qualificationSlug={params.qualification}
          prev={prevTopic}
          next={nextTopic}
        />

        <div className="mt-8">
          <Link
            href={`/quiz/${params.qualification}`}
            className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
          >
            ← {qualification.qualificationName}の分野一覧に戻る
          </Link>
        </div>
      </div>
    </>
  );
}
