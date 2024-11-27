import { FaGithub, FaGlobe, FaRegBuilding } from "react-icons/fa";

export type AuthorProps = {
  name: string;
  jobTitle: string;
  personalWebsite: string | null;
  companyWebsite: string | null;
  github: string | null;
};

export const Author: React.FC<AuthorProps> = ({
  name,
  jobTitle,
  personalWebsite,
  companyWebsite,
  github,
}) => (
  <div>
    <p className="font-semibold text-white mb-0">{name}</p>
    <p className="text-gray-400 text-sm itali">{jobTitle}</p>
    <div className="flex space-x-4">
      {personalWebsite && (
        <a
          href={personalWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-200 transition-colors duration-300"
        >
          <FaGlobe size={24} />
        </a>
      )}
      {companyWebsite && (
        <a
          href={companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-200 transition-colors duration-300"
        >
          <FaRegBuilding size={24} />
        </a>
      )}
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-200 transition-colors duration-300"
        >
          <FaGithub size={24} />
        </a>
      )}
    </div>
  </div>
);
