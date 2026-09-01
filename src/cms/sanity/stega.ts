import { stegaClean } from "@sanity/client/stega";

/**
 * Stega: what it buys, what it breaks, and the one rule that keeps both
 * straight.
 *
 * Stega encodes a document id and field path into every string a query
 * returns, using Unicode characters that render as nothing. That is what makes
 * click-to-edit work — `<VisualEditing />` reads the payload out of the text
 * node under the cursor and jumps the Studio to that field. It is also why
 * `"right" === row.direction` starts answering `false`: the string is no longer
 * the string.
 *
 * So it is enabled narrowly, and cleaned deliberately.
 *
 * **Where it is on.** Two reads: `PAGE_QUERY` and `REPORT_QUERY`. They are the
 * documents Presentation previews and the only ones whose output is rendered
 * as visible prose. Every other read passes `stega: false`, and two of them
 * must: `PAGE_INDEX_QUERY` and the `generateStaticParams` slug lists return
 * `_id`s, slugs and parent refs that are compared, keyed and joined into
 * paths. Encoded characters there do not render wrong, they miss — a lookup
 * that finds nothing, presenting as a 404 on a page that exists.
 *
 * **When it is on.** Only while draft mode is on, which means only inside a
 * preview. Published HTML never carries a stega character. That switch is
 * `stegaEnabled` in `live.ts`, which is where the rest of the fetch policy
 * lives; this module stays free of `next/headers` so it remains what the
 * mappers importing it need — pure functions that could run anywhere.
 */

/**
 * The field names in a stega'd read whose values are not display prose.
 *
 * Everything here is a value the application *uses* rather than shows: a URL
 * it fetches, an id it keys on, a word it compares. `@sanity/client`'s own
 * filter already drops most of them — it skips anything that parses as a URL
 * or a date, anything under a key starting with `_` or ending in `Id`, and a
 * denylist that includes `href`, `id`, `url`, `slug` and `type`. This list is
 * not redundant with it: `direction`, `category`, `categories`, `overlayColor`,
 * `style`, `listItem` and `marks` all fall through that filter and all break
 * something, and relying on a third-party heuristic to keep covering the rest
 * is not a guarantee worth taking.
 *
 * Grouped by why they are here, because the reason is the thing to check
 * against when a section is added.
 */
const NON_PROSE_KEYS = new Set([
  // Resolved asset URLs and /public paths — `src` attributes, not copy.
  "src",
  "imgSrc",
  "imageSrc",
  "image",
  "posterSrc",
  "bg",
  "videoSrc",
  "previewVideo",
  "video",
  "audioSrc",

  // Links and link attributes.
  "href",
  "sectionLink",
  "target",
  "rel",

  // Identity. `"id": _key` is a React key and a DOM id; `slug` composes URLs.
  "id",
  "_key",
  "_type",
  "slug",

  // Enum-ish: values the code compares against literals rather than renders.
  // `direction` is read as `row.direction === "right"` in creative-tech;
  // `category` is matched against `categories` to filter the testimonial
  // carousel; `style`, `listItem` and `marks` are how `rich-text.mapper.ts`
  // decides heading level, list style and bold/italic/link.
  "direction",
  "category",
  "categories",
  "style",
  "listItem",
  "marks",

  // Presentation values passed to CSS, not to a text node.
  "overlayColor",

  // Real dates, parsed rather than printed — `newsroom-card.tsx` hands
  // `publishedAt` to `new Date()`, which a stega'd string turns into an
  // Invalid Date. Deliberately *not* `date` on an article teaser: that field
  // is free text ("October 2024") rendered as-is, so it is prose and keeps its
  // edit pointer.
  "publishDate",
  "publishedAt",
]);

/**
 * A fetched value with every non-prose string cleaned, at any depth.
 *
 * A walk rather than a per-field call at each use, because the sections
 * payload is nineteen differently shaped objects and the fifteen that need no
 * other adjustment are spread wholesale into their domain type — there is no
 * per-field code to hang a `stegaClean` on. Matching by field name works
 * because the projections name these fields consistently; that is a property
 * of `section.queries.ts` worth keeping.
 *
 * A no-op on a read that was not stega'd, so the mappers do not have to know
 * which reads are and stay pure functions over whatever they are handed.
 */
export function cleanNonProse<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cleanNonProse(item)) as T;
  }

  if (value === null || typeof value !== "object") return value;

  const cleaned: Record<string, unknown> = {};

  for (const [key, item] of Object.entries(value)) {
    cleaned[key] = NON_PROSE_KEYS.has(key)
      ? stegaClean(item)
      : cleanNonProse(item);
  }

  return cleaned as T;
}

export { stegaClean };
