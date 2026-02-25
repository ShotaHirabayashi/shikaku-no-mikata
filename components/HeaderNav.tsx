import { getAllCategories } from "@/lib/mdx";
import Header from "@/components/Header";

export default function HeaderNav() {
  const categories = getAllCategories();
  return <Header categories={categories.map((c) => c.name)} />;
}
