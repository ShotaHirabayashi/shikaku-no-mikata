import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-12 border-l-[3px] border-primary-500 pl-4 text-xl font-bold text-gray-900 dark:border-primary-400 dark:text-white"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-8 text-lg font-bold text-gray-800 dark:text-gray-100"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-4 text-[15px] leading-[1.9] text-gray-600 dark:text-gray-300"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-1 text-[15px] text-gray-600 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-1 text-[15px] text-gray-600 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.9]" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 rounded-r-md border-l-[3px] border-accent-400 bg-accent-50/50 py-3 pl-5 pr-4 text-[15px] text-gray-600 dark:border-accent-600 dark:bg-accent-950/20 dark:text-gray-300"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table
        className="w-full border-collapse text-sm text-gray-600 dark:text-gray-300"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-gray-50 dark:bg-gray-800"
      {...props}
    />
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-b border-gray-200 px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:text-gray-400"
      {...props}
    />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="even:bg-gray-50/50 dark:even:bg-gray-800/30"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-b border-gray-100 px-4 py-2.5 dark:border-gray-800"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary-600 underline decoration-primary-200 underline-offset-2 transition-colors hover:decoration-primary-500 dark:text-primary-400 dark:decoration-primary-800 dark:hover:decoration-primary-500"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900 dark:text-white" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-6">
      <Image
        src={props.src ?? ""}
        alt={props.alt ?? ""}
        width={800}
        height={450}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      {props.alt && (
        <figcaption className="mt-2 text-center text-xs text-gray-400 dark:text-gray-500">
          {props.alt}
        </figcaption>
      )}
    </figure>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !String(props.children).includes("\n");
    if (isInline) {
      return (
        <code
          className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
      {...props}
    />
  ),
};

export default function MdxContent({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
      }}
    />
  );
}
