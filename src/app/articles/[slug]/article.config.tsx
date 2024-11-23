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

export const ArticleRenderConfig = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <b className="font-bold">{text}</b>,
    [MARKS.CODE]: (code: any) => (
      <code className="language-javascript language-sql langauge-bash">
        {code.replace(/(^\s+|\s+$)/g, "")}
      </code>
    ),
  },
  renderNode: {
    [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
      const { uri } = node.data;
      return (
        <a href={uri} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: ReactNode) => {
      return <h1>{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: ReactNode) => {
      return <h2>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: ReactNode) => {
      return <h3>{children}</h3>;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline, children: ReactNode) => {
      if (!node || !node.data || !node.data.target) {
        return;
      }

      const { __typename, title } = node.data.target;

      switch (__typename) {
        case "ContentfulBox": {
          const {
            name,
            rating,
            points,
            platform,
            type,
            tags,
            difficulty,
            url,
          } = node.data.target;
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
            />
          );
        }
        case "ContentfulHint": {
          const { slug, content, type } = node.data.target;
          return (
            <Hint title={title} slug={slug} content={content} type={type} />
          );
        }
        case "ContentfulCodeBlock":
          const {
            language,
            description,
            code: { code },
          } = node.data.target;
          return (
            <CodeBlock
              code={code}
              language={language}
              title={title}
              description={description}
            />
          );
        default:
          return null;
      }
    },
  },
};
