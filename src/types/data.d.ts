import { Document, Link } from "@contentful/rich-text-types";

type MediaItem = {
  url: string;
  title?: string;
  description?: string;
};

export type RichText = {
  json: Document;
  links: any[];
};

export type GeneralData = {
  id: string;
  title: string;
  introduction: string;
  contactEmail: string;
  backgroundsCollection: {
    items: MediaItem[];
  };
  linksCollection: {
    items: LinkItem[];
  };
};

type LinkItem = {
  name: string;
  icon: MediaItem;
  description: string;
  url: string;
};

type Author = {
  name: string;
  jobTitle: string;
  personalWebsite: string | null;
  companyWebsite: string | null;
  about: RichText;
};

type SEOData = {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
};

export type Article = {
  title: string;
  tags: string[];
  introduction: string;
  enableComments: boolean;
  url: string;
  authorCollection: {
    items: {
      name: string;
      jobTitle: string;
      personalWebsite: string | null;
      companyWebsite: string | null;
      about: {
        json: Document; // Replace `any` with a more specific type if available for Contentful rich text JSON
      };
    }[];
  };
  previewImage: {
    url: string;
  } | null;
  heroImage: {
    url: string;
  } | null;
  content: {
    json: any; // Replace `any` with a specific Contentful JSON schema type if possible
    links: {
      assets: {
        block: {
          contentType: string;
          url: string;
          sys: {
            id: string;
          };
        }[];
        hyperlink: {
          title: string;
          description: string | null;
          contentType: string;
          fileName: string;
          size: number;
          url: string;
          width: number;
          height: number;
        }[];
      };
      entries: {
        inline: {
          sys: {
            id: string;
          };
        }[];
        block: (
          | {
              __typename: "CodeBlock";
              sys: {
                id: string;
              };
              language: string;
              title: string;
              description: string;
              code: string;
              slug: string;
              _id: string;
            }
          | {
              __typename: "Resources";
              sys: {
                id: string;
              };
              title: string;
              description: string | null;
              url: string;
            }
          | {
              __typename: "Hint";
              sys: {
                id: string;
              };
              title: string;
              type: string;
              content: RichText;
              slug: string;
            }
          | {
              __typename: "Box";
              sys: {
                id: string;
              };
              name: string;
              type: string;
              tags: string[];
              difficulty: string;
              platform: string;
              points: number;
              rating: number;
              url: string;
            }
        )[];
      };
    };
  };
};

export type HomepageData = {
  general: GeneralData;
  articleCollection: {
    items: Article[];
  };
  seo: SEOData;
};
