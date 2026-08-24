import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { pageMetadata } from "@/lib/page-metadata";
import { HOME_PAGE_SLUG, getPage, getPageSlugs } from "@/sanity/repositories/page";

/**
 * Every page document that is not served by a route of its own — /contact and
 * /newsroom today, and anything an editor creates tomorrow. Publishing a page
 * in the Studio is all it takes to put a new URL on the site: no route file,
 * no deploy.
 *
 * Four slugs are reserved, because a page document on one of them could never
 * be reached — Next resolves a static segment before this dynamic one:
 *
 * - `home` is served at `/`, and /home would be the same page at a second URL.
 * - `post` has its own route for the `?page=` pagination, which needs to 404
 *   on an out-of-range number rather than fall back to page one.
 * - `reports` and `studio` are the roots of /reports/[slug] and the Studio.
 *
 * Listing them keeps the prerender list honest and turns an editor's mistake
 * into a 404 they can see, rather than a page that silently shows the
 * hard-coded route instead of what they wrote.
 */
const RESERVED_SLUGS = new Set([HOME_PAGE_SLUG, "post", "reports", "studio"]);

export async function generateStaticParams() {
  const slugs = await getPageSlugs();

  return slugs
    .filter((slug) => !RESERVED_SLUGS.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;

  if (RESERVED_SLUGS.has(slug)) return {};

  const page = await getPage(slug);

  if (!page) return {};

  return pageMetadata(page, `/${slug}`, page.title);
}

export default async function DynamicPage(props: PageProps<"/[slug]">) {
  const { slug } = await props.params;

  if (RESERVED_SLUGS.has(slug)) notFound();

  const page = await getPage(slug);

  if (!page) notFound();

  return <ComposedPage sections={page.sections} />;
}
