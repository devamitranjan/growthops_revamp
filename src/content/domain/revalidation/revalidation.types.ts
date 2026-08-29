import type { NextRequest } from "next/server";

/**
 * What a CMS publish webhook tells the site.
 *
 * The route at `/api/revalidate` owes Next.js a `revalidateTag` call and an
 * HTTP status; everything else — reading the signature, verifying it, waiting
 * for the CMS to become consistent, and working out which cache tag the change
 * touched — is CMS-specific and lives in the adapter. This is the shape the
 * two halves meet in.
 *
 * Every case is spelled out rather than collapsed into `null`, because the
 * route answers each one with a different status code, and an adapter that
 * cannot tell "no secret configured" from "bad signature" would cost the site
 * the one signal that says it has quietly stopped updating.
 */
export type ContentWebhook =
  /** No signing secret is configured. The site has silently stopped
   *  revalidating; the route says so with a 500 and logs it. */
  | { status: "unconfigured" }
  /** The signature was missing or did not match — not a request to act on. */
  | { status: "invalid-signature" }
  /** Well-signed but unreadable: the payload did not name a content type. */
  | { status: "bad-request"; message: string }
  /** A content type the site does not read. Acknowledged so the CMS stops
   *  retrying, but nothing was invalidated. */
  | { status: "ignored"; contentType: string }
  /** Invalidate `tag`. */
  | { status: "ok"; contentType: string; tag: string };

/**
 * The adapter's half of `/api/revalidate`: turn a webhook request into one of
 * the cases above. Implementations verify the signature themselves.
 *
 * `NextRequest` rather than `Request` because that is what the route hands
 * over and what a signature check needs to read raw. Depending on Next.js here
 * is not the coupling this architecture is guarding against — the whole
 * application is Next.js; the CMS is the part that has to be replaceable.
 */
export type ContentWebhookParser = (
  request: NextRequest,
) => Promise<ContentWebhook>;
