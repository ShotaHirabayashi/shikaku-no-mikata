import GithubSlugger from "github-slugger";

export type TocItem = {
  text: string;
  id: string;
  level: 2 | 3;
};

export function extractToc(content: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;

  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugger.slug(text);
    items.push({ text, id, level });
  }

  return items;
}
