import { client } from "../client";
import { sanityFetch } from "../live";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "../queries/page";
import { documentTags, uncached } from "../tags";
import type { PageData } from "../types";
import { normaliseSections, normaliseSeo } from "./sections";

/** The home page's document id/slug. */
export const HOME_PAGE_SLUG = "home";

/**
 * `testimonialsSection` and `newsroomArticle` are in the tag list because the
 * section projections dereference them — the testimonials block stores a
 * reference and follows it with `source->`, and the newsroom listing follows
 * its article list the same way. Tag only "page" and editing a testimonial
 * leaves the home page serving the old quotes forever: the webhook drops
 * `sanity:testimonialsSection`, this entry is not under that tag, and a tagged
 * read is stored with no expiry to age it out.
 */
export async function getPage(slug: string): Promise<PageData | null> {
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    stega: false,
    tags: documentTags("page", "testimonialsSection", "newsroomArticle"),
  });
  if (!page) return null;

  return {
    slug: page.slug ?? slug,
    title: page.title ?? "",
    seo: normaliseSeo(page.seo),
    sections: normaliseSections(page.sections),
  };
}

export async function getHomePage(): Promise<PageData | null> {
  return getPage(HOME_PAGE_SLUG);
}

/** Every page slug in the dataset, for `generateStaticParams` on /[slug].
 *  Reads uncached — see `uncached`. */
export async function getPageSlugs(): Promise<string[]> {
  return (await client.fetch(PAGE_SLUGS_QUERY, {}, uncached())).filter(
    (slug): slug is string => typeof slug === "string",
  );
}
