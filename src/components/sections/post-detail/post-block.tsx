import cx from "clsx";
import { PostImage } from "@/components/ui/post-image";
import { PostContentBlock, PostTextSegment } from "@/sanity/types";

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
 *  close to the copy it introduces and never breaks over two lines at the
 *  article measure. Deeper levels step back down towards body size so the
 *  outline still reads as a hierarchy. The weight and the ink live on the
 *  nested <strong> instead — see PostBlock. */
function headingClasses(level: 2 | 3 | 4 | 5) {
  if (level === 2) {
    return "mt-16 text-[1.25rem] leading-[1.5] md:mt-20";
  }

  if (level === 3) {
    return "mt-12 text-[1.125rem] leading-[1.5] md:mt-14";
  }

  return "mt-10 text-[1rem] leading-[1.5]";
}

interface SegmentsProps {
  segments: PostTextSegment[];
  linkClassName: string;
}

function Segments({ segments, linkClassName }: SegmentsProps) {
  return segments.map((segment, index) => {
    const emphasis = cx(
      segment.bold && "font-bold",
      segment.italic && "italic",
    );

    // Static copy with no stable id of its own — the index is the key.
    return segment.href ? (
      <a
        key={index}
        href={segment.href}
        target={segment.href.startsWith("http") ? "_blank" : "_self"}
        rel="noopener noreferrer"
        className={cx(linkClassName, emphasis)}
      >
        {segment.text}
      </a>
    ) : (
      <span key={index} className={emphasis || undefined}>
        {segment.text}
      </span>
    );
  });
}

/**
 * Renders one block of an article body against the light panel. Every case
 * sets its own top margin so headings can open more space than the paragraphs
 * they follow.
 */
export function PostBlock({ block }: { block: PostContentBlock }) {
  switch (block.type) {
    case "heading": {
      const Heading = `h${block.level}` as const;

      // The authored heading is <h2><strong>…</strong></h2>: the outline level
      // and the weight are separate statements, so the heading element carries
      // the scale and the <strong> inside it carries the weight — plain bold,
      // the weight <strong> means — and the ink, pure black here rather than
      // the body's off-black.
      return (
        <Heading className={headingClasses(block.level)}>
          <strong className="font-bold text-black">{block.text}</strong>
        </Heading>
      );
    }

    case "paragraph": {
      const [only] = block.content;
      const isCallToAction = block.content.length === 1 && Boolean(only.href);

      // A paragraph that is bold from end to end is a lead-in label, not
      // running copy: it stays at body size and at the paragraph's own top
      // margin, so the weight alone marks the new section — and it stays a
      // <p>, out of the document outline. Its leading is set tighter than
      // bodyClasses (which is why the size and ink are spelled out here
      // instead: two `leading-*` utilities on one element would race), so the
      // copy that follows sits right under it rather than a line adrift.
      const isLabel =
        !isCallToAction && block.content.every((segment) => segment.bold);

      if (isLabel) {
        return (
          <p
            data-lead-in
            className={cx("mt-7 text-[1rem] leading-[1.5]", articleInk)}
          >
            <Segments
              segments={block.content}
              linkClassName={inlineLinkClasses}
            />
          </p>
        );
      }

      return (
        <p className={cx("mt-7", bodyClasses)}>
          <Segments
            segments={block.content}
            linkClassName={isCallToAction ? ctaLinkClasses : inlineLinkClasses}
          />
        </p>
      );
    }

    case "image":
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

    case "quote":
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

    case "list": {
      const List = block.style === "ordered" ? "ol" : "ul";
      const isStatements = block.variant === "statements";
      const isHyphenated = !isStatements && block.style === "bullet";

      // Neither variant spaces its items apart — the line box alone separates
      // them. A hyphen run hangs straight off its lead-in line and sets tighter
      // leading; statements stay at paragraph leading, a paragraph below the
      // copy above. Leading is set here rather than borrowed from bodyClasses:
      // two `leading-*` utilities on one element would race.
      return (
        <List
          className={cx(
            "text-[1rem]",
            articleInk,
            isStatements ? "mt-7 leading-[1.8]" : "leading-[1.5]",
            block.style === "ordered" ? "list-decimal pl-6" : "list-none",
          )}
        >
          {block.items.map((item) => (
            <li
              key={
                typeof item === "string"
                  ? item
                  : item.map((part) => part.text).join("")
              }
              className={cx(
                isHyphenated &&
                  "relative pl-2.5 before:absolute before:left-0 before:content-['-']",
              )}
            >
              {typeof item === "string" ? (
                item
              ) : (
                <Segments segments={item} linkClassName={inlineLinkClasses} />
              )}
            </li>
          ))}
        </List>
      );
    }
  }
}
