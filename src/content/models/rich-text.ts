import type { ContentImage } from "./image";

/**
 * Long-form editorial copy, as the application sees it.
 *
 * This is the one place the CMS boundary costs something rather than just
 * moving a file. Sanity stores rich text as Portable Text: a *flat* array of
 * blocks where a list is not a container but a run of siblings that happen to
 * share a `listItem` value, marks are ids pointing into a per-block `markDefs`
 * table, and everything carries `_type` / `_key`. Rendering that shape needs
 * either the Sanity renderer or a reimplementation of it, and both put
 * `next-sanity` in the component tree.
 *
 * So the adapter resolves it instead. `src/cms/sanity/rich-text/` groups the
 * list runs into real lists, dereferences every mark into the span that
 * carries it, and resolves image assets to URLs — leaving a tree that renders
 * with an ordinary `switch`. What survives here is only the vocabulary the two
 * schemas actually allow (`documents/article/objects/post-body.ts` and
 * `sections/objects/faq-item.ts`), which is what keeps this a content model
 * rather than a second Portable Text.
 *
 * Every node keeps a `key`, stable across renders and unique within its
 * parent, because React needs one. It is the CMS's array key with the CMS's
 * name taken off it.
 */

/** A run of text and the formatting on it. Marks are flattened onto the span
 *  rather than left as ids in a side table, so a renderer never has to
 *  dereference anything. */
export interface RichTextSpan {
  text: string;
  bold?: boolean;
  italic?: boolean;
  /** Present when the run is a link. */
  href?: string;
}

/**
 * `statements` is a third list style rather than a flag, because the schema
 * models it as one — see `post-body.ts`. A hyphen run and a statements list
 * are the same markup at different leading.
 */
export type RichTextListStyle = "bullet" | "number" | "statements";

export interface RichTextListItem {
  key: string;
  spans: RichTextSpan[];
  /** Lists nested under this item. Empty for the flat lists this content
   *  actually uses; present so a nested one cannot silently disappear. */
  children: RichTextList[];
}

export interface RichTextParagraph {
  type: "paragraph";
  key: string;
  spans: RichTextSpan[];
}

/** Levels are the ones the schema offers; there is deliberately no h1, which
 *  belongs to the page rather than to the body. */
export interface RichTextHeading {
  type: "heading";
  key: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  spans: RichTextSpan[];
}

export interface RichTextList {
  type: "list";
  key: string;
  style: RichTextListStyle;
  items: RichTextListItem[];
}

/** A diagram or photo inside a body. The frame borrows the artwork's `width`
 *  and `height` for its aspect ratio and its width cap, so both have to
 *  survive the round trip through the CMS. */
export interface RichTextImage {
  type: "image";
  key: string;
  image: ContentImage;
  caption?: string;
}

export interface RichTextQuote {
  type: "quote";
  key: string;
  text: string;
  author?: string;
}

export interface RichTextTableRow {
  key: string;
  cells: string[];
}

export interface RichTextTable {
  type: "table";
  key: string;
  caption?: string;
  /** First row renders as `<th>`. */
  hasHeader: boolean;
  rows: RichTextTableRow[];
}

export type RichTextNode =
  | RichTextParagraph
  | RichTextHeading
  | RichTextList
  | RichTextImage
  | RichTextQuote
  | RichTextTable;

export type RichText = RichTextNode[];
