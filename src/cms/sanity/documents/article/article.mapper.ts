import type {
  PostData,
  PostDetailData,
} from "@/content/domain/article/article.types";
import { mapRichText } from "../../rich-text/rich-text.mapper";

/**
 * Sanity's article projections -> the domain's article types.
 *
 * The input shapes are written out here rather than imported from
 * `generated/sanity.types.ts`, and that is not a way of avoiding TypeGen — it
 * is where TypeGen does its work. `sanityFetch` is typed by the module
 * augmentation the generated file installs, so the repository hands these
 * functions an already-typed result and TypeScript checks it against the
 * parameters below. A projection that stops matching is a compile error at the
 * call site, with no import from the generated file and no cast anywhere.
 */

/** `ARTICLES_QUERY`: one card in the /post listing. */
interface RawPostCard {
  slug?: string | null;
  href?: string | null;
  imgSrc?: string | null;
  title?: string | null;
  subtitle?: string | null;
  authorName?: string | null;
}

/** `ARTICLE_QUERY`: one article and its body. */
interface RawArticle {
  slug?: string | null;
  category?: string | null;
  title?: string | null;
  authorName?: string | null;
  publishDate?: string | null;
  featuredImage?: string | null;
  content?: unknown;
}

/** GROQ answers `null` for an unfilled string; the cards render text, so an
 *  absent value is an empty string rather than a `null` every component would
 *  have to guard. */
const text = (value: string | null | undefined) => value ?? "";

export function mapPostCard(row: RawPostCard): PostData {
  return {
    slug: text(row.slug),
    href: text(row.href),
    imgSrc: text(row.imgSrc),
    title: text(row.title),
    subtitle: text(row.subtitle),
    authorName: text(row.authorName),
  };
}

export function mapPostCards(rows: readonly RawPostCard[] | null): PostData[] {
  return (rows ?? []).map(mapPostCard);
}

/**
 * One article, or `null` where there is no in-site page to render.
 *
 * A body is what makes an article in-site: most of the archive is a card that
 * links out to growthops.asia, and those documents have no `content` at all.
 * The check is on the *raw* array rather than the mapped one, so it keeps
 * answering the same question `ARTICLE_SLUGS_QUERY` answers — an article with
 * a body full of block types this deploy cannot render is still an article,
 * and `generateStaticParams` has already prerendered a route for it.
 */
export function mapPostDetail(row: RawArticle | null): PostDetailData | null {
  if (!row) return null;
  if (!Array.isArray(row.content) || row.content.length === 0) return null;

  return {
    slug: text(row.slug),
    category: text(row.category),
    title: text(row.title),
    authorName: text(row.authorName),
    publishDate: text(row.publishDate),
    featuredImage: text(row.featuredImage),
    content: mapRichText(row.content),
  };
}
