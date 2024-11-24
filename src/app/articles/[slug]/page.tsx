import { getArticle } from "@/lib/api";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Metadata } from "next";
import { createRenderOptions } from "./article.config";
import ArticleAuthors from "@/components/articleAuthors";

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
    <article className="max-w-5xl mt-24">
      <header className="max-w-5xl">
        <h1>{article.title}</h1>
        <p>{article.introduction}</p>

        {article.heroImage && (
          <Image src={article.heroImage.url} alt={article.title} />
        )}
      </header>

      <section>
        {documentToReactComponents(
          article.content.json,
          createRenderOptions(article.content.links)
        )}
      </section>

      <ArticleAuthors article={article} />
    </article>
  );
}
