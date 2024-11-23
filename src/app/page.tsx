import { getGlobalContent } from "@/lib/api";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { isEnabled } = await draftMode();
  const { general, articleCollection, seo } = await getGlobalContent(isEnabled);

  return (
    <>
      <header className="mt-14">
        <Image
          src="/signatureH.png"
          alt="alt"
          width={50}
          height={50}
          className="-ml-4"
        />
        <p className="max-w-5xl">{general.introduction}</p>
      </header>

      <section className="my-8 py-8 pb-0">
        <div>
          {articleCollection.items.map((article) => (
            <div key={article.url} className="max-w-[50%] pb-8">
              <h2>
                <Link href={`/articles/${article.url}`}>{article.title}</Link>
              </h2>
              <p>{article.introduction}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex gap-4">
          {general.linksCollection.items.map((link) => (
            <div key={link.url} className="w-[200px]">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Image
                  width={30}
                  height={30}
                  src={link.icon.url}
                  alt={link.name}
                />
                <span className="block">{link.name}</span>
                <span className="block">{link.description}</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
