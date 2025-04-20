namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string;

    CONTENTFUL_SPACE_ID: string;
    CONTENTFUL_ACCESS_TOKEN: string;
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: string;
    CONTENTFUL_PREVIEW_SECRET: string;
    CONTENTFUL_REVALIDATE_SECRET: string;
  }
}
