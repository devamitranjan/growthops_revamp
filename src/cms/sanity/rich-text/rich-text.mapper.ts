import type {
  RichText,
  RichTextList,
  RichTextListItem,
  RichTextListStyle,
  RichTextNode,
  RichTextSpan,
} from "@/content/models/rich-text";

/**
 * Portable Text -> `RichText`.
 *
 * Three things happen here, and each one is a Sanity shape the application
 * should never have to know about:
 *
 * 1. **Lists become lists.** Portable Text has no list container — a list is a
 *    run of sibling blocks that happen to share a `listItem` value, with
 *    nesting expressed as a `level` number rather than as containment. The
 *    grouping below turns that run into one node with items, so a renderer
 *    emits `<ul>` from a `switch` rather than from a look-ahead.
 * 2. **Marks are resolved.** A span carries mark *ids*; the annotation they
 *    point at lives in a per-block `markDefs` table. Every span comes out of
 *    here with its own `bold` / `italic` / `href`, so nothing downstream
 *    dereferences anything.
 * 3. **`_type` / `_key` are translated** into `type` / `key`.
 *
 * Everything it does not recognise is dropped rather than rendered blank: a
 * body written against a newer schema costs a missing block, not a crash.
 */

// ---------------------------------------------------------------------------
// The shapes GROQ hands back
// ---------------------------------------------------------------------------

/**
 * These describe the projections in `documents/article/article.queries.ts` and
 * the `answer` field in `sections/section.queries.ts`, not the raw documents:
 * `postImage` is already flattened to a URL plus intrinsic dimensions by the
 * time it gets here.
 *
 * Written out rather than imported from `generated/sanity.types.ts` because
 * the article projection spreads `...`, which TypeGen resolves to a union of
 * every member of the body array — accurate, unreadable, and re-derived on
 * every `pnpm typegen`. The narrowing below does not trust these anyway.
 */
interface SanityMarkDef {
  _key?: string;
  _type?: string;
  href?: string;
}

interface SanitySpan {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
}

interface SanityBlock {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  markDefs?: SanityMarkDef[] | null;
  children?: SanitySpan[] | null;
}

/** Anything that can sit in a body array: a text block or one of the custom
 *  objects registered on it. */
type SanityContentBlock = SanityBlock & Record<string, unknown>;

// ---------------------------------------------------------------------------
// Spans
// ---------------------------------------------------------------------------

const HEADING_LEVELS: Record<string, 2 | 3 | 4 | 5> = {
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
};

const LIST_STYLES: Record<string, RichTextListStyle> = {
  bullet: "bullet",
  number: "number",
  statements: "statements",
};

/**
 * One block's children, with every mark resolved onto the span carrying it.
 *
 * Non-span children are skipped: the schema registers no inline objects, and a
 * future one would need a node of its own here rather than a silent
 * stringification. Empty-text spans are *kept* — the article renderer decides
 * "this paragraph is a lead-in label" by asking whether every span is bold,
 * and dropping empties would change that answer.
 */
function mapSpans(block: SanityBlock): RichTextSpan[] {
  const markDefs = block.markDefs ?? [];

  return (block.children ?? [])
    .filter((child) => child?._type === "span")
    .map((child) => {
      const marks = child.marks ?? [];

      const link = marks
        .map((mark) => markDefs.find((def) => def?._key === mark))
        .find((def) => def?._type === "link");

      const span: RichTextSpan = { text: child.text ?? "" };

      if (marks.includes("strong")) span.bold = true;
      if (marks.includes("em")) span.italic = true;
      if (link?.href) span.href = link.href;

      return span;
    });
}

// ---------------------------------------------------------------------------
// Lists
// ---------------------------------------------------------------------------

const isListBlock = (block: SanityContentBlock) =>
  block._type === "block" && typeof block.listItem === "string";

const levelOf = (block: SanityBlock) =>
  typeof block.level === "number" && block.level > 0 ? block.level : 1;

const styleOf = (block: SanityBlock): RichTextListStyle =>
  LIST_STYLES[block.listItem ?? ""] ?? "bullet";

/**
 * A run of consecutive list blocks, grouped into nested lists.
 *
 * The depth is taken from the first block rather than from the recursion
 * counter, so content that skips a level — level 1 followed by level 3, which
 * the Studio will not produce but an API write can — nests one step instead of
 * looping or vanishing. A change of list style at the same level starts a new
 * list, the way the markup has to.
 */
function groupLists(run: SanityContentBlock[]): RichTextList[] {
  if (!run.length) return [];

  const depth = levelOf(run[0]);
  const lists: RichTextList[] = [];

  let index = 0;

  while (index < run.length) {
    const style = styleOf(run[index]);
    const items: RichTextListItem[] = [];

    while (
      index < run.length &&
      levelOf(run[index]) <= depth &&
      styleOf(run[index]) === style
    ) {
      const block = run[index];
      index += 1;

      // Everything deeper that follows this item belongs to it.
      const nestedStart = index;
      while (index < run.length && levelOf(run[index]) > depth) index += 1;

      items.push({
        key: block._key ?? `item-${items.length}`,
        spans: mapSpans(block),
        children: groupLists(run.slice(nestedStart, index)),
      });
    }

    // A style change at the same depth ends the list and opens the next one;
    // if the head of the run matched neither, drop it rather than spin.
    if (!items.length) {
      index += 1;
      continue;
    }

    lists.push({
      type: "list",
      key: items[0].key,
      style,
      items,
    });
  }

  return lists;
}

// ---------------------------------------------------------------------------
// Blocks
// ---------------------------------------------------------------------------

function mapTextBlock(
  block: SanityBlock,
  index: number,
): RichTextNode | null {
  const key = block._key ?? `block-${index}`;
  const spans = mapSpans(block);
  const level = HEADING_LEVELS[block.style ?? ""];

  if (level) return { type: "heading", key, level, spans };

  // Any other style — `normal`, or one the schema stops offering later —
  // renders as running copy, which is what the Sanity renderer did too.
  return { type: "paragraph", key, spans };
}

function mapImageBlock(
  block: SanityContentBlock,
  index: number,
): RichTextNode | null {
  const src = typeof block.src === "string" ? block.src : "";

  // An image object with no asset and no legacy path has nothing to render.
  if (!src) return null;

  return {
    type: "image",
    key: (block._key as string) ?? `image-${index}`,
    image: {
      src,
      alt: typeof block.alt === "string" ? block.alt : "",
      width: typeof block.width === "number" ? block.width : undefined,
      height: typeof block.height === "number" ? block.height : undefined,
    },
    ...(typeof block.caption === "string" && block.caption
      ? { caption: block.caption }
      : {}),
  };
}

function mapQuoteBlock(
  block: SanityContentBlock,
  index: number,
): RichTextNode | null {
  const text = typeof block.text === "string" ? block.text : "";

  if (!text) return null;

  return {
    type: "quote",
    key: (block._key as string) ?? `quote-${index}`,
    text,
    ...(typeof block.author === "string" && block.author
      ? { author: block.author }
      : {}),
  };
}

interface SanityTableRow {
  _key?: string;
  cells?: unknown;
}

function mapTableBlock(
  block: SanityContentBlock,
  index: number,
): RichTextNode | null {
  const raw = Array.isArray(block.rows) ? (block.rows as SanityTableRow[]) : [];

  const rows = raw.map((row, rowIndex) => ({
    key: row?._key ?? `row-${rowIndex}`,
    cells: Array.isArray(row?.cells)
      ? row.cells.map((cell) => (typeof cell === "string" ? cell : ""))
      : [],
  }));

  if (!rows.length) return null;

  return {
    type: "table",
    key: (block._key as string) ?? `table-${index}`,
    hasHeader: block.hasHeader !== false,
    rows,
    ...(typeof block.caption === "string" && block.caption
      ? { caption: block.caption }
      : {}),
  };
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * A Portable Text array as the application's `RichText`.
 *
 * Takes `unknown` rather than a projection type on purpose. This is the outer
 * edge of the system — the value has crossed a network from a CMS whose
 * validation does not apply to API writes — so the narrowing has to happen
 * somewhere, and doing it here is what lets everything downstream be honestly
 * typed with no cast at all.
 */
export function mapRichText(value: unknown): RichText {
  if (!Array.isArray(value)) return [];

  const blocks = value.filter(
    (block): block is SanityContentBlock =>
      typeof block === "object" && block !== null,
  );

  const nodes: RichText = [];

  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];

    // List blocks are consumed as a run, not one at a time.
    if (isListBlock(block)) {
      const start = index;
      while (index < blocks.length && isListBlock(blocks[index])) index += 1;
      nodes.push(...groupLists(blocks.slice(start, index)));
      continue;
    }

    index += 1;

    const node =
      block._type === "block"
        ? mapTextBlock(block, index)
        : block._type === "postImage"
          ? mapImageBlock(block, index)
          : block._type === "postQuote"
            ? mapQuoteBlock(block, index)
            : block._type === "postTable"
              ? mapTableBlock(block, index)
              : // A type this deploy has never heard of. Dropping it costs one
                // block; rendering it would cost the page.
                null;

    if (node) nodes.push(node);
  }

  return nodes;
}
