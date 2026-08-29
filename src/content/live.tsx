import { SanityLive } from "@/cms/sanity/live";

/**
 * The CMS's live-update channel, mounted once in the site layout.
 *
 * Composition, like `repositories.ts`: the layout should not have to know that
 * keeping an open page in sync is Sanity's `<SanityLive />` holding an SSE
 * connection to the Live Content API. A CMS without that capability supplies a
 * component that renders `null`, and the layout does not change.
 *
 * Why it is needed at all: `revalidateTag` drops the server cache, but a
 * browser already showing the page has no reason to ask again. This is the
 * half that tells it to.
 */
export function ContentLive() {
  return <SanityLive />;
}
