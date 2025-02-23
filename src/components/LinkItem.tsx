import Link from "next/link";

export type LinkItemProps = {
  url?: string;
  name: string;
  description: string;
};

export const LinkItem: React.FC<LinkItemProps> = ({
  url,
  name,
  description,
}) => (
  <div>
    <Link
      href={url || ""}
      target="_blank"
      rel="noopener noreferrer"
      className="flex mb-1"
    >
      <h3 className="pb-0">{name}</h3>
    </Link>
    <span className="block leading-7">{description}</span>
  </div>
);
