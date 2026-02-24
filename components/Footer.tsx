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
            <a href="#" className="hover:text-primary-600 transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-primary-600 transition-colors">
              お問い合わせ
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
