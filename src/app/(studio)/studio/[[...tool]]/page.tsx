import Studio from "./studio";

/**
 * `metadata` from next-sanity already sets `robots: "noindex"` and
 * `referrer: "same-origin"`; `viewport` sets the mobile viewport the Studio
 * expects. Re-exported rather than hand-written so they track the package.
 */
export { metadata, viewport } from "next-sanity/studio";

/**
 * The Studio is a client-side app that routes itself through the optional
 * catch-all segment, so there is nothing per-request to render on the server.
 * Valid in Next 16 because Cache Components is not enabled — see
 * `next/dist/docs/01-app/02-guides/caching-without-cache-components.md`.
 */
export const dynamic = "force-static";

export default function StudioPage() {
  return <Studio />;
}
