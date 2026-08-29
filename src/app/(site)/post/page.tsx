import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { pageMetadata } from "@/lib/page-metadata";
import { articleRepository, pageRepository } from "@/content/repositories";
import type { PageData, PageSection } from "@/content/types";

/** The page this route composes itself from, by path. */
const POST_PAGE_PATH = "post";

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
 * The page size the editor set on the listing section.
 *
 * The first listing section wins. A page carrying two of them would have two
 * answers to "how many pages is this", and one `?page=` to serve both — the
 * section itself still renders at its own size, this only decides which one
 * bounds the URL.
 */
function postsPerPageOf(sections: PageSection[]) {
  const listing = sections.find(
    (section) => section.type === "postListing",
  );

  return listing?.postsPerPage;
}

/**
 * What both exports below need: the page document, and the `?page=` resolved
 * against it. `null` document means no page to serve; `null` page number means
 * the URL asks for a page that does not exist.
 *
 * The two reads are sequential rather than parallel because the page count now
 * depends on the section's page size, which only the document knows. `getPage`
 * is a tagged, cached read, so the second caller within the request pays
 * nothing.
 */
async function resolveListingPage(
  searchParams: Promise<{ page?: string | string[] }>,
): Promise<{ doc: PageData; page: number | null } | null> {
  const doc = await pageRepository.getByPath(POST_PAGE_PATH);

  if (!doc) return null;

  const totalPages = await articleRepository.getTotalPages(
    postsPerPageOf(doc.sections),
  );

  return { doc, page: parsePage((await searchParams).page, totalPages) };
}

/**
 * The article listing keeps a route of its own, unlike /contact and /newsroom,
 * because `?page=` is not something a section can decide: an out-of-range
 * number has to 404 here, before anything renders, and the canonical URL has
 * to carry the page number. Everything the page *says* still comes from the
 * `post` page document — including how many posts a page holds — and its
 * sections are as reorderable as any other.
 */
export async function generateMetadata(
  props: PageProps<"/post">,
): Promise<Metadata> {
  const resolved = await resolveListingPage(props.searchParams);

  if (!resolved) return {};

  const { doc, page } = resolved;
  const suffix = page && page > 1 ? ` (Page ${page})` : "";
  const canonical = page && page > 1 ? `/post?page=${page}` : "/post";

  return {
    ...pageMetadata(doc, canonical, doc.title),
    title: `${doc.seo?.title || doc.title}${suffix}`,
  };
}

export default async function PostPage(props: PageProps<"/post">) {
  const resolved = await resolveListingPage(props.searchParams);

  if (!resolved) notFound();

  const { doc, page } = resolved;

  if (page === null) notFound();

  return <ComposedPage sections={doc.sections} context={{ page }} />;
}
