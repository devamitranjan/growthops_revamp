import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComposedPage } from "@/components/site/composed-page";
import { pageMetadata } from "@/lib/page-metadata";
import { HOME_PAGE_PATH } from "@/content/domain/page/page.repository";
import { pageRepository } from "@/content/repositories";

/**
 * Every page document that is not served by a route of its own — /contact and
 * /newsroom today, and anything an editor creates tomorrow. Publishing a page
 * in the Studio is all it takes to put a new URL on the site: no route file,
 * no deploy.
 *
 * A catch-all rather than a single `[slug]` because a page's URL is composed:
 * a page's ancestors compose its path, so a
 * page slugged `seo` under `services` is served here at /services/seo.
 * The `PageRepository` implementation resolves the path back to a document.
 *
 * Five *first* segments are reserved, because a page underneath one could
 * never be reached — Next resolves a static segment before this dynamic one:
 *
 * - `home` is served at `/`, and /home would be the same page at a second URL.
 * - `post` has its own route for the `?page=` pagination, which needs to 404
 *   on an out-of-range number rather than fall back to page one.
 * - `reports`, `studio` and `faq-preview` are the roots of /reports/[slug],
 *   the Studio, and the FAQ preview route.
 *
 * The check is on the first segment alone: /post/anything and
 * /reports/anything belong to those routes as much as their roots do.
 *
 * Listing them keeps the prerender list honest and turns an editor's mistake
 * into a 404 they can see, rather than a page that silently shows the
 * hard-coded route instead of what they wrote.
 */
const RESERVED_SEGMENTS = new Set([
  HOME_PAGE_PATH,
  "post",
  "reports",
  "studio",
  "faq-preview",
]);

/** The path this route serves, or null when a static route owns it. */
function resolvePath(segments: string[]): string | null {
  if (!segments.length || RESERVED_SEGMENTS.has(segments[0])) return null;

  return segments.join("/");
}

export async function generateStaticParams() {
  const paths = await pageRepository.getPaths();

  return paths
    .map((path) => path.split("/"))
    .filter((segments) => resolvePath(segments) !== null)
    .map((segments) => ({ slug: segments }));
}

export async function generateMetadata(
  props: PageProps<"/[...slug]">,
): Promise<Metadata> {
  const path = resolvePath((await props.params).slug);

  if (!path) return {};

  const page = await pageRepository.getByPath(path);

  if (!page) return {};

  return pageMetadata(page, `/${path}`, page.title);
}

export default async function DynamicPage(props: PageProps<"/[...slug]">) {
  const path = resolvePath((await props.params).slug);

  if (!path) notFound();

  const page = await pageRepository.getByPath(path);

  if (!page) notFound();

  return <ComposedPage sections={page.sections} />;
}
