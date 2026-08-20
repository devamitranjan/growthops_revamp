export interface PostData {
  slug: string;
  href: string;
  imgSrc: string;
  title: string;
  subtitle: string;
  authorName: string;
}

/** A run of copy inside a block: plain by default, optionally emphasised, and
 *  optionally a link. */
export interface PostTextSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
}

interface PostHeadingBlock {
  type: "heading";
  /** Article headings sit under the <h1> the detail page renders. */
  level: 2 | 3 | 4 | 5;
  text: string;
}

interface PostParagraphBlock {
  type: "paragraph";
  content: PostTextSegment[];
}

interface PostImageBlock {
  type: "image";
  src: string;
  alt: string;
  /** Intrinsic size — the frame borrows it for the aspect ratio and the cap. */
  width: number;
  height: number;
  caption?: string;
}

interface PostQuoteBlock {
  type: "quote";
  text: string;
  author?: string;
}

interface PostListBlock {
  type: "list";
  style: "bullet" | "ordered";
  /** "statements" items carry a full argument each and set at paragraph
   *  leading; anything else reads as a hyphen run. */
  variant?: "statements";
  /** A plain string for an unadorned item, segments when it needs emphasis
   *  or a link. */
  items: (string | PostTextSegment[])[];
}

export type PostContentBlock =
  | PostHeadingBlock
  | PostParagraphBlock
  | PostImageBlock
  | PostQuoteBlock
  | PostListBlock;

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
