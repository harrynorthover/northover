import { Article, HomepageData } from "@/types/data";

const ARTICLE_FRAGMENT = /* GraphQL */ `
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
      links {
        assets {
          block {
            contentType
            url
            sys {
              id
            }
          }
          hyperlink {
            title
            description
            contentType
            fileName
            size
            url
            width
            height
          }
        }
        entries {
          inline {
            sys {
              id
            }
          }
          block {
            __typename
            sys {
              id
            }
            ... on CodeBlock {
              language
              title
              description
              code
              slug
              _id
            }
            ... on Resources {
              __typename
              title
              description
              url
            }
            ... on CodeBlock {
              __typename
              description
              title
              code
              language
            }
            ... on Hint {
              __typename
              title
              type
              content {
                json
              }
              slug
            }
            ... on Box {
              __typename
              name
              type
              tags
              difficulty
              platform
              points
              rating
              url
            }
          }
        }
      }
    }
  }
`;

const ARTICLE_PREVIEW_FRAGMENT = /* GraphQL */ `
  fragment ArticlePreviewFragment on Article {
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
  }
`;

const GLOBAL_QUERY = /* GraphQL */ `
  query getHomepageData {
    general(id: "2RZUrjr3tBiGAIXFpjNrYC") {
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
    seo(id: "2KZdiOQcUpgZbJPtHc8QZG") {
      siteTitle
      siteDescription
      keywords
    }
  }

  ${ARTICLE_FRAGMENT}
`;

const ALL_ARTICLES_QUERY = /* GraphQL */ `
  query getAllArticles {
    articleCollection {
      items {
        ...ArticlePreviewFragment
      }
    }
  }

  ${ARTICLE_PREVIEW_FRAGMENT}
`;

const ARTICLE_QUERY = /* GraphQL */ `
  query getArticle($slug: String!, $preview: Boolean) {
    articleCollection(where: { url: $slug }, preview: $preview, limit: 2) {
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
  console.log(json);
  return json.data;
}

export async function getGlobalContent(preview = false) {
  return fetchGraphQL<HomepageData>(GLOBAL_QUERY, preview);
}

export async function getArticles(preview = false) {
  return fetchGraphQL<{
    articleCollection: { items: Omit<Article, "content">[] };
  }>(ALL_ARTICLES_QUERY, preview).then((data) => {
    return data.articleCollection.items;
  });
}

export async function getArticle(url: string, preview = false) {
  return fetchGraphQL<{
    articleCollection: { items: Article[] };
  }>(ARTICLE_QUERY, preview, {
    slug: url,
  }).then((data) => {
    return data.articleCollection.items[0];
  });
}
