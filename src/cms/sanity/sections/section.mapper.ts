import type { SeoMetadata } from "@/content/models/seo";
import type { IFaqData, TeamMember } from "@/content/sections/shared.types";
import type {
  PageSection,
  PageSectionType,
} from "@/content/sections/section.types";
import { mapRichText } from "../rich-text/rich-text.mapper";

/**
 * The page builder's translation layer: a Sanity section becomes a
 * `PageSection`.
 *
 * Both composed document types — `page` and `report` — read their sections
 * through the same projections, so they need the same adjustments on the way
 * out, and neither the routes nor the components should know about any of them.
 *
 * This is a mapper, not a repository: pure functions over already-fetched
 * data, importing nothing but types and other mappers. That matters because it
 * means it carries no token and could be run anywhere, client included.
 */

/**
 * Sanity's section type names, and what the application calls them.
 *
 * The one place both vocabularies appear. A Sanity `_type` is a schema name an
 * editor never sees and a migration would be painful to change; the domain
 * `type` is what `src/components/site/section-renderer.tsx` switches on. Keeping
 * them apart is what lets a Contentful adapter map *its* content-type ids onto
 * the same nineteen names without a single edit to the renderer.
 *
 * `satisfies` rather than a plain object so a typo, or a domain name that no
 * longer exists on `PageSection`, is a compile error here rather than a
 * section that silently stops rendering.
 */
const SECTION_TYPES = {
  heroSection: "hero",
  servicesSection: "services",
  growthSpurtsSection: "growthSpurts",
  unrivaledGrowthSection: "unrivaledGrowth",
  caseStudySection: "caseStudy",
  articleCardsSection: "articleCards",
  testimonialsBlock: "testimonials",
  growthValidationSection: "growthValidation",
  cultureValidationSection: "cultureValidation",
  teamSection: "team",
  creativeTechSection: "creativeTech",
  contentRailSection: "contentRail",
  richTextSection: "richText",
  faqSection: "faq",
  contactFormSection: "contactForm",
  postListingSection: "postListing",
  newsroomListingSection: "newsroomListing",
  reportOverviewSection: "reportOverview",
  downloadReportSection: "downloadReport",
} as const satisfies Record<string, PageSectionType>;

type SanitySectionType = keyof typeof SECTION_TYPES;

const isKnownSection = (type: unknown): type is SanitySectionType =>
  typeof type === "string" && type in SECTION_TYPES;

type TeamSection = Extract<PageSection, { type: "team" }>;
type TestimonialsSection = Extract<PageSection, { type: "testimonials" }>;

/** One section as GROQ returns it: the two Sanity keys, plus whatever the
 *  conditional projection for that `_type` selected. */
type RawSection = {
  _key?: string;
  _type?: string;
} & Record<string, unknown>;

// ---------------------------------------------------------------------------
// Per-section adjustments
// ---------------------------------------------------------------------------

/** Sanity cannot nest arrays, so `batches` is stored as `{ members: [...] }[]`
 *  and the team grid wants `TeamMember[][]`. Unwrap it here rather than making
 *  every consumer know about the wrapper. */
type RawBatch = { members?: TeamMember[] | null } | null;

function unwrapBatches(batches: unknown): TeamMember[][] {
  if (!Array.isArray(batches)) return [];

  return (batches as RawBatch[])
    .map((batch) => batch?.members ?? [])
    .filter((members) => members.length > 0);
}

/**
 * The three narrowings the branches below need.
 *
 * `unknown` in, a value the domain type actually allows out. GROQ answers
 * `null` for an unfilled field and the domain's contract is an optional key,
 * so the difference between "empty" and "absent" survives — a component
 * checking `eyebrow &&` sees the same thing either way, but the type no longer
 * lies about which one it is holding.
 */
const text = (value: unknown) => (typeof value === "string" ? value : "");

const optionalText = (value: unknown) =>
  typeof value === "string" ? value : undefined;

const optionalFlag = (value: unknown) =>
  typeof value === "boolean" ? value : undefined;

/** FAQ answers arrive as Portable Text and leave as `RichText`. */
function mapFaqItems(items: unknown): IFaqData["items"] {
  if (!Array.isArray(items)) return [];

  return items.map((item, index) => {
    const row = (item ?? {}) as Record<string, unknown>;

    return {
      id: typeof row.id === "string" ? row.id : `faq-${index}`,
      question: text(row.question),
      answer: mapRichText(row.answer),
    };
  });
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

/**
 * One section, or `null` where there is nothing renderable.
 *
 * Two things produce a `null`, and both are states the CMS can genuinely be
 * in. A `_type` this deploy does not know means the Studio is ahead of the
 * build — an editor added a section that ships next release. A testimonials
 * block whose reference no longer resolves means the shared document was
 * deleted out from under it. Dropping the section costs an empty slot on one
 * page; letting either through costs the page.
 */
function mapSection(raw: RawSection, index: number): PageSection | null {
  if (!isKnownSection(raw._type)) return null;

  const type = SECTION_TYPES[raw._type];
  const key = raw._key ?? `${type}-${index}`;

  // Everything the projection selected, with the two Sanity keys taken off.
  // The GROQ in `section.queries.ts` already shapes the rest to match the
  // domain — images resolved to URLs, array keys projected as `id` — so for
  // most sections the rename is the whole translation. The four below need
  // more than that, and say so explicitly.
  const fields: Record<string, unknown> = { ...raw };
  delete fields._type;
  delete fields._key;

  switch (type) {
    case "team":
      return {
        type,
        key,
        title: text(fields.title),
        batches: unwrapBatches(fields.batches),
        // The trailing card is optional; GROQ says so with a `null`.
        highlight:
          (fields.highlight as TeamSection["highlight"] | null) ?? undefined,
      };

    case "faq":
      return {
        type,
        key,
        title: text(fields.title),
        eyebrow: optionalText(fields.eyebrow),
        items: mapFaqItems(fields.items),
        openFirst: optionalFlag(fields.openFirst),
      };

    case "richText":
      // Portable Text in, `RichText` out — the same conversion the article
      // body gets, because it is the same body type.
      return {
        type,
        key,
        title: optionalText(fields.title),
        content: mapRichText(fields.content),
      };

    case "testimonials": {
      const data = fields.data as TestimonialsSection["data"] | null | undefined;

      // A dangling reference dereferences to null; a block with no quotes is
      // not a block.
      if (!data) return null;

      return { type, key, data };
    }

    default:
      // The remaining fifteen are a straight rename of the two Sanity keys.
      // The cast is the seam TypeGen guards from the other side: the GROQ that
      // produced `fields` is type-checked against the schema, and a projection
      // that stops matching `PageSection` shows up as a render-time gap rather
      // than here. See `README.md` -> "Adding a section".
      return { type, key, ...fields } as PageSection;
  }
}

export function mapSections(sections: unknown): PageSection[] {
  if (!Array.isArray(sections)) return [];

  return sections
    .map((section, index) => mapSection((section ?? {}) as RawSection, index))
    .filter((section): section is PageSection => section !== null);
}

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export function mapSeo(
  seo: {
    jsonld?: Array<{ schema: string }>;
  } | null | undefined,
): SeoMetadata | undefined {
  if (!seo) return undefined;

  return {
    jsonld: seo.jsonld,
  };
}
