import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { format } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
  const { title, introduction, url, tags, heroImage } = await getArticle(slug);

  return {
    title,
    description: introduction,
    keywords: tags,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${url}`,
    },
    openGraph: {
      title,
      description: introduction,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${url}`,
      siteName: title,
      images: [
        {
          url:
            heroImage?.url ??
            `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/post?title=${title}`,
          width: 1200,
          height: 630,
          alt: title,
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
    image: heroImage?.url ?? `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/post?title=${title}`,
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
    <article className="max-w-5xl mt-4">
      <StructuredData data={sturcutredData} />
      <header className="max-w-5xl border-b border-b-gray-800 pb-4 mb-4">
        <Link href="/articles" className="text-sm font-light text-gray-100 mb-10">
          ← Back to articles
        </Link>

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
