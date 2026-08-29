import { defineType } from "sanity";

import { sectionArrayMembers } from "../section.schema";

/**
 * The page builder's field: a reorderable, repeatable list of sections.
 *
 * It is a named type rather than an inline array so every document that wants
 * a composed body — `page` today, anything else later — offers the identical
 * section library, and a section added to `sections/index.ts` appears in all
 * of them without a second edit.
 *
 * `filter` puts a search box in the insert menu; the list is long enough that
 * scanning it is slower than typing.
 */
export const pageSections = defineType({
  name: "pageSections",
  title: "Sections",
  type: "array",
  of: sectionArrayMembers,
  options: { insertMenu: { filter: true } },
});
