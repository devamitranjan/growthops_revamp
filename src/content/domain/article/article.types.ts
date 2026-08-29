import type { RichText } from "@/content/models/rich-text";

/**
 * An article, as the /post listing and the /post/[slug] detail page see one.
 *
 * Nothing here names a CMS. `slug` is a plain string rather than any CMS's
 * slug object, and the body is `RichText` rather than Portable Text — see
 * `src/content/models/rich-text.ts` for why that conversion is worth doing.
 */

/** One card in the /post listing. */
export interface PostData {
  slug: string;
  /** Where the card points. Most of the archive still hands off to
   *  growthops.asia; the ones with a body open in-site at /post/<slug>. */
  href: string;
  imgSrc: string;
  title: string;
  subtitle: string;
  authorName: string;
}

/** A full article body, keyed by the same slug the listing card uses. */
export interface PostDetailData {
  slug: string;
  category: string;
  title: string;
  authorName: string;
  publishDate: string;
  featuredImage: string;
  content: RichText;
}

/** One page of the listing, and enough about the whole archive to paginate
 *  it. */
export interface ArticleListing {
  articles: PostData[];
  /** 1-based. */
  page: number;
  totalPages: number;
  /** The page size this listing was built with — the section's value, or the
   *  default where it left the field empty. */
  perPage: number;
}
