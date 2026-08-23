"use client";

import { createClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { useLiveMode } from "@/sanity/loader";

/**
 * Browser-safe by construction: no token, and none is needed. Live mode does
 * not query Sanity from the browser — inside the Presentation tool the Studio
 * pushes query results over postMessage — so this client exists only to supply
 * project/dataset identity and the stega settings used to encode click-to-edit
 * markers into what arrives.
 *
 * Mounted behind `draftMode()` in the site layout, so it costs regular
 * visitors nothing.
 */
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: { enabled: true, studioUrl: "/studio" },
});

export function LiveMode() {
  useLiveMode({ client });
  return null;
}
