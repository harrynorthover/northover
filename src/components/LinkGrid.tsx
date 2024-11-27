import { LinkItem, LinkItemProps } from "./LinkItem";

export type LinkGridProps = {
  links: LinkItemProps[];
};

export const LinkGrid: React.FC<LinkGridProps> = ({ links }) => (
  <div className="grid md:grid-cols-3 gap-y-6 gap-x-20 max-w-6xl border-t border-t-gray-800/40 pt-12">
    {links.map((link) => (
      <LinkItem key={link.url || link.name} {...link} />
    ))}
  </div>
);
