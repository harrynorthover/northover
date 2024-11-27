import { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import { ArticleList } from "@/components/ArticleList";
import { LinkGrid } from "@/components/LinkGrid";
import { getGlobalContent } from "@/lib/api";

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

      <section className="my-8 mb-4 py-8 pb-0 lg:max-w-[50%]">
        <ArticleList articles={articleCollection.items} />
        <Link href="/articles">View more →</Link>
      </section>

      <section>
        <LinkGrid links={general.linksCollection.items} />
      </section>
    </div>
  );
}
