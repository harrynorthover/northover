import { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { ArticleList } from "@/components/ArticleList";
import { LinkGrid } from "@/components/LinkGrid";
import { getGlobalContent } from "@/lib/api";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode();
  const { seo } = await getGlobalContent(isEnabled);

  return {
    title: seo.siteTitle,
    description: seo.siteDescription,
    keywords: seo.keywords?.join(", "),
  };
}

export default async function Home() {
  const { isEnabled } = await draftMode();
  const { general, articleCollection } = await getGlobalContent(isEnabled);

  return (
    <div>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Harry Northover",
                url: "https://northover.co",
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
                url: "https://northover.co",
                description: general.introduction,
              },
              ...articleCollection.items.map((article) => ({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: article.title,
                description: article.introduction,
                datePublished: article.sys.firstPublishedAt,
                dateModified: article.sys.publishedAt,
                url: `https://northover.co/${article.url}`,
                author: {
                  "@type": "Person",
                  name:
                    article.authorCollection.items[0]?.name ||
                    "Harry Northover",
                },
                image:
                  article.heroImage?.url ||
                  article.previewImage?.url ||
                  undefined,
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://northover.co/${article.url}`,
                },
              })),
            ]),
          }}
        />
      </Head>
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
