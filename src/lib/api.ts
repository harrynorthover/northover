import { Article, HomepageData } from "@/types/data";

const ARTICLE_FRAGMENT = `
fragment ArticleFragment on Article {
  title
  tags
  introduction
  enableComments
  url
  authorCollection {
    items {
      name
      jobTitle
      personalWebsite
      companyWebsite
      about {
        json
      }
    }
  }
  previewImage {
    url
  }
  heroImage {
    url
  }
  content {
    json
  }
}
`;

const GLOBAL_QUERY = `
query getHomepageData {
  general(id:"2RZUrjr3tBiGAIXFpjNrYC") {
    title
    introduction
    contactEmail
    backgroundsCollection {
      items {
        url
      }
    }
    linksCollection {
      items {
        name
        url
        icon {
          url
        }
        description
      }
    }
  }
  articleCollection(limit: 3, order: sys_publishedAt_DESC) {
    items {
      ...ArticleFragment
    }
  }
  seo(id:"2KZdiOQcUpgZbJPtHc8QZG") {
    siteTitle
    siteDescription
    keywords
  }
}

${ARTICLE_FRAGMENT}
`;

const ALL_ARTICLES_QUERY = `
query getAllArticles {
  articleCollection {
    items {
      ...ArticleFragment
    }
  }
}

${ARTICLE_FRAGMENT}
`;

const ARTICLE_QUERY = `
query getArticle($url: String!) {
  articleCollection(where: { url: $url }) {
    items {
      ...ArticleFragment
    }
  }
}

${ARTICLE_FRAGMENT}
`;

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
  return fetchGraphQL<HomepageData>(GLOBAL_QUERY, preview);
}

export async function getArticles(preview = false) {
  return fetchGraphQL<Article[]>(ALL_ARTICLES_QUERY, preview);
}

export async function getArticle(url: string, preview = false) {
  return fetchGraphQL<Article>(ARTICLE_QUERY, preview, {
    url,
  });
}
