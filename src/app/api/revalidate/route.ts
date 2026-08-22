import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { documentTag, isDocumentType } from "@/sanity/tags";

/**
 * Sanity webhook target.
 *
 * The site is fully prerendered and `client.ts` reads through the Sanity CDN in
 * production, so without this nothing an editor publishes would ever reach the
 * live site — the pages were built once and have no reason to rebuild.
 *
 * Set it up in https://www.sanity.io/manage -> API -> Webhooks:
 *
 *   URL      https://<domain>/api/revalidate
 *   Dataset  production
 *   Trigger  Create, Update, Delete
 *   Filter   _type in ["page","article","report","testimonialsSection","siteSettings"]
 *   Projection  {_type}
 *   HTTP method POST, API version v2026-08-22
 *   Secret   the same value as SANITY_REVALIDATE_SECRET
 *
 * The default projection sends the whole document, which works but wastes
 * payload on bodies and images; `{_type}` is all this handler reads.
 *
 * None of this applies locally: Sanity cannot post to `localhost`, so reads in
 * development bypass the data cache entirely instead — see `tagged` in
 * `src/sanity/tags.ts`.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    // Loud rather than silent: a missing secret means the site has quietly
    // stopped updating, which is exactly the failure this route exists to fix.
    console.error("SANITY_REVALIDATE_SECRET is not set");
    return new NextResponse("Revalidation is not configured", { status: 500 });
  }

  // `parseBody` verifies the signature header and then waits ~3s for Content
  // Lake to become consistent, so the regenerated pages read the new content
  // rather than racing the publish.
  const { body, isValidSignature } = await parseBody<{ _type?: string }>(
    req,
    secret,
  );

  // `null` means the signature header was missing entirely; `false` means it
  // did not match. Neither is a request we should act on.
  if (isValidSignature !== true) {
    return new NextResponse("Invalid signature", { status: 401 });
  }

  const type = body?._type;

  if (!type) {
    return new NextResponse("Bad request: body has no _type", { status: 400 });
  }

  // A type the site does not read yet — acknowledge it so Sanity does not
  // retry, but say plainly that nothing was invalidated.
  if (!isDocumentType(type)) {
    return NextResponse.json({ revalidated: false, type });
  }

  const tag = documentTag(type);

  // `{ expire: 0 }` rather than "max". "max" is stale-while-revalidate: the
  // first visitor after a publish still gets the *old* page and only triggers
  // the rebuild behind them. For an editor that is indistinguishable from the
  // site being broken — they publish, reload, and see the previous copy. Next
  // documents `{ expire: 0 }` as the form for webhooks that need the data gone
  // now; the cost is that one request blocks on a refetch.
  revalidateTag(tag, { expire: 0 });

  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
