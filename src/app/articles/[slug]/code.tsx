import PrismLoader from "@/components/prismLoader";

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
      className="my-4 bg-gray-900 rounded-md pt-2"
    >
      <a id={id} href={`#${id}`} className="text-sm p-2 px-4 block">
        {title}
        {/* <LinkIcon className="icon" /> */}
        {description && <span className="block mt-1 mb-0">{description}</span>}
      </a>
      <pre className={`language-${language} line-numbers`}>
        <code>{code}</code>
      </pre>
      <PrismLoader />
    </section>
  );
};
