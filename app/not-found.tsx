import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="mb-4 text-6xl font-bold text-gray-300 dark:text-gray-600">
        404
      </h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
        お探しのページが見つかりませんでした。
      </p>
      <Link
        href="/"
        className="rounded-lg bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
