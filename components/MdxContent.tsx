import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-10 border-b-2 border-primary-200 pb-2 text-2xl font-bold text-gray-900 dark:border-primary-800 dark:text-white"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-8 text-xl font-bold text-gray-800 dark:text-gray-100"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-4 leading-7 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-4 ml-6 list-disc space-y-1 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-4 ml-6 list-decimal space-y-1 text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mb-4 border-l-4 border-primary-400 bg-primary-50 py-2 pl-4 text-gray-700 dark:border-primary-600 dark:bg-gray-800 dark:text-gray-300"
      {...props}
    />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-4 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm text-gray-700 dark:text-gray-300"
        {...props}
      />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold dark:border-gray-600 dark:bg-gray-700"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border border-gray-300 px-4 py-2 dark:border-gray-600"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary-600 underline decoration-primary-300 underline-offset-2 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900 dark:text-white" {...props} />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="mb-4">
      <Image
        src={props.src ?? ""}
        alt={props.alt ?? ""}
        width={800}
        height={450}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, 768px"
      />
      {props.alt && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
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
          className="rounded bg-gray-100 px-1.5 py-0.5 text-sm text-primary-700 dark:bg-gray-800 dark:text-primary-300"
          {...props}
        />
      );
    }
    return <code {...props} />;
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100"
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
