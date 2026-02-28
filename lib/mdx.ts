import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  keyword?: string;
  thumbnail?: string;
  difficulty?: 1 | 2 | 3 | 4 | 5;
  costRange?: string;
  studyPeriod?: string;
  examInfo?: string;
  passingRate?: string;
  officialUrl?: string;
  featured?: boolean;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(contentDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      category: data.category ?? "",
      tags: data.tags ?? [],
      keyword: data.keyword,
      thumbnail: data.thumbnail,
      difficulty: data.difficulty,
      costRange: data.costRange,
      studyPeriod: data.studyPeriod,
      examInfo: data.examInfo,
      passingRate: data.passingRate,
      officialUrl: data.officialUrl,
      featured: data.featured,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "",
    tags: data.tags ?? [],
    keyword: data.keyword,
    thumbnail: data.thumbnail,
    difficulty: data.difficulty,
    costRange: data.costRange,
    studyPeriod: data.studyPeriod,
    examInfo: data.examInfo,
    passingRate: data.passingRate,
    officialUrl: data.officialUrl,
    featured: data.featured,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];

  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllCategories(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const post of posts) {
    if (post.category) {
      map.set(post.category, (map.get(post.category) ?? 0) + 1);
    }
  }
  return Array.from(map, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count
  );
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(map, ([name, count]) => ({ name, count })).sort(
    (a, b) => b.count - a.count
  );
}

/**
 * keywordから資格名を抽出（最初のスペース区切りの前半部分）
 * 例: "整理収納アドバイザー 資格" → "整理収納アドバイザー"
 */
function extractQualificationName(keyword?: string): string | null {
  if (!keyword) return null;
  const name = keyword.split(/\s+/)[0];
  return name && name.length >= 2 ? name : null;
}

export function getRelatedPosts(slug: string, limit = 4): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const all = getAllPosts().filter((p) => p.slug !== slug);
  const currentQualification = extractQualificationName(current.keyword);

  const scored = all.map((post) => {
    let score = 0;

    // 同じ資格のキーワードを持つ記事を最優先
    const postQualification = extractQualificationName(post.keyword);
    if (currentQualification && postQualification && currentQualification === postQualification) {
      score += 5;
    }

    if (post.category === current.category) score += 3;
    for (const tag of post.tags) {
      if (current.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post);
}

/**
 * 同じ資格に関する他の記事を取得（内部リンク用）
 */
export function getSameQualificationPosts(slug: string): PostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const currentQualification = extractQualificationName(current.keyword);
  if (!currentQualification) return [];

  return getAllPosts().filter((p) => {
    if (p.slug === slug) return false;
    const pQualification = extractQualificationName(p.keyword);
    return pQualification === currentQualification;
  });
}
