import { getAllCategories, getAllPosts } from "@/lib/mdx";
import Header from "@/components/Header";

export default function HeaderNav() {
  const categories = getAllCategories();
  const searchPosts = getAllPosts();
  return (
    <Header
      categories={categories.map((c) => c.name)}
      searchPosts={searchPosts}
    />
  );
}
