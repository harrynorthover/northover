import React from "react";

type TagsProps = {
  tags: string[];
  margin?: boolean;
};

const SEARCH_QUERY_TAGS = {
  Tags: "tags", // Update this constant as per your application's query parameter format
};

const renderTags = (tags: string[], margin = true) =>
  tags.map((tag) => (
    <a
      key={tag}
      href={`/articles?${SEARCH_QUERY_TAGS.Tags}=${tag}`}
      className={`inline-block bg-gray-700/40 text-white text-xs font-bold uppercase tracking-wide rounded px-3 py-2 mr-2 ${
        margin ? `mt-2` : ""
      } transition-colors duration-200 hover:bg-gray-800`}
    >
      {tag}
    </a>
  ));

export const Tags: React.FC<TagsProps> = ({ tags, margin = true }) => {
  return <div className={margin ? `mb-5` : ""}>{renderTags(tags, margin)}</div>;
};
