/**
 * Connection constants, safe to import from anywhere — browser, server, and
 * the Sanity CLI (which loads `sanity.config.ts` outside Next.js, so the
 * `NEXT_PUBLIC_*` vars are not inlined and the literal fallbacks are used).
 *
 * These three values are public by design. The read token is not; it lives in
 * `client.ts`, which is server-only.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "zy334k24";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pin this to the date the queries were written; bump it deliberately. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-22";
