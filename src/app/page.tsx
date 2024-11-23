import { getGlobalContent } from "@/lib/api";
import { draftMode } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const { isEnabled } = await draftMode();
  const { general, articleCollection, seo } = await getGlobalContent(isEnabled);

  return (
    <>
      <header>
        <h1>{general.title}</h1>
        <p className="max-w-5xl">{general.introduction}</p>
      </header>

      <section>
        <h2>Articles</h2>
        <ul>
          {articleCollection.items.map((article) => (
            <li key={article.url}>
              <h3>{article.title}</h3>
              <p>{article.introduction}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Links</h2>
        <ul className="flex">
          {general.linksCollection.items.map((link) => (
            <li key={link.url} className="w-[200px]">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <Image
                  width={30}
                  height={30}
                  src={link.icon.url}
                  alt={link.name}
                />
                {link.name}
                <span>{link.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
