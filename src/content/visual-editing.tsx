import { draftMode } from "next/headers";

import { SanityVisualEditing } from "@/cms/sanity/visual-editing";

/**
 * The click-to-edit overlay, mounted once in the site layout beside
 * `<ContentLive />` — and, like it, composition rather than an import the
 * layout owns. The layout says "show the editing affordances if the CMS has
 * any"; a CMS without visual editing supplies a component that renders `null`.
 *
 * The draft-mode check belongs here rather than in the layout for the same
 * reason. Whether the overlay is worth mounting is a CMS question — it is
 * useless without stega-encoded strings to attach itself to, and those only
 * exist while draft mode is on — so the layout should not have to know to ask
 * it. Keeping it here also keeps the overlay's JavaScript off public traffic.
 *
 * Reading `draftMode().isEnabled` does not opt the route out of static
 * rendering on Next 16 — see the note in `cms/sanity/live.ts` for why, and for
 * the build output that confirms it.
 */
export async function ContentVisualEditing() {
  const { isEnabled } = await draftMode();

  if (!isEnabled) return null;

  return <SanityVisualEditing />;
}
