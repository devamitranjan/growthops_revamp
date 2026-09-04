import { defineField } from "sanity";

export const sectionVisibilityField = defineField({
  name: "enabled",
  type: "boolean",
  title: "Enabled",
  description: "Show or hide this section on the page",
  initialValue: true,
  options: {
    layout: "checkbox",
  },
});
