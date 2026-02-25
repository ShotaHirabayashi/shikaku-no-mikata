"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

type Props = {
  items: TocItem[];
};

export default function SidebarToc({ items }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        目次
      </h3>
      <ul className="space-y-0.5 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-md px-2.5 py-1.5 transition-colors ${
                item.level === 3 ? "ml-3 text-[13px]" : ""
              } ${
                activeId === item.id
                  ? "bg-primary-50 font-medium text-primary-700 dark:bg-primary-950 dark:text-primary-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
