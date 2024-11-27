import { ArticleList } from "@/components/ArticleList";
import { getArticles } from "@/lib/api";

// Set metadata for the page
export const metadata = {
  title: "Articles",
  description:
    "A collection of my technical writing, exploring various topics.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-6xl">
      <h1 className="mb-12 mt-12">Articles</h1>

      <div className="grid grid-cols-2 gap-4">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
