import type { PageSeo, PageSection, TeamMember } from "../types";

/**
 * The shared seam between GROQ's shapes and the app's.
 *
 * Both composed document types — `page` and `report` — read their sections
 * through the same projections, so they need the same two adjustments on the
 * way out, and neither the routes nor the components should know about either.
 */

/** Sanity cannot nest arrays, so `batches` is stored as `{ members: [...] }[]`
 *  and the grid wants `TeamMember[][]`. Unwrap it here rather than making
 *  every consumer know about the wrapper. */
type RawBatch = { members: TeamMember[] | null } | null;

function unwrapBatches(batches: RawBatch[] | null | undefined): TeamMember[][] {
  return (batches ?? [])
    .map((batch) => batch?.members ?? [])
    .filter((members) => members.length > 0);
}

function normaliseSection(section: Record<string, unknown>): PageSection {
  if (section._type === "teamSection") {
    return {
      ...section,
      batches: unwrapBatches(section.batches as RawBatch[]),
    } as PageSection;
  }
  return section as PageSection;
}

export function normaliseSections(sections: unknown[] | null): PageSection[] {
  return (sections ?? []).map((section) =>
    normaliseSection(section as Record<string, unknown>),
  );
}

/** GROQ hands back `null` for an empty field; the app's contract is optional
 *  keys, so an unfilled meta title reads as "absent" rather than "empty". */
export function normaliseSeo(
  seo: {
    title: string | null;
    description: string | null;
    ogImage: string | null;
  } | null,
): PageSeo | undefined {
  if (!seo) return undefined;

  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    ogImage: seo.ogImage ?? undefined,
  };
}
