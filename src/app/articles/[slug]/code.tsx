import React, { useEffect } from "react";
import * as Prism from "prismjs";
import "prismjs/components/prism-php";

export const CodeBlock = ({
  code,
  language,
  description,
  title,
}: {
  code: string;
  language: string;
  description?: string;
  title: string;
}) => {
  const id = title.replace(/[\s:,]+/g, "-").toLowerCase();

  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <section>
      <a id={id} href={`#${id}`}>
        {title}
        {/* <LinkIcon className="icon" /> */}
        {description && <span>{description}</span>}
      </a>
      <pre className={`language-${language} line-numbers`}>
        <code>{code}</code>
      </pre>
    </section>
  );
};
