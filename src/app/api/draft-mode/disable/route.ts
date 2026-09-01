import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Turns draft mode back off and sends the browser to the home page.
 *
 * Nothing CMS-specific happens here — the cookie is Next's, and dropping it is
 * all there is to do — so unlike its sibling this route needs no binding
 * through `src/content`.
 *
 * It is the way out of a preview session that has escaped the Studio: an
 * editor who opened a preview link in a tab of their own is otherwise stuck
 * seeing drafts until the browser closes. Reach it by typing the URL or from a
 * form — never from a `<Link>`, which Next prefetches, and which would clear
 * the cookie before anyone clicked.
 */
export async function GET() {
  (await draftMode()).disable();

  redirect("/");
}
