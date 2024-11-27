const ARTICLE_FRAGMENT = /* GraphQL */ `
  fragment ArticleFragment on Article {
    title
    sys {
      firstPublishedAt
      publishedAt
    }
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
        github
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
    sys {
      firstPublishedAt
      publishedAt
    }
    introduction
    enableComments
    url
    authorCollection {
      items {
        name
        jobTitle
        personalWebsite
        companyWebsite
        github
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

export const GLOBAL_QUERY = /* GraphQL */ `
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
    articleCollection(limit: 3, order: sys_publishedAt_ASC) {
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

export const ALL_ARTICLES_QUERY = /* GraphQL */ `
  query getAllArticles {
    articleCollection(order: sys_publishedAt_ASC) {
      items {
        ...ArticlePreviewFragment
      }
    }
  }

  ${ARTICLE_PREVIEW_FRAGMENT}
`;

export const ARTICLE_QUERY = /* GraphQL */ `
  query getArticle($slug: String!, $preview: Boolean) {
    articleCollection(where: { url: $slug }, preview: $preview, limit: 2) {
      items {
        ...ArticleFragment
      }
    }
  }

  ${ARTICLE_FRAGMENT}
`;
