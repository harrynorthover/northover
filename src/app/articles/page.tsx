import Head from "next/head";

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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Articles",
    url: "https://northover.co/articles",
    description:
      "A collection of my technical writing, exploring various topics.",
    hasPart: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `https://northover.co${article.url}`,
      datePublished: article.sys.firstPublishedAt,
      author: {
        "@type": "Person",
        name: article.authorCollection?.items?.[0]?.name ?? "Unknown",
      },
    })),
  };

  return (
    <div className="max-w-6xl">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <h1 className="mb-12 mt-12">Articles</h1>

      <div className="grid grid-cols-2 gap-4">
        <ArticleList articles={articles} />
      </div>
    </div>
  );
}
