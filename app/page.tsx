import Image from "next/image";
import { getAllPosts } from "@/lib/mdx";
import ArticleCard from "@/components/ArticleCard";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-4 py-12 md:flex-row md:py-20">
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              あなたにぴったりの
              <br />
              <span className="text-primary-600 dark:text-primary-400">
                マイナー資格
              </span>
              が見つかる
            </h1>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              {SITE_DESCRIPTION}
            </p>
            <a
              href="#articles"
              className="inline-block rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              記事を読む
            </a>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/hero.png"
              alt={SITE_NAME}
              width={400}
              height={300}
              className="rounded-2xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
          最新記事
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            まだ記事がありません。
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
