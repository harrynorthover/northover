import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { format } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";

import ArticleAuthors from "@/components/ArticleAuthors";
import { getArticle } from "@/lib/api";

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
  const {
    heroImage,
    title,
    introduction,
    publishedAt,
    content,
    authorCollection: { items: authors },
  } = await getArticle(slug);

  return (
    <article className="max-w-5xl mt-24">
      <header className="max-w-5xl border-b border-b-gray-800 pb-4 mb-4">
        <h1>{title}</h1>
        <p className="italic mb-0">
          {format(publishedAt, "EEEE do MMMM yyyy")}
        </p>

        {/* <p>{introduction}</p> */}
        {heroImage && <Image src={heroImage.url} alt={title} />}
      </header>

      <section>
        {documentToReactComponents(
          content.json,
          createRenderOptions(content.links)
        )}
      </section>

      <ArticleAuthors authors={authors} />
    </article>
  );
}
