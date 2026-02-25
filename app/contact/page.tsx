import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${SITE_NAME}へのお問い合わせはこちらのページからお願いいたします。`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: "お問い合わせ" },
        ]}
      />

      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        お問い合わせ
      </h1>

      <div className="space-y-6 leading-7 text-gray-700 dark:text-gray-300">
        <p>
          {SITE_NAME}に関するご質問、ご意見、記事の内容に関するご指摘などがございましたら、
          下記のメールアドレスまでお気軽にお問い合わせください。
        </p>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
            メールでのお問い合わせ
          </h2>
          <p>
            <a
              href="mailto:contact@shikaku-no-mikata.com"
              className="text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
            >
              contact@shikaku-no-mikata.com
            </a>
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
            お問い合わせに関する注意事項
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>お問い合わせへの回答には数日いただく場合がございます。</li>
            <li>内容によってはご回答いたしかねる場合がございます。</li>
            <li>
              いただいた個人情報は、お問い合わせへの対応以外の目的では使用いたしません。
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
