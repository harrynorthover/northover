import { MetadataRoute } from "next";

import { getArticles } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nrthpoint.com";
  const articleListUrl = `${siteUrl}/articles`;

  const workUrls = articles.map((article) => ({
    url: `${siteUrl}/work/${article.url}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    { url: siteUrl, lastModified: new Date().toISOString() },
    { url: articleListUrl, lastModified: new Date().toISOString() },
    ...workUrls,
  ];
}
