import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

/**
 * "In This Report": the numbered list of what a report covers, beside a
 * carousel of its pages.
 *
 * The numbering is generated from the list order, so the highlights carry no
 * number of their own — reordering them renumbers the page.
 */
export const reportOverviewSection = defineType({
  name: "reportOverviewSection",
  title: "Report overview",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "highlights",
      title: "In this report",
      type: "array",
      of: [defineArrayMember({ type: "reportHighlight" })],
    }),
    defineField({
      name: "slides",
      title: "Carousel pages",
      type: "array",
      of: [defineArrayMember({ type: "reportSlide" })],
    }),
  ],
  preview: {
    select: { count: "highlights.length", media: "slides.0.image", enabled: "enabled" },
    prepare: ({ count, media, enabled }) => ({
      title: "Report overview",
      subtitle: `${count ?? 0} highlights`,
      media,
    }),
  },
});
