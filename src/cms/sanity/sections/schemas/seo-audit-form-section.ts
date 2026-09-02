import { defineField, defineType } from "sanity";

/**
 * The SEO Audit form.
 *
 * Like the contact form and report download form, the field labels,
 * consent copy and validation wording are shared form wiring and stay in
 * Site settings under "SEO Audit form". Only the heading can differ per page.
 */
export const seoAuditFormSection = defineType({
  name: "seoAuditFormSection",
  title: "SEO Audit form",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description:
        "Optional. Overrides the shared heading in Site settings → SEO Audit form.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title ?? "SEO Audit form",
      subtitle: "SEO Audit form",
    }),
  },
});
