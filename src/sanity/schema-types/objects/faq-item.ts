import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One question and its answer inside the FAQ accordion.
 *
 * The answer is Portable Text rather than a plain string so an editor can
 * break a long answer into paragraphs and cite a source inline. The styles
 * are deliberately narrower than `postBody` — an answer sitting inside an
 * accordion row has no business carrying headings or embedded media.
 */
export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({
      name: "question",
      type: "string",
      description: "The row label, shown whether or not the answer is open.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "url",
                    validation: (r) =>
                      r.required().uri({
                        scheme: ["http", "https", "mailto", "tel"],
                        allowRelative: true,
                      }),
                  },
                ],
              }),
            ],
          },
        }),
      ],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { title: "question" },
    prepare: ({ title }) => ({ title: title ?? "Untitled question" }),
  },
});
