import { Document } from "@contentful/rich-text-types";

type MediaItem = {
  url: string;
  title?: string;
  description?: string;
};

type RichText = {
  json: Document;
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
    items: Author[];
  };
  previewImage: MediaItem | null;
  heroImage: MediaItem | null;
  content: RichText;
};

export type HomepageData = {
  general: GeneralData;
  articleCollection: {
    items: Article[];
  };
  seo: SEOData;
};
