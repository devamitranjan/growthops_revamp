import type { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";

import type { ContentWebhook } from "@/content/domain/revalidation/revalidation.types";
import { documentTag, isDocumentType } from "./tags";

/**
 * The Sanity half of `/api/revalidate`.
 *
 * Everything Sanity-shaped about a publish webhook lives here — the signature
 * scheme, the `_type` field the payload carries, and the mapping from that to
 * a cache tag. The route keeps only what it owes Next.js: a `revalidateTag`
 * call and a status code.
 *
 * The site is fully prerendered and reads through the Sanity CDN in
 * production, so without this nothing an editor publishes would ever reach the
 * live site — the pages were built once and have no reason to rebuild.
 *
 * Set it up in https://www.sanity.io/manage -> API -> Webhooks:
 *
 *   URL      https://<domain>/api/revalidate
 *   Dataset  production
 *   Trigger  Create, Update, Delete
 *   Filter   _type in ["page","article","report","newsroomArticle",
 *              "testimonialsSection","siteSettings"]
 *   Projection  {_type}
 *   HTTP method POST, API version v2026-08-22
 *   Secret   the same value as SANITY_REVALIDATE_SECRET
 *
 * The default projection sends the whole document, which works but wastes
 * payload on bodies and images; `{_type}` is all this reads.
 *
 * None of this applies locally: Sanity cannot post to `localhost`, so a Studio
 * edit in development reaches the site through `<SanityLive />` instead.
 */
export async function parseSanityWebhook(
  request: NextRequest,
): Promise<ContentWebhook> {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) return { status: "unconfigured" };

  // `parseBody` verifies the signature header and then waits ~3s for Content
  // Lake to become consistent, so the regenerated pages read the new content
  // rather than racing the publish.
  const { body, isValidSignature } = await parseBody<{ _type?: string }>(
    request,
    secret,
  );

  // `null` means the signature header was missing entirely; `false` means it
  // did not match. Neither is a request to act on.
  if (isValidSignature !== true) return { status: "invalid-signature" };

  const type = body?._type;

  if (!type) {
    return { status: "bad-request", message: "body has no _type" };
  }

  // A type the site does not read yet.
  if (!isDocumentType(type)) {
    return { status: "ignored", contentType: type };
  }

  return { status: "ok", contentType: type, tag: documentTag(type) };
}
