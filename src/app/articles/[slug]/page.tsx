import { getArticle } from "@/lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { createRenderOptions } from "./article.config";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  return {
    title: article.title,
    description: article.introduction,
    keywords: article.tags,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  return (
    <article className="max-w-6xl">
      <header>
        <h1>{article.title}</h1>
        <p>{article.introduction}</p>
        {article.heroImage && (
          <img src={article.heroImage.url} alt={article.title} />
        )}
      </header>

      <section>
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
        {documentToReactComponents(
          article.content.json,
          createRenderOptions(article.content.links)
        )}
      </section>
    </article>
  );
}
