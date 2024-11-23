import { getArticles } from "@/lib/api";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.articleCollection.items.map((article) => (
          <li key={article.url}>
            <a href={`/articles/${article.url}`}>
              <h2>{article.title}</h2>
              <p>{article.introduction}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
