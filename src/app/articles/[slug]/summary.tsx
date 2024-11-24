import Image from "next/image";
import React from "react";

import Tags from "@/components/tags";

import { StarIcon } from "../../../components/icons/star";

interface BoxSummaryProps {
  name: string;
  rating: number;
  points: number;
  platform: string;
  type: string;
  tags: string[];
  difficulty: string;
  url: string;
}

const renderStar = (index: number, selected: boolean = false) => (
  <StarIcon
    key={index}
    width={16}
    height={24}
    fill={selected ? "gold" : "grey"}
    className={`inline-block ${selected ? "text-yellow-400" : "text-gray-400"}`}
  />
);

const renderStars = (amount: number = 0) => {
  return Array.from({ length: 5 }, (_, i) => renderStar(i, i < amount));
};

const renderOSLogo = (platform: string): JSX.Element | string => {
  switch (platform.toLowerCase()) {
    case "linux":
      return (
        <Image
          src="/svg/linux.svg"
          alt="Linux"
          width="25"
          height="24"
          className="inline-block"
        />
      );
    case "windows":
      return (
        <Image
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
        <Image
          src="/svg/offsec.svg"
          alt={company}
          width="25"
          height="24"
          className="inline-block"
        />
      );
    case "try hack me":
      return (
        <Image
          src="/thm.png"
          alt={company}
          width="24"
          height="24"
          className="inline-block"
        />
      );
    case "hackthebox":
      return (
        <Image
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
interface BoxDetailProps {
  label: string;
  content: React.ReactNode;
}

const BoxDetail: React.FC<BoxDetailProps> = ({ label, content }) => {
  return (
    <div className="whitespace-nowrap flex flex-col">
      <div className="block font-bold uppercase text-xs tracking-wide bg-gray-800 text-gray-200 p-2 border-r border-gray-700">
        {label}
      </div>
      <div className="flex items-center bg-gray-900 text-gray-300 p-2 border-r border-gray-800 flex-grow align-middle justify-center">
        {content}
      </div>
    </div>
  );
};

const BoxSummary: React.FC<BoxSummaryProps> = ({
  name,
  rating,
  platform,
  type,
  tags,
  difficulty,
  url,
}) => {
  return (
    <div className="block border max-w-4xl border-gray-800 rounded-lg overflow-hidden transition-all duration-200">
      <div className="grid h-full grid-cols-[1fr,60px,60px,110px,110px,auto] overflow-x-auto">
        <BoxDetail
          label="Box"
          content={
            <a href={url} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
          }
        />
        <BoxDetail label="Type" content={renderOSLogo(type)} />
        <BoxDetail label="Plat." content={renderCompanyLogo(platform)} />
        <BoxDetail
          label="Difficulty"
          content={<Tags tags={[difficulty]} margin={false} />}
        />
        <BoxDetail label="Rating" content={renderStars(rating)} />
        <BoxDetail label="Tags" content={<Tags tags={tags} margin={false} />} />
      </div>
    </div>
  );
};

export default BoxSummary;
