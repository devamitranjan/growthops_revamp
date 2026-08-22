import { client } from "../client";
import { PAGE_QUERY } from "../queries/page";
import type { PageData, PageSection, TeamMember } from "../types";

/** The home page's document id/slug. */
export const HOME_PAGE_SLUG = "home";

/** Sanity cannot nest arrays, so `batches` is stored as `{ members: [...] }[]`
 *  and the grid wants `TeamMember[][]`. Unwrap it here, in the seam, rather
 *  than making every consumer know about the wrapper. */
type RawBatch = { members: TeamMember[] | null } | null;

function unwrapBatches(batches: RawBatch[] | null | undefined): TeamMember[][] {
  return (batches ?? [])
    .map((batch) => batch?.members ?? [])
    .filter((members) => members.length > 0);
}

function normalise(section: Record<string, unknown>): PageSection {
  if (section._type === "teamSection") {
    return {
      ...section,
      batches: unwrapBatches(section.batches as RawBatch[]),
    } as PageSection;
  }
  return section as PageSection;
}

export async function getPage(slug: string): Promise<PageData | null> {
  const page = await client.fetch(PAGE_QUERY, { slug });
  if (!page) return null;

  return {
    slug: page.slug ?? slug,
    title: page.title ?? "",
    sections: (page.sections ?? []).map((section) =>
      normalise(section as unknown as Record<string, unknown>),
    ),
  };
}

export async function getHomePage(): Promise<PageData | null> {
  return getPage(HOME_PAGE_SLUG);
}
