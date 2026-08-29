import type { Metadata } from "next";

import type { SeoMetadata } from "@/content/types";

/**
 * Metadata for a CMS-composed page.
 *
 * Only fields the editor actually filled in are returned. An empty `seo` group
 * has to fall *through* to the site defaults in the root layout, not overwrite
 * them with empty strings — which is also why `fallbackTitle` is a parameter
 * rather than always `page.title`: an editor page with no meta title is better
 * off titled after itself, but the home page is better off keeping the site's
 * default title than being retitled "Home".
 */
export function pageMetadata(
  page: { seo?: SeoMetadata },
  canonical: string,
  fallbackTitle?: string,
): Metadata {
  const { title, description, ogImage } = page.seo ?? {};

  return {
    ...(title || fallbackTitle ? { title: title || fallbackTitle } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical },
    ...(ogImage
      ? { openGraph: { images: [ogImage] }, twitter: { images: [ogImage] } }
      : {}),
  };
}
