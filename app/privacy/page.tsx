import { Metadata } from "next";
import { SITE_NAME } from "@/lib/constants";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${SITE_NAME}のプライバシーポリシーです。個人情報の取り扱い、Cookie、アクセス解析について説明します。`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumb
        items={[
          { name: "ホーム", href: "/" },
          { name: "プライバシーポリシー" },
        ]}
      />

      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
        プライバシーポリシー
      </h1>

      <div className="space-y-8 leading-7 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            個人情報の取り扱いについて
          </h2>
          <p>
            {SITE_NAME}（以下「当サイト」）では、お問い合わせの際にお名前やメールアドレスなどの個人情報をご提供いただく場合があります。
            取得した個人情報は、お問い合わせへの回答や必要な情報提供のために利用し、それ以外の目的で利用することはありません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            Cookie（クッキー）について
          </h2>
          <p>
            当サイトでは、ユーザー体験の向上（テーマ設定の保存など）のためにCookieを使用しています。
            Cookieはブラウザの設定により無効にすることが可能です。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            アクセス解析ツールについて
          </h2>
          <p>
            当サイトでは、Googleアナリティクス等のアクセス解析ツールを使用する場合があります。
            これらのツールはトラフィックデータの収集のためにCookieを使用しています。
            このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            広告について
          </h2>
          <p>
            当サイトでは、第三者配信の広告サービスを利用する場合があります。
            広告配信事業者は、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            免責事項
          </h2>
          <p>
            当サイトに掲載された情報については、正確性を期しておりますが、その内容の正確性・完全性を保証するものではありません。
            当サイトの情報を利用したことによるいかなる損害についても、一切の責任を負いかねます。
            各資格・講座の最新情報は、公式サイトにてご確認ください。
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            プライバシーポリシーの変更について
          </h2>
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。
            変更後のプライバシーポリシーは、当ページにて公開した時点から効力を生じるものとします。
          </p>
        </section>
      </div>
    </div>
  );
}
