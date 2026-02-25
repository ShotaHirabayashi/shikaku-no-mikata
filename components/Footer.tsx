import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/about"
              className="transition-colors hover:text-primary-600"
            >
              サイトについて
            </Link>
            <Link
              href="/privacy"
              className="transition-colors hover:text-primary-600"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-primary-600"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
