import Tags from "@/components/tags";
import { getArticles } from "@/lib/api";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-6xl">
      <h1 className="mb-12 mt-12">Articles</h1>

      <div className="grid grid-cols-2 gap-4">
        {articles.map((article) => (
          <div
            key={article.url}
            className="h-[280px] border-b border-b-gray-900 mb-8"
          >
            <a href={`/articles/${article.url}`}>
              <h2>{article.title}</h2>
              <Tags tags={article.tags} />
              <p className="pr-12">{article.introduction}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
