import { Fragment } from "react";

import type { RichTextSpan } from "@/content/types";

/**
 * The inline half of rich text: a run of spans with their formatting on them.
 *
 * Shared by the two places the site renders authored copy — article bodies and
 * FAQ answers — because the *structure* of a span is the same in both and only
 * the classes differ. The elements are props rather than hard-coded because
 * the two contexts genuinely disagree: an article renders emphasis as a
 * classed `<span>` so the copy carries the same utilities it did before the
 * content moved into a CMS, while an answer inside the accordion renders a
 * real `<strong>`.
 *
 * A link is the outermost element when a span has one, which is where a
 * Portable Text renderer puts an annotation relative to a decorator — same
 * markup, same cascade.
 */

/** External links open in a new tab; in-site ones do not. `rel` is set on both
 *  rather than branched on, which is what the site has always done. */
export function anchorProps(href: string) {
  return {
    href,
    target: href.startsWith("http") ? "_blank" : "_self",
    rel: "noopener noreferrer",
  } as const;
}

export function RichTextSpans({
  spans,
  boldAs = "strong",
  boldClassName,
  italicAs = "em",
  italicClassName,
  linkClassName,
}: {
  spans: RichTextSpan[];
  boldAs?: "span" | "strong";
  boldClassName?: string;
  italicAs?: "span" | "em";
  italicClassName?: string;
  linkClassName?: string;
}) {
  const Bold = boldAs;
  const Italic = italicAs;

  return (
    <>
      {spans.map((span, index) => {
        let content: React.ReactNode = span.text;

        if (span.bold) {
          content = <Bold className={boldClassName}>{content}</Bold>;
        }

        if (span.italic) {
          content = <Italic className={italicClassName}>{content}</Italic>;
        }

        if (span.href) {
          content = (
            <a {...anchorProps(span.href)} className={linkClassName}>
              {content}
            </a>
          );
        }

        // A Fragment rather than a wrapper element: spans are runs of inline
        // text, and a `<span>` around every one of them would be markup the
        // page never had. The index is the honest key — a span has no identity
        // of its own in any CMS this maps from, and the run is never
        // reordered.
        return <Fragment key={index}>{content}</Fragment>;
      })}
    </>
  );
}
