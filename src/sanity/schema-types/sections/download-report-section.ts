import { defineField, defineType } from "sanity";

/**
 * The gated download form at the foot of a report.
 *
 * Like the contact form, the field labels, consent copy and validation wording
 * are shared form wiring and stay in Site settings under "Report download
 * form" — every report asks for the same five details, and keeping them in one
 * place means a change to the privacy link is one edit rather than one per
 * report. Only the heading can differ per page.
 */
export const downloadReportSection = defineType({
  name: "downloadReportSection",
  title: "Report download form",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
      description:
        "Optional. Overrides the shared heading in Site settings → Report download form.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({
      title: title ?? "Report download form",
      subtitle: "Report download form",
    }),
  },
});
