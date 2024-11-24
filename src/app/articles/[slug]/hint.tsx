import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, MARKS } from "@contentful/rich-text-types";
import clsx from "clsx";
import React, { ReactNode } from "react";


import PrismLoader from "@/components/prismLoader";


const options = {
  renderMark: {
    [MARKS.BOLD]: (text: ReactNode) => <b>{text}</b>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [MARKS.CODE]: (code: any) => <code>{code}</code>,
  },
};

export type HintVariant = "Information" | "Warning" | "Lab";

type HintContentProps = {
  className: HintVariant;
  children: React.ReactNode;
};

export const HintContent: React.FC<HintContentProps> = ({
  className,
  children,
}) => {
  const baseClasses = `
    p-4 mb-2 overflow-auto border border-gray-800 rounded-b-md
  `;

  const variantClasses = {
    Information: "bg-blue-200/10", // Tailwind's `/10` for 10% opacity
    Warning: "bg-red-200/10",
    Lab: "bg-pink-200/10",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[className] || ""}`}>
      {children}
    </div>
  );
};

type TitleVariant = "Information" | "Warning" | "Lab";

type TitleProps = {
  className: TitleVariant; // Limit className to specific variants
  href: string;
  children: React.ReactNode;
  id: string;
};

export const Title: React.FC<TitleProps> = ({
  className,
  href,
  children,
  id,
}) => {
  const baseClasses = `
    block p-[11px_10px] font-bold text-[11px]
    border border-gray-800 border-b-0
    rounded-t-md
    transition-colors
  `;

  const variantClasses: Record<TitleVariant, string> = {
    Information: "bg-blue-400/80 hover:bg-blue-400/90", // 80% opacity with hover adjustment
    Warning: "bg-red-400/80 hover:bg-red-400/90",
    Lab: "bg-pink-600/75 hover:bg-pink-600/90",
  };

  const hoverStyles = `
    hover:after:bg-white
  `;

  return (
    <a
      id={id}
      href={href}
      className={clsx(baseClasses, variantClasses[className], hoverStyles)}
    >
      {children}
    </a>
  );
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
  type: HintVariant;
}) => {
  return (
    <div className="my-4">
      <Title id={slug} href={`#${slug}`} className={type}>
        {/* <InfoIcon /> */}
        <h4 className="p-2 py-1">{title}</h4>
      </Title>
      <HintContent className={type}>
        {documentToReactComponents(content.json, options)}
      </HintContent>
      <PrismLoader />
    </div>
  );
};
