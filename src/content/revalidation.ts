import { parseSanityWebhook } from "@/cms/sanity/revalidate";
import type { ContentWebhookParser } from "./domain/revalidation/revalidation.types";

/**
 * The composition point for publish webhooks — see `repositories.ts` for the
 * rule this follows.
 *
 * `/api/revalidate` calls this, gets back a plain result, and does the two
 * Next.js things it owes: `revalidateTag` and a status code. Which CMS posted
 * to it, how the signature is verified, and how a payload becomes a cache tag
 * are all behind this one binding.
 *
 * **SERVER ONLY**, guarded one level down: `cms/sanity/revalidate.ts` reads
 * `SANITY_REVALIDATE_SECRET` and starts with `import "server-only"`, which is
 * what fails the build if a client module reaches this one. An adapter for
 * another CMS must keep that first line.
 */
export const parseContentWebhook: ContentWebhookParser = parseSanityWebhook;

export type { ContentWebhook } from "./domain/revalidation/revalidation.types";
