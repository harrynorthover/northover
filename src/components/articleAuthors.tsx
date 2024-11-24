import { FaLinkedin, FaGlobe } from "react-icons/fa";

import { Article } from "@/types/data";

const ArticleAuthors = ({ article }: { article: Article }) => {
  return (
    <section className="mt-12">
      <h4 className="font-semibold text-white mb-2">Author</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-t-gray-900 pt-4">
        {article.authorCollection.items.map((author, index) => (
          <div key={index}>
            <h3 className="font-semibold text-white">{author.name}</h3>
            <p className="text-gray-400">{author.jobTitle}</p>

            <div className="flex space-x-4">
              {author.personalWebsite && (
                <a
                  href={author.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-300"
                >
                  <FaGlobe size={24} />
                </a>
              )}
              {author.companyWebsite && (
                <a
                  href={author.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gray-200"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {/* Add additional icons here if needed, like GitHub */}
              {/* {author.github && (
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-gray-200"
                >
                  <FaGithub size={24} />
                </a>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArticleAuthors;
