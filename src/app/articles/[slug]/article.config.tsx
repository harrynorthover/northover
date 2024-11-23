import React, { ReactNode } from "react";
import {
  INLINES,
  BLOCKS,
  MARKS,
  Block,
  Inline,
} from "@contentful/rich-text-types";
import BoxSummary from "./summary";
import { Hint } from "./hint";
import { CodeBlock } from "./code";
import { Article } from "@/types/data";

export function createRenderOptions(links: Article["content"]["links"]) {
  const assetMap = new Map();
  const entryMap = new Map();

  if (links.assets?.block) {
    for (const asset of links.assets.block) {
      assetMap.set(asset.sys.id, asset);
    }
  }

  if (links.entries?.block) {
    for (const entry of links.entries.block) {
      entryMap.set(entry.sys.id, entry);
    }
  }

  if (links.entries?.inline) {
    for (const entry of links.entries.inline) {
      entryMap.set(entry.sys.id, entry);
    }
  }

  return {
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => <b className="font-bold">{text}</b>,
      [MARKS.CODE]: (code: any) => (
        <code className="language-javascript language-sql language-bash">
          {code.trim()}
        </code>
      ),
    },
    renderNode: {
      [BLOCKS.HEADING_1]: (_: any, children: ReactNode) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (_: any, children: ReactNode) => <h2>{children}</h2>,
      [BLOCKS.PARAGRAPH]: (_: any, children: ReactNode) => <p>{children}</p>,
      [BLOCKS.UL_LIST]: (_: any, children: ReactNode) => <ul>{children}</ul>,

      [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
        const asset = assetMap.get(node.data.target.sys.id);
        if (!asset || !asset.url) return null;

        const { url, title, description } = asset;
        return (
          <img
            src={url}
            alt={title || description || "Embedded Asset"}
            title={title || description}
          />
        );
      },

      [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
        const { uri } = node.data;
        return (
          <a href={uri} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      },

      [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry || !entry.__typename) return null;

        switch (entry.__typename) {
          case "Box":
            const {
              name,
              rating,
              points,
              platform,
              type,
              tags,
              difficulty,
              url,
            } = entry as Extract<
              Article["content"]["links"]["entries"]["block"][number],
              { __typename: "Box" }
            >;

            return (
              <BoxSummary
                name={name}
                rating={rating}
                points={points}
                platform={platform}
                type={type}
                tags={tags}
                difficulty={difficulty}
                url={url}
                key={entry.sys.id}
              />
            );

          case "Hint":
            const {
              slug,
              content,
              type: hintType,
            } = entry as Extract<
              Article["content"]["links"]["entries"]["block"][number],
              { __typename: "Hint" }
            >;
            return (
              <Hint
                title={entry.title}
                slug={slug}
                content={content}
                type={hintType}
              />
            );

          case "CodeBlock":
            const { language, description, code } = entry as Extract<
              Article["content"]["links"]["entries"]["block"][number],
              { __typename: "CodeBlock" }
            >;

            return (
              <CodeBlock
                code={code}
                language={language}
                title={entry.title}
                description={description}
              />
            );

          default:
            return null;
        }
      },

      [INLINES.EMBEDDED_ENTRY]: (node: any, children: ReactNode) => {
        const entry = entryMap.get(node.data.target.sys.id);
        if (!entry || !entry.__typename) return null;

        if (entry.__typename === "BlogPost") {
          return <a href={`/blog/${entry.slug}`}>{entry.title}</a>;
        }

        return null;
      },
    },
  };
}
