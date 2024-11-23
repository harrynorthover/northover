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
    <section suppressHydrationWarning={true}>
      <a id={id} href={`#${id}`}>
        {title}
        {/* <LinkIcon className="icon" /> */}
        {description && <span>{description}</span>}
      </a>
      <pre className={`language-${language} line-numbers`}>
        <code>{code}</code>
      </pre>
      <PrismLoader />
    </section>
  );
};
