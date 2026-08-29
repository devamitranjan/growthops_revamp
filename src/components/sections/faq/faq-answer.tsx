import { RichTextSpans } from "@/components/ui/rich-text-spans";
import type {
  RichText,
  RichTextList,
  RichTextSpan,
} from "@/content/types";

/**
 * One FAQ answer.
 *
 * Answers are running copy and nothing else — the schema behind them allows no
 * headings and no embedded media inside an accordion row — so this only has to
 * cover paragraphs, the two lists, and an inline link. Anything richer that
 * reaches it is rendered as a paragraph rather than dropped.
 *
 * It takes `RichText`, the domain's own tree, so the accordion has no CMS
 * dependency at all; see `src/content/models/rich-text.ts`.
 */

/** The ink the answer shares with the rest of the light panel. */
const answerInk = "text-neutral-black-light/80";

const paragraphClasses = `body2-regular md:body1-regular mt-4 first:mt-0 leading-[1.7] ${answerInk}`;

const itemClasses = "body2-regular md:body1-regular leading-[1.7]";

const linkClasses =
  "underline decoration-primary-pink-base decoration-2 underline-offset-4 transition duration-300 ease-out hover:text-primary-pink-base";

function Spans({ spans }: { spans: RichTextSpan[] }) {
  return (
    <RichTextSpans
      spans={spans}
      boldClassName="font-bold text-neutral-black-light"
      linkClassName={linkClasses}
    />
  );
}

function List({ list }: { list: RichTextList }) {
  const Tag = list.style === "number" ? "ol" : "ul";
  const marker = list.style === "number" ? "list-decimal" : "list-disc";

  return (
    <Tag className={`mt-4 ${marker} space-y-2 pl-5 ${answerInk}`}>
      {list.items.map((item) => (
        <li key={item.key} className={itemClasses}>
          <Spans spans={item.spans} />
          {item.children.map((child) => (
            <List key={child.key} list={child} />
          ))}
        </li>
      ))}
    </Tag>
  );
}

export function FaqAnswer({ answer }: { answer: RichText }) {
  return (
    <>
      {answer.map((node) =>
        node.type === "list" ? (
          <List key={node.key} list={node} />
        ) : (
          <p key={node.key} className={paragraphClasses}>
            {/* Headings, quotes, images and tables cannot be authored here.
                A paragraph is the honest fallback for anything that arrives
                anyway: the copy still reads, in the row's own voice. */}
            <Spans spans={"spans" in node ? node.spans : []} />
          </p>
        ),
      )}
    </>
  );
}
