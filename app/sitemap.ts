import { MetadataRoute } from "next";
import { getAllPosts, getAllCategories, getAllTags } from "@/lib/mdx";
import { getAllQualifications, getQuizTopics } from "@/lib/quiz";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryEntries = getAllCategories().map((c) => ({
    url: `${SITE_URL}/category/${encodeURIComponent(c.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tagEntries = getAllTags().map((t) => ({
    url: `${SITE_URL}/tag/${encodeURIComponent(t.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  // クイズ関連エントリ
  const qualifications = getAllQualifications();
  const quizQualificationEntries = qualifications.map((q) => ({
    url: `${SITE_URL}/quiz/${q.slug}`,
    lastModified: new Date(q.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const quizTopicEntries = qualifications.flatMap((q) =>
    getQuizTopics(q.slug).map((t) => ({
      url: `${SITE_URL}/quiz/${q.slug}/${t.slug}`,
      lastModified: new Date(t.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...postEntries,
    ...quizQualificationEntries,
    ...quizTopicEntries,
    ...categoryEntries,
    ...tagEntries,
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
