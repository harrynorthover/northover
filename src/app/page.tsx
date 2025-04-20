import { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { ArticleList } from "@/components/ArticleList";
import { LinkGrid } from "@/components/LinkGrid";
import { StructuredData } from "@/components/StructuredData";
import { getGlobalContent } from "@/lib/api";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const { seo } = await getGlobalContent(isEnabled);

  return {
    title: seo.siteTitle,
    description: seo.siteDescription,
    keywords: seo.keywords?.join(", "),
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL,
    },
    openGraph: {
      title: seo.siteTitle,
      description: seo.siteDescription,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: seo.siteTitle,
    },
  };
}

export default async function Home() {
  const { isEnabled } = await draftMode();
  const { general, articleCollection } = await getGlobalContent(isEnabled);

  const jsonLdData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Harry Northover",
      url: process.env.NEXT_PUBLIC_SITE_URL,
      sameAs: [
        "https://twitter.com/harrynorthover",
        "https://github.com/harrynorthover",
      ],
      jobTitle: "Software Consultant & Architect",
      worksFor: {
        "@type": "Organization",
        name: "North Point",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: general.title,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      description: general.introduction,
    },
    ...articleCollection.items.map((article) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.introduction,
      datePublished: article.sys.firstPublishedAt,
      dateModified: article.sys.publishedAt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.url}`,
      author: {
        "@type": "Person",
        name: article.authorCollection.items[0]?.name || "Harry Northover",
        url: process.env.NEXT_PUBLIC_SITE_URL,
      },
      image:
        article.heroImage?.url ||
        article.previewImage?.url ||
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=${article.title}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.url}`,
      },
    })),
  ];

  return (
    <div>
      <StructuredData data={jsonLdData} />

      <header className="mt-14">
        <Image
          src="/signatureH.png"
          alt="alt"
          width={60}
          height={50}
          className="-ml-4"
        />
        <p className="max-w-4xl">{general.introduction}</p>
      </header>

      <section className="my-8 mb-4 py-8 pb-0 xl:max-w-[50%]">
        <ArticleList articles={articleCollection.items} />
        <Link href="/articles">View more →</Link>
      </section>

      <section>
        <LinkGrid links={general.linksCollection.items} />
      </section>
    </div>
  );
}
