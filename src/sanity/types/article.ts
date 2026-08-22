import type { PortableTextBlock } from "next-sanity";

export interface PostData {
  slug: string;
  href: string;
  imgSrc: string;
  title: string;
  subtitle: string;
  authorName: string;
}

/** A diagram or photo inside an article body. The frame borrows `width` and
 *  `height` for the aspect ratio and the width cap, so both must survive the
 *  round trip through the CMS. */
export interface PostImageBlock {
  _type: "postImage";
  _key: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface PostQuoteBlock {
  _type: "postQuote";
  _key: string;
  text: string;
  author?: string;
}

export interface PostTableRow {
  _key: string;
  cells: string[];
}

export interface PostTableBlock {
  _type: "postTable";
  _key: string;
  caption?: string;
  hasHeader?: boolean;
  rows: PostTableRow[];
}

/**
 * Article bodies are real Portable Text: standard blocks carry the headings,
 * running copy and lists, and the two custom object types above are embedded
 * alongside them.
 */
export type PostContentBlock =
  | PortableTextBlock
  | PostImageBlock
  | PostQuoteBlock
  | PostTableBlock;

/** A full article body, keyed by the same slug the listing card uses. */
export interface PostDetailData {
  slug: string;
  category: string;
  title: string;
  authorName: string;
  publishDate: string;
  featuredImage: string;
  content: PostContentBlock[];
}
