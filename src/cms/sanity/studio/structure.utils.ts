import type { StructureResolverContext } from "sanity/structure";

import { apiVersion } from "../env";
import type { SectionRow } from "./structure.types";

/**
 * The client every pane in this folder reads with.
 *
 * `perspective: "drafts"` throughout: the sidebar describes what the editor is
 * looking at, and a section or a page that exists only as a draft is still
 * part of that.
 */
export function getDraftsClient(context: StructureResolverContext) {
  return context
    .getClient({ apiVersion })
    .withConfig({ perspective: "drafts" });
}

/**
 * The copy an editor recognises for one section row.
 *
 * A section's own heading first, then the schema's title for its type, then
 * the raw `_type` — and a positional fallback last, so a row can never render
 * as an untitled blank.
 */
export function getSectionLabel(
  section: SectionRow,
  index: number,
  context: StructureResolverContext,
): string {
  return (
    section.title ||
    section.heading ||
    section.heroTitle ||
    context.schema.get(section._type)?.title ||
    section._type ||
    `Section ${index + 1}`
  );
}
