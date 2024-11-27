import { Author as AuthorType } from "@/types/data";

import { Author } from "./Author";

const ArticleAuthors = ({ authors }: { authors: AuthorType[] }) => {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-t-gray-900 pt-4">
        {authors.map((author, index) => (
          <Author
            key={index}
            name={author.name}
            jobTitle={author.jobTitle}
            personalWebsite={author.personalWebsite}
            companyWebsite={author.companyWebsite}
            github={author.github}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticleAuthors;
