import { defineField, defineType } from "sanity";

import { sectionVisibilityField } from "../section-visibility-field";
import { sectionPreviewHelper } from "../section.schema";

/**
 * The contact form.
 *
 * Only the heading lives here. Everything else the form says — placeholders,
 * subject options, consent copy, validation wording — stays in Site settings
 * under "Contact form", because it is form *wiring* rather than page content:
 * it is keyed to field names that exist in code, and an editor who dropped a
 * second form onto another page should not have to retype thirty strings to
 * get a working one.
 */
export const contactFormSection = defineType({
  name: "contactFormSection",
  title: "Contact form",
  type: "object",
  fields: [
    sectionVisibilityField,
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description: "Sits above the form, e.g. “Ready to get started?”.",
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "title", enabled: "enabled" },
    prepare: ({ title, enabled }) => ({
      title: title ?? "Contact form",
      subtitle: "Contact form",
    }),
  },
});
