import { ArticlePreview, ArticlePreviewProps } from "./ArticlePreview";

export type ArticleListProps = {
  articles: ArticlePreviewProps[];
};

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => (
  <>
    {articles.map((article) => (
      <ArticlePreview key={article.url} {...article} />
    ))}
  </>
);
