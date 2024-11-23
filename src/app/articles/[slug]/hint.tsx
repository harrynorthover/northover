import React, { ReactNode } from "react";
import { Document, MARKS } from "@contentful/rich-text-types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PrismLoader from "@/components/prismLoader";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <b>{text}</b>,
    [MARKS.CODE]: (code: any) => <code>{code}</code>,
  },
};

export const Hint = ({
  title,
  slug,
  content,
  type,
}: {
  title: string;
  slug: string;
  content: {
    json: Document;
  };
  type: string;
}) => {
  return (
    <div>
      <a id={slug} href={`#${slug}`} className={type}>
        {/* <InfoIcon /> */}
        <span>{title}</span>
      </a>
      <div className={`${type} language-javascript`}>
        {documentToReactComponents(content.json, options)}
      </div>
      <PrismLoader />
    </div>
  );
};
