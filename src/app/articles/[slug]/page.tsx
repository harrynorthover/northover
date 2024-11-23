import { getArticle } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { ArticleRenderConfig } from "./article.config";

type ArticlePageProps = {
  params: { url: string };
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = await getArticle(params.url);

  return {
    title: article.title,
    description: article.introduction,
    keywords: article.tags,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.url);

  return (
    <article>
      <header>
        <h1>{article.title}</h1>
        <p>{article.introduction}</p>
        {article.heroImage && (
          <img src={article.heroImage.url} alt={article.title} />
        )}
      </header>
      <section>
        <h2>Authors</h2>
        <ul>
          {article.authorCollection.items.map((author, index) => (
            <li key={index}>
              <h3>{author.name}</h3>
              <p>{author.jobTitle}</p>
              {author.personalWebsite && (
                <a
                  href={author.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Personal Website
                </a>
              )}
              {author.companyWebsite && (
                <a
                  href={author.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Company Website
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Content</h2>
        {documentToReactComponents(article.content.json, ArticleRenderConfig)}
      </section>
    </article>
  );
}
