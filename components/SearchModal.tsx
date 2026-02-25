"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/mdx";

type Props = {
  posts: PostMeta[];
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ posts, isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? posts.filter((post) => {
        const q = query.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((t) => t.toLowerCase().includes(q)) ||
          post.category.toLowerCase().includes(q)
        );
      })
    : [];

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* モーダル本体 */}
      <div className="relative mx-4 w-full max-w-xl animate-fade-in-up rounded-2xl bg-white shadow-2xl dark:bg-gray-800">
        {/* 検索入力 */}
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事を検索..."
            className="flex-1 bg-transparent text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
          />
          <kbd className="hidden rounded-md border border-gray-300 px-2 py-0.5 text-xs text-gray-400 sm:inline-block dark:border-gray-600">
            ESC
          </kbd>
        </div>

        {/* 検索結果 */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {query.trim() === "" ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              キーワードを入力して記事を検索
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              「{query}」に一致する記事が見つかりませんでした
            </div>
          ) : (
            <ul>
              {filtered.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${post.slug}`}
                    onClick={handleClose}
                    className="flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                        {post.category}
                      </span>
                      <time className="text-xs text-gray-400">
                        {new Date(post.date).toLocaleDateString("ja-JP")}
                      </time>
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {post.title}
                    </span>
                    <span className="line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                      {post.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
