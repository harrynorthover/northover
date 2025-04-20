import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { format } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";

import ArticleAuthors from "@/components/ArticleAuthors";
import { StructuredData } from "@/components/StructuredData";
import { Tags } from "@/components/Tags";
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
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.introduction,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${slug}`,
      siteName: article.title,
      images: [
        {
          url: article.heroImage?.url ?? `/api/og?title=${article.title}`,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const {
    heroImage,
    title,
    publishedAt,
    content,
    tags,
    authorCollection: { items: authors },
  } = await getArticle(slug);

  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${slug}`;
  const sturcutredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: content?.json?.content?.[0]?.content?.[0]?.value ?? "",
    datePublished: publishedAt,
    dateModified: publishedAt,
    url,
    image: heroImage?.url ?? undefined,
    author: authors.length
      ? {
          "@type": "Person",
          name: authors[0].name,
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <article className="max-w-5xl mt-24">
      <StructuredData data={sturcutredData} />
      <header className="max-w-5xl border-b border-b-gray-800 pb-4 mb-4">
        <h1>{title}</h1>

        <Tags tags={tags} />

        <p className="text-sm mb-0 text-gray-400">
          {format(publishedAt, "EEEE do MMMM yyyy")}
        </p>

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
