import fs from "fs";
import path from "path";
import matter from "gray-matter";

const quizDir = path.join(process.cwd(), "content", "quiz");

// --- 型定義 ---

export type QualificationMeta = {
  slug: string;
  title: string;
  description: string;
  qualification: string;
  qualificationName: string;
  group: string;
  date: string;
  totalQuestions: number;
  relatedArticleSlugs: string[];
};

export type Qualification = QualificationMeta & {
  content: string;
};

export type QuizTopicMeta = {
  slug: string;
  qualification: string;
  qualificationName: string;
  topic: string;
  topicName: string;
  title: string;
  description: string;
  date: string;
  questionCount: number;
  importance: 1 | 2 | 3;
  order: number;
};

export type QuizTopic = QuizTopicMeta & {
  content: string;
};

// --- データ取得関数 ---

export function getAllQualifications(): QualificationMeta[] {
  if (!fs.existsSync(quizDir)) return [];

  const dirs = fs
    .readdirSync(quizDir, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  const qualifications: QualificationMeta[] = [];

  for (const dir of dirs) {
    const indexPath = path.join(quizDir, dir.name, "_index.mdx");
    if (!fs.existsSync(indexPath)) continue;

    const fileContent = fs.readFileSync(indexPath, "utf-8");
    const { data } = matter(fileContent);

    qualifications.push({
      slug: dir.name,
      title: data.title ?? "",
      description: data.description ?? "",
      qualification: data.qualification ?? dir.name,
      qualificationName: data.qualificationName ?? "",
      group: data.group ?? data.qualificationName ?? "",
      date: data.date ?? "",
      totalQuestions: data.totalQuestions ?? 0,
      relatedArticleSlugs: data.relatedArticleSlugs ?? [],
    });
  }

  return qualifications.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getQualificationBySlug(slug: string): Qualification | null {
  const indexPath = path.join(quizDir, slug, "_index.mdx");
  if (!fs.existsSync(indexPath)) return null;

  const fileContent = fs.readFileSync(indexPath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    qualification: data.qualification ?? slug,
    qualificationName: data.qualificationName ?? "",
    group: data.group ?? data.qualificationName ?? "",
    date: data.date ?? "",
    totalQuestions: data.totalQuestions ?? 0,
    relatedArticleSlugs: data.relatedArticleSlugs ?? [],
    content,
  };
}

export function getQuizTopics(qualificationSlug: string): QuizTopicMeta[] {
  const topicDir = path.join(quizDir, qualificationSlug);
  if (!fs.existsSync(topicDir)) return [];

  const files = fs
    .readdirSync(topicDir)
    .filter((f) => f.endsWith(".mdx") && f !== "_index.mdx");

  const topics = files.map((filename) => {
    const topicSlug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(topicDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: topicSlug,
      qualification: data.qualification ?? qualificationSlug,
      qualificationName: data.qualificationName ?? "",
      topic: data.topic ?? topicSlug,
      topicName: data.topicName ?? data.title ?? "",
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      questionCount: data.questionCount ?? 0,
      importance: data.importance ?? 1,
      order: data.order ?? 99,
    } as QuizTopicMeta;
  });

  return topics.sort((a, b) => a.order - b.order);
}

export function getQuizTopic(
  qualificationSlug: string,
  topicSlug: string
): QuizTopic | null {
  const filePath = path.join(quizDir, qualificationSlug, `${topicSlug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: topicSlug,
    qualification: data.qualification ?? qualificationSlug,
    qualificationName: data.qualificationName ?? "",
    topic: data.topic ?? topicSlug,
    topicName: data.topicName ?? data.title ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    questionCount: data.questionCount ?? 0,
    importance: data.importance ?? 1,
    order: data.order ?? 99,
    content,
  };
}

export function getAllQualificationSlugs(): string[] {
  if (!fs.existsSync(quizDir)) return [];

  return fs
    .readdirSync(quizDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .filter((d) => fs.existsSync(path.join(quizDir, d.name, "_index.mdx")))
    .map((d) => d.name);
}

export function getAllQuizParams(): {
  qualification: string;
  topic: string;
}[] {
  const qualifications = getAllQualificationSlugs();
  const params: { qualification: string; topic: string }[] = [];

  for (const q of qualifications) {
    const topics = getQuizTopics(q);
    for (const t of topics) {
      params.push({ qualification: q, topic: t.slug });
    }
  }

  return params;
}

export function getQualificationsByGroup(): {
  group: string;
  qualifications: QualificationMeta[];
}[] {
  const all = getAllQualifications();
  const groupMap = new Map<string, QualificationMeta[]>();

  for (const q of all) {
    const existing = groupMap.get(q.group) ?? [];
    existing.push(q);
    groupMap.set(q.group, existing);
  }

  return Array.from(groupMap, ([group, qualifications]) => ({
    group,
    qualifications,
  }));
}
