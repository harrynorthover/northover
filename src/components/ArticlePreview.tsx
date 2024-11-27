import { format } from "date-fns";
import Link from "next/link";

import { Tags } from "@/components/Tags";

export type ArticlePreviewProps = {
  url: string;
  title: string;
  tags: string[];
  introduction: string;
  publishedAt: Date;
};

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  url,
  title,
  tags,
  introduction,
  publishedAt,
}) => (
  <div className="pb-8">
    <Link href={`/articles/${url}`} className="mb-2">
      <h2 className="mb-0 pb-0">{title}</h2>
    </Link>
    <small className="block text-gray-400 mb-2">
      {format(publishedAt, "EEEE do MMMM yyyy")}
    </small>
    <Tags tags={tags} />
    <p>{introduction}</p>
  </div>
);
