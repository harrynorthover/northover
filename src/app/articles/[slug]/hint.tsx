import React, { useEffect } from "react";
import { MARKS } from "@contentful/rich-text-types";

import * as Prism from "prismjs";
import "prismjs/components/prism-php";
// import InfoIcon from "../icons/info-icon";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <b>{text}</b>,
    [MARKS.CODE]: (code: string) => <code>{code}</code>,
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
  content: any;
  type: string;
}) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <div>
      <a id={slug} href={`#${slug}`} className={type}>
        {/* <InfoIcon /> */}
        <span>{title}</span>
      </a>
      <div className={`${type} language-javascript`}>
        {/* {renderRichText(content, options)} */}
      </div>
    </div>
  );
};
