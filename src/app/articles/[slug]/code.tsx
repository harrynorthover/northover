import { BiLink } from "react-icons/bi";

import PrismLoader from "@/components/PrismLoader";

export const CodeBlock = ({
  code,
  language,
  description,
  title,
}: {
  code: string;
  language: string;
  description?: string;
  title: string;
}) => {
  const id = title.replace(/[\s:,]+/g, "-").toLowerCase();

  return (
    <section
      suppressHydrationWarning={true}
      className="my-4 bg-gray-900 rounded-md"
      data-component="CodeBlock"
    >
      <a id={id} href={`#${id}`} className="text-sm p-4 flex items-center">
        <div className="flex-1">
          {title}
          {description && (
            <span className="block mt-1 mb-0">{description}</span>
          )}
        </div>

        <BiLink className="icon" size={20} />
      </a>
      <pre className={`language-${language} line-numbers !mt-0`}>
        <code>{code}</code>
      </pre>
      <PrismLoader />
    </section>
  );
};
