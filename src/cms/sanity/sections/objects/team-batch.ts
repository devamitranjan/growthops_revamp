import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * One rotation step of the team grid.
 *
 * This wrapper exists because Sanity cannot nest arrays directly, and the grid
 * needs `TeamMember[][]`. Every batch must hold the same number of members —
 * each column cycles through the batches in lockstep, so a short batch leaves
 * a hole.
 */
export const teamBatch = defineType({
  name: "teamBatch",
  title: "Batch",
  type: "object",
  fields: [
    defineField({
      name: "members",
      type: "array",
      of: [defineArrayMember({ type: "teamMember" })],
      validation: (r) => r.required().min(1),
    }),
  ],
  preview: {
    select: { count: "members.length", first: "members.0.name" },
    prepare: ({ count, first }) => ({
      title: first ? `${first} +${(count ?? 1) - 1} more` : "Empty batch",
      subtitle: `${count ?? 0} members`,
    }),
  },
});
