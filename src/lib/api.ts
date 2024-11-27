import { Article, ArticlePreview, HomepageData } from "@/types/data";

import { ALL_ARTICLES_QUERY, ARTICLE_QUERY, GLOBAL_QUERY } from "./query";

async function fetchGraphQL<T>(
  query: string,
  preview = false,
  params = {}
): Promise<T> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables: { preview, ...params } }),
      next: { tags: ["all"] },
    }
  );

  const json = await response.json();
  return json.data;
}

export async function getGlobalContent(preview = false) {
  return fetchGraphQL<HomepageData>(GLOBAL_QUERY, preview).then((data) => {
    data.articleCollection.items = parseArticlesDates(
      data.articleCollection.items
    );
    return data;
  });
}

export async function getArticles(preview = false) {
  return fetchGraphQL<{
    articleCollection: {
      items: ArticlePreview[];
    };
  }>(ALL_ARTICLES_QUERY, preview).then((data) => {
    return parseArticlesDates(data.articleCollection.items);
  });
}

export async function getArticle(url: string, preview = false) {
  return fetchGraphQL<{
    articleCollection: { items: Article[] };
  }>(ARTICLE_QUERY, preview, {
    slug: url,
  }).then((data) => {
    return parseArticlesDates(data.articleCollection.items)[0] as Article;
  });
}

function parseArticlesDates(articles: ArticlePreview[]) {
  return articles.map((article) => {
    article.publishedAt = new Date(article.sys.firstPublishedAt);
    article.updatedAt = new Date(article.sys.publishedAt);

    return article;
  });
}
