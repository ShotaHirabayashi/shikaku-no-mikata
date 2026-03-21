import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export type BreadcrumbItem = {
  name: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  currentPath?: string;
};

export default function Breadcrumb({ items, currentPath }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => {
      const isLast = i === items.length - 1;
      const url = item.href
        ? `${SITE_URL}${item.href}`
        : isLast && currentPath
          ? `${SITE_URL}${currentPath}`
          : undefined;

      return {
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(url ? { item: url } : {}),
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {items.map((item, i) => (
          <span key={i}>
            {i > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-primary-600"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-700 dark:text-gray-200">
                {item.name}
              </span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
