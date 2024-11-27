import React from "react";

type TagsProps = {
  tags: string[];
  margin?: boolean;
};

const renderTags = (tags: string[], margin = true) =>
  tags.map((tag) => (
    <div
      key={tag}
      className={`inline-block bg-gray-700/40 text-white text-xs font-bold uppercase tracking-wide rounded px-3 py-2 mr-2 ${
        margin ? `mt-2` : ""
      }`}
    >
      {tag}
    </div>
  ));

export const Tags: React.FC<TagsProps> = ({ tags, margin = true }) => {
  return <div className={margin ? `mb-5` : ""}>{renderTags(tags, margin)}</div>;
};
