"use client";

import { useState } from "react";

export default function QuizAnswer({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-4 rounded-lg border border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
      >
        <span className="text-xs">{isOpen ? "▼" : "▶"}</span>
        {isOpen ? "答えと解説を閉じる" : "答えと解説を見る"}
      </button>
      {isOpen && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-2 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}
