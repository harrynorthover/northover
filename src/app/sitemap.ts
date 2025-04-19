import { MetadataRoute } from "next";

import { getArticles } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://northover.co";
  const articleListUrl = `${siteUrl}/articles`;

  const articleUrls = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.url}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    { url: siteUrl, lastModified: new Date().toISOString() },
    { url: articleListUrl, lastModified: new Date().toISOString() },
    ...articleUrls,
  ];
}
