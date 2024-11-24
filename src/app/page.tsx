import { Metadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

import Tags from "@/components/tags";
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

      <section className="my-8 mb-4 py-8 pb-0">
        <div>
          {articleCollection.items.map((article) => (
            <div key={article.url} className="lg:max-w-[50%] pb-8">
              <Link href={`/articles/${article.url}`}>
                <h2>{article.title}</h2>
              </Link>
              <Tags tags={article.tags} />
              <p>{article.introduction}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="grid md:grid-cols-3 gap-y-6 gap-x-20 max-w-6xl border-t border-t-gray-800/40 pt-12">
          {general.linksCollection.items.map((link) => (
            <div key={link.url} className="min-w-[200px]">
              {/* <div className="w-[15px] flex-shrink-0">
                <Image
                  width={15}
                  height={30}
                  src={link.icon.url}
                  alt={link.name}
                  className="mr-2 mt-1"
                />
              </div> */}
              <div>
                <Link
                  href={link.url || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4"
                >
                  <h3 className="flex align-middle pb-4 border-b border-b-gray-800/40 w-full">
                    {link.name}
                  </h3>
                </Link>

                <span className="block mt-3">{link.description}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
