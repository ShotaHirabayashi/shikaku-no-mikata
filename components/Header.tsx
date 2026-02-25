"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { PostMeta } from "@/lib/mdx";
import SearchModal from "@/components/SearchModal";

type Props = {
  categories?: string[];
  searchPosts?: PostMeta[];
};

export default function Header({ categories = [], searchPosts = [] }: Props) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between py-3">
            {/* ロゴ */}
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="シカクのミカタ"
                width={28}
                height={28}
                className="rounded"
              />
              <span className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
                シカクのミカタ
              </span>
            </Link>

            {/* デスクトップナビ */}
            {categories.length > 0 && (
              <nav className="hidden items-center gap-1 md:flex">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${encodeURIComponent(cat)}`}
                    className="rounded-md px-3 py-1.5 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    {cat}
                  </Link>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-1">
              {/* 検索 */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="検索"
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-gray-400 md:inline-block dark:border-gray-700">
                  ⌘K
                </kbd>
              </button>

              {/* ダークモード */}
              <button
                onClick={toggleDarkMode}
                aria-label="テーマ切り替え"
                className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                {darkMode ? (
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* ハンバーガー */}
              {categories.length > 0 && (
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label="メニュー"
                  className="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 md:hidden dark:hover:bg-gray-800 dark:hover:text-gray-200"
                >
                  {menuOpen ? (
                    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* モバイルメニュー */}
          <div
            className={`overflow-hidden transition-all duration-200 md:hidden ${
              menuOpen && categories.length > 0
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <nav className="border-t border-gray-100 pb-3 pt-2 dark:border-gray-800">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${encodeURIComponent(cat)}`}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  {cat}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <SearchModal
        posts={searchPosts}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
