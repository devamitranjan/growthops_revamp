import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { pageMetadata } from "@/lib/page-metadata";
import { getTotalArticlePages } from "@/sanity/repositories/articles";
import { getPage } from "@/sanity/repositories/page";

/** The page document this route composes itself from. */
const POST_PAGE_SLUG = "post";

/** Returns null for anything that is not a real page in [1, totalPages]. */
function parsePage(value: string | string[] | undefined, totalPages: number) {
  if (value === undefined) return 1;
  if (Array.isArray(value)) return null;

  // Number() would happily accept "1.5", " 2" and "0x2".
  if (!/^\d+$/.test(value)) return null;

  const page = Number(value);
  return page >= 1 && page <= totalPages ? page : null;
}

/**
 * The article listing keeps a route of its own, unlike /contact and /newsroom,
 * because `?page=` is not something a section can decide: an out-of-range
 * number has to 404 here, before anything renders, and the canonical URL has
 * to carry the page number. Everything the page *says* still comes from the
 * `post` page document, and its sections are as reorderable as any other.
 */
export async function generateMetadata(
  props: PageProps<"/post">,
): Promise<Metadata> {
  const [totalPages, doc] = await Promise.all([
    getTotalArticlePages(),
    getPage(POST_PAGE_SLUG),
  ]);

  if (!doc) return {};

  const page = parsePage((await props.searchParams).page, totalPages);
  const suffix = page && page > 1 ? ` (Page ${page})` : "";
  const canonical = page && page > 1 ? `/post?page=${page}` : "/post";

  return {
    ...pageMetadata(doc, canonical, doc.title),
    title: `${doc.seo?.title || doc.title}${suffix}`,
  };
}

export default async function PostPage(props: PageProps<"/post">) {
  const [totalPages, doc] = await Promise.all([
    getTotalArticlePages(),
    getPage(POST_PAGE_SLUG),
  ]);

  if (!doc) notFound();

  const page = parsePage((await props.searchParams).page, totalPages);

  if (page === null) notFound();

  return <ComposedPage sections={doc.sections} context={{ page }} />;
}
