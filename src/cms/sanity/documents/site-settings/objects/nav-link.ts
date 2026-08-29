import { defineArrayMember, defineField, defineType } from "sanity";

export const navChild = defineType({
  name: "navChild",
  title: "Sub-link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Link", type: "string", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const navLink = defineType({
  name: "navLink",
  title: "Navigation item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Leave empty for a dropdown that is not itself a link.",
    }),
    defineField({
      name: "children",
      title: "Dropdown items",
      type: "array",
      of: [defineArrayMember({ type: "navChild" })],
    }),
  ],
  preview: {
    select: { title: "label", href: "href", count: "children.length" },
    prepare: ({ title, href, count }) => ({
      title,
      subtitle: count ? `${count} sub-links` : (href ?? "no link"),
    }),
  },
});
