import cx from "clsx";
import type { PortableTextComponents } from "next-sanity";

import { PostImage } from "@/components/ui/post-image";
import type {
  PostImageBlock,
  PostQuoteBlock,
  PostTableBlock,
} from "@/sanity/types";

/** The ink every block of the article shares against the light panel. */
const articleInk = "text-[#0b0d0f]";

const bodyClasses = cx("text-[1rem] leading-[1.8]", articleInk);

const brandUnderline =
  "underline decoration-primary-pink-base decoration-2 underline-offset-4 transition duration-300 ease-out";

/** Citations inside running copy keep the body colour and pick up only the
 *  brand underline, so they don't shout over the sentence carrying them. */
const inlineLinkClasses = cx(brandUnderline, "hover:text-primary-pink-base");

/** A paragraph that is nothing but a link reads as a call to action, so it
 *  takes the brand colour outright. */
const ctaLinkClasses = cx(
  brandUnderline,
  "text-primary-pink-base hover:text-primary-pink-light",
);

/** A section heading is a quiet step above the body, not display type: it is
 *  the weight and the space above it that mark a new section, so it stays
 *  close to the copy it introduces. Deeper levels step back down towards body
 *  size so the outline still reads as a hierarchy. The weight and the ink live
 *  on the nested <strong>. */
function headingClasses(level: 2 | 3 | 4 | 5) {
  if (level === 2) return "mt-16 text-[1.25rem] leading-[1.5] md:mt-20";
  if (level === 3) return "mt-12 text-[1.125rem] leading-[1.5] md:mt-14";
  return "mt-10 text-[1rem] leading-[1.5]";
}

type Span = { _type: string; text?: string; marks?: string[] };
type MarkDef = { _key: string; _type: string; href?: string };
type BlockValue = { children?: Span[]; markDefs?: MarkDef[] };

const isTextSpan = (span: Span) => span._type === "span";

/** The link annotation applied to a span, if any. */
function linkFor(span: Span, markDefs: MarkDef[] = []): MarkDef | undefined {
  return span.marks
    ?.map((mark) => markDefs.find((def) => def._key === mark))
    .find((def) => def?._type === "link");
}

function anchorProps(href: string) {
  return {
    href,
    target: href.startsWith("http") ? "_blank" : "_self",
    rel: "noopener noreferrer",
  } as const;
}

function Heading({
  level,
  children,
}: {
  level: 2 | 3 | 4 | 5;
  children?: React.ReactNode;
}) {
  const Tag = `h${level}` as const;

  // The authored heading is <h2><strong>…</strong></h2>: the outline level and
  // the weight are separate statements, so the heading element carries the
  // scale and the <strong> inside it carries the weight and the ink — pure
  // black here rather than the body's off-black.
  return (
    <Tag className={headingClasses(level)}>
      <strong className="font-bold text-black">{children}</strong>
    </Tag>
  );
}

/**
 * Portable Text renderer for article bodies.
 *
 * Three behaviours from the pre-CMS block union are preserved deliberately,
 * because they carry layout meaning rather than decoration:
 *
 * - a paragraph whose every span is bold is a lead-in label, tagged
 *   `data-lead-in` so `post-detail.tsx` can collapse the margin after it;
 * - a paragraph that is nothing but one link is a call to action and takes
 *   the brand colour;
 * - the `statements` list style sets paragraph leading, where a plain bullet
 *   list renders as a tight hyphen run.
 *
 * These are derived from the block value rather than passed down through
 * context, because this renders inside a Server Component where React context
 * is unavailable.
 */
export const postBlockComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    h5: ({ children }) => <Heading level={5}>{children}</Heading>,

    normal: ({ value, children }) => {
      const block = value as BlockValue;
      const spans = (block.children ?? []).filter(isTextSpan);
      const markDefs = block.markDefs ?? [];

      // A paragraph that is nothing but a link.
      if (spans.length === 1) {
        const link = linkFor(spans[0], markDefs);
        if (link?.href) {
          return (
            <p className={cx("mt-7", bodyClasses)}>
              <a {...anchorProps(link.href)} className={ctaLinkClasses}>
                {spans[0].text}
              </a>
            </p>
          );
        }
      }

      // A paragraph that is bold from end to end is a lead-in label, not
      // running copy: it stays at body size and marks the new section by
      // weight alone. Its leading is tighter than bodyClasses, so the size and
      // ink are spelled out here — two `leading-*` utilities on one element
      // would race.
      const isLabel =
        spans.length > 0 && spans.every((span) => span.marks?.includes("strong"));

      if (isLabel) {
        return (
          <p data-lead-in className={cx("mt-7 text-[1rem] leading-[1.5]", articleInk)}>
            {children}
          </p>
        );
      }

      return <p className={cx("mt-7", bodyClasses)}>{children}</p>;
    },
  },

  marks: {
    // Rendered as spans rather than <strong>/<em> so the emphasis carries the
    // same classes it did before the move to Portable Text.
    strong: ({ children }) => <span className="font-bold">{children}</span>,
    em: ({ children }) => <span className="italic">{children}</span>,
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? "#";
      return (
        <a {...anchorProps(href)} className={inlineLinkClasses}>
          {children}
        </a>
      );
    },
  },

  list: {
    // A hyphen run hangs straight off its lead-in line and sets tighter
    // leading; statements stay at paragraph leading, a paragraph below the
    // copy above. Neither spaces its items apart — the line box alone
    // separates them.
    bullet: ({ children }) => (
      <ul className={cx("text-[1rem]", articleInk, "leading-[1.5] list-none")}>
        {children}
      </ul>
    ),
    statements: ({ children }) => (
      <ul className={cx("text-[1rem]", articleInk, "mt-7 leading-[1.8] list-none")}>
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className={cx("text-[1rem]", articleInk, "leading-[1.5] list-decimal pl-6")}>
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="relative pl-2.5 before:absolute before:left-0 before:content-['-']">
        {children}
      </li>
    ),
    statements: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  types: {
    postImage: ({ value }) => {
      const block = value as PostImageBlock;
      if (!block.src) return null;

      return (
        <figure className="mt-6 md:mt-8">
          {/* Diagrams are authored at their own shape, so the frame borrows the
              artwork's ratio and never stretches past its own width. */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: block.width,
              aspectRatio: `${block.width} / ${block.height}`,
            }}
          >
            <PostImage
              src={block.src}
              alt={block.alt}
              className="object-contain"
              sizes={`(max-width: ${block.width}px) 100vw, ${block.width}px`}
            />
          </div>

          {block.caption && (
            <figcaption className="body2-regular mt-4 text-[#0b0d0f]/60">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    postQuote: ({ value }) => {
      const block = value as PostQuoteBlock;

      return (
        <blockquote className="mt-10 border-l-2 border-primary-pink-base pl-6 md:mt-12 md:pl-8">
          <p
            className={cx(
              "text-[1.25rem] font-light italic leading-[160%] md:text-[1.5rem]",
              articleInk,
            )}
          >
            {block.text}
          </p>

          {block.author && (
            <footer className="body2-semibold mt-4 uppercase text-[#0b0d0f]/60">
              {block.author}
            </footer>
          )}
        </blockquote>
      );
    },

    postTable: ({ value }) => {
      const block = value as PostTableBlock;
      const rows = block.rows ?? [];
      const header = block.hasHeader ? rows[0] : undefined;
      const body = block.hasHeader ? rows.slice(1) : rows;

      return (
        <figure className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-[0.9375rem] leading-[1.5] text-[#0b0d0f]">
            {header && (
              <thead>
                <tr>
                  {header.cells.map((cell, index) => (
                    <th
                      key={`${header._key}-${index}`}
                      scope="col"
                      className="border border-[#0b0d0f]/20 bg-[#0b0d0f]/5 px-4 py-3 font-bold"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row) => (
                <tr key={row._key}>
                  {row.cells.map((cell, index) => (
                    <td
                      key={`${row._key}-${index}`}
                      className="border border-[#0b0d0f]/20 px-4 py-3 align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="body2-regular mt-3 text-[#0b0d0f]/60">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
