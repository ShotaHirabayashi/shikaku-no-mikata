import { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "サイトについて",
  description: `${SITE_NAME}は、マイナー資格・通信講座の情報を徹底比較するメディアサイトです。`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: "サイトについて" },
        ]}
      />

      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        サイトについて
      </h1>

      <div className="space-y-6 leading-7 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            {SITE_NAME}とは
          </h2>
          <p>
            {SITE_NAME}は、知名度は低いけれど実用的で魅力的な「マイナー資格」に特化した情報メディアです。
            資格の概要、取得費用、難易度、おすすめの通信講座などを徹底比較し、あなたに最適な資格選びをサポートします。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            編集方針
          </h2>
          <ul className="ml-6 list-disc space-y-2">
            <li>
              <strong className="text-gray-900 dark:text-white">正確性</strong>
              ：公式サイトや信頼性の高い情報源に基づいた記事作成を心がけています。
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">中立性</strong>
              ：特定の講座や資格を不当に優遇することなく、客観的な比較情報を提供します。
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">実用性</strong>
              ：読者が実際の資格選び・講座選びに役立てられる情報を重視します。
            </li>
            <li>
              <strong className="text-gray-900 dark:text-white">最新性</strong>
              ：定期的に情報を見直し、最新の料金・制度変更を反映します。
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            運営情報
          </h2>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 pr-4 text-left font-medium text-gray-900 dark:text-white">
                  サイト名
                </th>
                <td className="py-3">{SITE_NAME}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 pr-4 text-left font-medium text-gray-900 dark:text-white">
                  URL
                </th>
                <td className="py-3">{SITE_URL}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 pr-4 text-left font-medium text-gray-900 dark:text-white">
                  お問い合わせ
                </th>
                <td className="py-3">
                  <a
                    href="/contact"
                    className="text-primary-600 hover:text-primary-800 dark:text-primary-400"
                  >
                    お問い合わせページ
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
