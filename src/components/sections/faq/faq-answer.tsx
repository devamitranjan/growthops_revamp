import type { PortableTextComponents } from "next-sanity";

/** The ink the answer shares with the rest of the light panel. */
const answerInk = "text-neutral-black-light/80";

/**
 * Answers are running copy and nothing else — the schema allows no headings
 * or embedded media inside an accordion row, so this map only has to cover
 * paragraphs, the two lists, and an inline link.
 */
export const faqAnswerComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className={`body2-regular md:body1-regular mt-4 first:mt-0 leading-[1.7] ${answerInk}`}>
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className={`mt-4 list-disc space-y-2 pl-5 ${answerInk}`}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className={`mt-4 list-decimal space-y-2 pl-5 ${answerInk}`}>{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="body2-regular md:body1-regular leading-[1.7]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="body2-regular md:body1-regular leading-[1.7]">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-neutral-black-light">{children}</strong>
    ),
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href ?? "#";
      return (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="underline decoration-primary-pink-base decoration-2 underline-offset-4 transition duration-300 ease-out hover:text-primary-pink-base"
        >
          {children}
        </a>
      );
    },
  },
};
