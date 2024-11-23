import React from "react";
import Tags from "@/components/tags";
import Image from "next/image";

type BoxSummaryProps = {
  name: string;
  rating: number;
  points: number;
  platform: string;
  type: string;
  tags: string[];
  difficulty: string;
  url: string;
};

const renderStar = (selected: boolean = false) => (
  <Image
    src={"/svg/star.svg"}
    width={16}
    height={24}
    className="inline-block"
    alt={""}
  />
);

const renderStars = (amount: number = 0) => {
  return Array.from({ length: 5 }, (_, i) => renderStar(i < amount));
};

const renderOSLogo = (platform: string): JSX.Element | string => {
  switch (platform.toLowerCase()) {
    case "linux":
      return (
        <img
          src="/svg/linux.svg"
          alt="Linux"
          width="25"
          height="24"
          className="inline-block"
        />
      );
    case "windows":
      return (
        <img
          src="/svg/windows.svg"
          alt="Windows"
          width="25"
          height="24"
          className="inline-block"
        />
      );
    default:
      return platform;
  }
};

const renderCompanyLogo = (company: string): JSX.Element | string => {
  switch (company.toLowerCase()) {
    case "offsec - practise":
    case "offsec - play":
      return (
        <img
          src="/svg/offsec.svg"
          alt={company}
          width="25"
          height="24"
          className="inline-block"
        />
      );
    case "try hack me":
      return (
        <img
          src="/thm.png"
          alt={company}
          width="24"
          height="24"
          className="inline-block"
        />
      );
    case "hackthebox":
      return (
        <img
          src="/htb.png"
          alt={company}
          width="24"
          height="24"
          className="inline-block"
        />
      );
    default:
      return company;
  }
};

const BoxSummary: React.FC<BoxSummaryProps> = ({
  name,
  rating,
  points,
  platform,
  type,
  tags,
  difficulty,
  url,
}) => {
  return (
    <div className="block border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:bg-gray-700">
      <div className="grid grid-cols-[1fr,60px,60px,110px,110px,auto] overflow-x-auto">
        <div className="whitespace-nowrap">
          <span className="block font-bold uppercase text-xs tracking-wide bg-gray-800 text-gray-200 p-2 border-r border-gray-700">
            Box
          </span>
          <span className="flex items-center bg-gray-900 text-gray-300 p-2 border-r border-gray-800">
            <a href={url} target="_blank">
              {name}
            </a>
          </span>
        </div>
        <div className="whitespace-nowrap">
          <span className="block font-bold uppercase text-xs tracking-wide bg-gray-800 text-gray-200 p-2 border-r border-gray-700">
            Type
          </span>
          <span className="flex items-center bg-gray-900 text-gray-300 p-2 border-r border-gray-800">
            {renderOSLogo(type)}
          </span>
        </div>
        <div className="whitespace-nowrap">
          <span className="block font-bold uppercase text-xs tracking-wide bg-gray-800 text-gray-200 p-2 border-r border-gray-700">
            Plat.
          </span>
          <span className="flex items-center bg-gray-900 text-gray-300 p-2 border-r border-gray-800">
            {renderCompanyLogo(platform)}
          </span>
        </div>
        <div className="whitespace-nowrap">
          <span className="block font-bold uppercase text-xs tracking-wide bg-gray-800 text-gray-200 p-2 border-r border-gray-700">
            Difficulty
          </span>
          <span className="flex items-center bg-gray-900 text-gray-300 p-2 border-r border-gray-800">
            <Tags tags={[difficulty]} />
          </span>
        </div>
        <div className="whitespace-nowrap">
          <span className="block font-bold uppercase text-xs tracking-wide bg-gray-800 text-gray-200 p-2 border-r border-gray-700">
            Rating
          </span>
          <span className="flex items-center bg-gray-900 text-gray-300 p-2 border-r border-gray-800">
            {renderStars(rating)}
          </span>
        </div>
        <div className="whitespace-nowrap">
          <span className="block font-bold uppercase text-xs tracking-wide bg-gray-800 text-gray-200 p-2 border-r border-gray-700">
            Tags
          </span>
          <span className="flex items-center bg-gray-900 text-gray-300 p-2 border-r border-gray-800">
            <Tags tags={tags} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoxSummary;
