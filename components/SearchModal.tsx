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
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative mx-4 w-full max-w-lg animate-fade-in-up rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-gray-800">
          <svg className="h-4 w-4 flex-shrink-0 text-gray-300 dark:text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="記事を検索..."
            className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
          />
          <kbd className="hidden rounded border border-gray-200 px-1.5 py-0.5 text-[10px] text-gray-400 sm:inline-block dark:border-gray-700">
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
              キーワードを入力して検索
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-10 text-center text-sm text-gray-400 dark:text-gray-500">
              一致する記事が見つかりませんでした
            </div>
          ) : (
            <ul className="py-1">
              {filtered.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/${post.slug}`}
                    onClick={handleClose}
                    className="block px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="mb-0.5 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                      <span className="font-medium text-primary-600 dark:text-primary-400">
                        {post.category}
                      </span>
                      <span>·</span>
                      <time>{new Date(post.date).toLocaleDateString("ja-JP")}</time>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {post.title}
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
