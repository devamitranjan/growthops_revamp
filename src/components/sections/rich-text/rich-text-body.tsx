import cx from "clsx";

import { PostImage } from "@/components/ui/post-image";
import { RichTextSpans, anchorProps } from "@/components/ui/rich-text-spans";
import type {
  RichText,
  RichTextHeading,
  RichTextList,
  RichTextListItem,
  RichTextNode,
  RichTextSpan,
} from "@/content/types";

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

const HEADING_CLASSES: Record<RichTextHeading["level"], string> = {
  1: "mt-16 text-3xl font-extrabold tracking-tight leading-tight md:mt-20 md:text-4xl lg:text-5xl first:mt-0",
  2: "mt-12 text-2xl font-bold tracking-tight leading-snug md:mt-16 md:text-3xl first:mt-0",
  3: "mt-10 text-xl font-semibold tracking-tight leading-snug md:mt-12 md:text-2xl first:mt-0",
  4: "mt-8 text-lg font-semibold leading-normal md:mt-10 first:mt-0",
  5: "mt-6 text-base font-medium leading-normal md:mt-8 first:mt-0",
  6: "mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground leading-normal md:mt-8 first:mt-0",
};

/** Emphasis renders as classed spans rather than `<strong>` / `<em>` so it
 *  carries the same utilities the copy had before it moved into a CMS. */
function Spans({ spans }: { spans: RichTextSpan[] }) {
  return (
    <RichTextSpans
      spans={spans}
      boldAs="span"
      boldClassName="font-bold"
      italicAs="span"
      italicClassName="italic"
      linkClassName={inlineLinkClasses}
    />
  );
}

function Heading({
  level,
  spans,
}: {
  level: RichTextHeading["level"];
  spans: RichTextSpan[];
}) {
  const Tag = `h${level}` as const;

  return (
    <Tag className={HEADING_CLASSES[level]}>
      <strong className="font-bold text-black">
        <Spans spans={spans} />
      </strong>
    </Tag>
  );
}

function Paragraph({ spans }: { spans: RichTextSpan[] }) {
  // A paragraph that is nothing but a link.
  if (spans.length === 1 && spans[0].href) {
    return (
      <p className={cx("mt-7", bodyClasses)}>
        <a {...anchorProps(spans[0].href)} className={ctaLinkClasses}>
          {spans[0].text}
        </a>
      </p>
    );
  }

  // A paragraph that is bold from end to end is a lead-in label, not running
  // copy: it stays at body size and marks the new section by weight alone. Its
  // leading is tighter than bodyClasses, so the size and ink are spelled out
  // here — two `leading-*` utilities on one element would race.
  const isLabel = spans.length > 0 && spans.every((span) => span.bold);

  if (isLabel) {
    return (
      <p
        data-lead-in
        className={cx("mt-7 text-[1rem] leading-[1.5]", articleInk)}
      >
        <Spans spans={spans} />
      </p>
    );
  }

  return (
    <p className={cx("mt-7", bodyClasses)}>
      <Spans spans={spans} />
    </p>
  );
}

/** A hyphen run hangs straight off its lead-in line and sets tighter leading;
 *  statements stay at paragraph leading, a paragraph below the copy above.
 *  Neither spaces its items apart — the line box alone separates them. */
function listClasses(style: RichTextList["style"]) {
  if (style === "statements") {
    return cx("text-[1rem]", articleInk, "mt-7 leading-[1.8] list-none");
  }

  if (style === "number") {
    return cx("text-[1rem]", articleInk, "leading-[1.5] list-decimal pl-6");
  }

  return cx("text-[1rem]", articleInk, "leading-[1.5] list-none");
}

function ListItem({
  item,
  style,
}: {
  item: RichTextListItem;
  style: RichTextList["style"];
}) {
  const content = (
    <>
      <Spans spans={item.spans} />
      {item.children.map((child) => (
        <List key={child.key} list={child} />
      ))}
    </>
  );

  // Only the hyphen run draws its own marker; the other two use the list's.
  if (style === "bullet") {
    return (
      <li className="relative pl-2.5 before:absolute before:left-0 before:content-['-']">
        {content}
      </li>
    );
  }

  return <li>{content}</li>;
}

function List({ list }: { list: RichTextList }) {
  const Tag = list.style === "number" ? "ol" : "ul";

  return (
    <Tag className={listClasses(list.style)}>
      {list.items.map((item) => (
        <ListItem key={item.key} item={item} style={list.style} />
      ))}
    </Tag>
  );
}

function Node({ node }: { node: RichTextNode }) {
  switch (node.type) {
    case "heading":
      return <Heading level={node.level} spans={node.spans} />;

    case "paragraph":
      return <Paragraph spans={node.spans} />;

    case "list":
      return <List list={node} />;

    case "image": {
      const { src, alt, width, height } = node.image;

      return (
        <figure className="mt-6 md:mt-8">
          {/* Diagrams are authored at their own shape, so the frame borrows the
              artwork's ratio and never stretches past its own width. */}
          <div
            className="relative w-full overflow-hidden"
            style={{
              maxWidth: width,
              aspectRatio: `${width} / ${height}`,
            }}
          >
            <PostImage
              src={src}
              alt={alt ?? ""}
              className="object-contain"
              sizes={`(max-width: ${width}px) 100vw, ${width}px`}
            />
          </div>

          {node.caption && (
            <figcaption className="body2-regular mt-4 text-[#0b0d0f]/60">
              {node.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    case "quote":
      return (
        <blockquote className="mt-10 border-l-2 border-primary-pink-base pl-6 md:mt-12 md:pl-8">
          <p
            className={cx(
              "text-[1.25rem] font-light italic leading-[160%] md:text-[1.5rem]",
              articleInk,
            )}
          >
            {node.text}
          </p>

          {node.author && (
            <footer className="body2-semibold mt-4 uppercase text-[#0b0d0f]/60">
              {node.author}
            </footer>
          )}
        </blockquote>
      );

    case "table": {
      const header = node.hasHeader ? node.rows[0] : undefined;
      const body = node.hasHeader ? node.rows.slice(1) : node.rows;

      return (
        <figure className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-[0.9375rem] leading-[1.5] text-[#0b0d0f]">
            {header && (
              <thead>
                <tr>
                  {header.cells.map((cell, index) => (
                    <th
                      key={`${header.key}-${index}`}
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
                <tr key={row.key}>
                  {row.cells.map((cell, index) => (
                    <td
                      key={`${row.key}-${index}`}
                      className="border border-[#0b0d0f]/20 px-4 py-3 align-top"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {node.caption && (
            <figcaption className="body2-regular mt-3 text-[#0b0d0f]/60">
              {node.caption}
            </figcaption>
          )}
        </figure>
      );
    }
  }
}

export function RichTextBody({ content }: { content: RichText }) {
  return (
    <>
      {content.map((node) => (
        <Node key={node.key} node={node} />
      ))}
    </>
  );
}
