import { Metadata } from "next";
import Image from "next/image";

import { ArticleList } from "@/components/ArticleList";
import { StructuredData } from "@/components/StructuredData";
import { getArticles } from "@/lib/api";

// Set metadata for the page
export const metadata: Metadata = {
  title: "Articles",
  description:
    "A collection of my technical writing, exploring various topics.",
  keywords: "articles, technical writing, software development",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/articles`,
  },
  openGraph: {
    title: "Articles",
    description:
      "A collection of my technical writing, exploring various topics.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles`,
    siteName: "Harry Northover",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/root`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default async function ArticlesPage() {
  const articles = await getArticles();
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/articles`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles",
    url,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/root`,
    description:
      "A collection of my technical writing, exploring various topics around web development and security.",
    hasPart: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${article.url}`,
      datePublished: article.sys.firstPublishedAt,
      author: {
        "@type": "Person",
        name: article.authorCollection?.items?.[0]?.name ?? "Harry Northover",
      },
      image: article.heroImage?.url ?? `/api/og?title=${article.title}`,
    })),
  };

  return (
    <div className="max-w-6xl">
      <StructuredData data={structuredData} />

      <Image
        src="/signatureH.png"
        alt="alt"
        width={60}
        height={50}
        className="-ml-4"
      />
      <h1 className="mb-12 -mt-4">Articles</h1>

      <div className="grid grid-cols-2 gap-4">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
