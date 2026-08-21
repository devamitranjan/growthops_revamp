/**
 * Sanity connection config.
 *
 * The client is not wired up yet — no Sanity package is installed. This file
 * exists so every consumer already imports connection details from one place;
 * turning the CMS on means editing this file plus the bodies of
 * `repositories/*`, and nothing else.
 *
 * The credentials in `.env.local` are already provisioned. To activate:
 *
 *   1. pnpm add next-sanity @sanity/image-url
 *   2. uncomment the block below
 *   3. replace the fixture reads in `repositories/*` with `client.fetch(...)`
 *
 *   import { createClient } from "next-sanity";
 *
 *   export const client = createClient({
 *     projectId,
 *     dataset,
 *     apiVersion,
 *     useCdn: process.env.NODE_ENV === "production",
 *     perspective: "published",
 *     // Server-only: this project returns an empty result set to
 *     // unauthenticated callers. Never expose it to the browser, which is why
 *     // repositories must stay server-side.
 *     token: process.env.SANITY_API_READ_TOKEN,
 *   });
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/** Pin this to the date the queries were written; bump it deliberately. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-22";
