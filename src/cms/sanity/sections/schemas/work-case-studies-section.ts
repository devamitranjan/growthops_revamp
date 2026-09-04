import { defineArrayMember, defineField, defineType } from "sanity";
import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

const DEFAULT_ITEMS_PER_PAGE = 6;
const MIN_ITEMS_PER_PAGE = 1;
const MAX_ITEMS_PER_PAGE = 50;

export const workCaseStudiesSection = defineType({
  name: "workCaseStudiesSection",
  title: "Work - Case Studies",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "categories",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Define the filter categories (e.g., 'Performance Marketing & Analytics'). These will appear in the filter UI and should match item categories.",
    }),
    defineField({
      name: "itemsPerPage",
      title: "Items per page",
      type: "number",
      description: `How many case studies one page shows before pagination takes over. Leave empty for ${DEFAULT_ITEMS_PER_PAGE}.`,
      initialValue: DEFAULT_ITEMS_PER_PAGE,
      validation: (r) =>
        r.integer().min(MIN_ITEMS_PER_PAGE).max(MAX_ITEMS_PER_PAGE),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "workCaseStudy" }],
        }),
      ],
      validation: (r) => r.required().min(1),
      description:
        "Select the work case study documents to include. Their order here controls the list order on the page.",
    }),
  ],
  preview: {
    select: {
      count: "items.length",
      itemsPerPage: "itemsPerPage",
      enabled: "enabled",
    },
    prepare: ({ count, itemsPerPage }) => ({
      title: "Work - Case Studies",
      subtitle: `${count ?? 0} items · ${itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE} per page`,
    }),
  },
});
