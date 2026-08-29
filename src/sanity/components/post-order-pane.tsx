import { useCallback, useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { IntentLink } from "sanity/router";

import { apiVersion } from "../env";
import { resolvePostsPerPage } from "../pagination";

/**
 * The pane that decides which post lands on which page of /post.
 *
 * The order itself lives on the articles — one `order` number per document —
 * which is the right home for it (a new article joins the listing on its own,
 * with no page to edit), but it means the answer to "what is on page 3" is
 * spread across sixty forms and visible in none of them. This pane is that
 * answer, and the place to change it: one list in listing order, split where
 * the pagination splits it, with the whole row draggable.
 *
 * A move renumbers `order` on every article the move shifted, and writes to
 * the published document as well as the draft where one exists. That is
 * deliberate: renumbering touches a dozen articles at once, and leaving those
 * as drafts would turn one drag into a dozen documents an editor has to hunt
 * down and publish before the listing matches what this pane shows.
 */

/** Both forms of one article: the draft and the published document are two
 *  documents holding one position, and a move has to write to both. */
interface ArticleRow {
  /** The published id — what the rest of the Studio links against. */
  id: string;
  /** Every id to patch: the published one, the draft one, or both. */
  ids: string[];
  title: string;
  category?: string;
  order: number | null;
  hasDraft: boolean;
}

interface ArticleDoc {
  _id: string;
  title?: string;
  category?: string;
  order?: number | null;
}

/** `raw` rather than `drafts`: the pane needs the draft *and* the published
 *  document as separate rows, because both carry an `order` and a move has to
 *  set them together. */
const ARTICLES_QUERY = `*[_type == "article"]{ _id, title, category, order }`;

const DRAFT_PREFIX = "drafts.";

/** One row per article, drafts folded onto the published document they shadow.
 *  The draft wins the display: it is what the editor last typed. */
function toRows(docs: ArticleDoc[]): ArticleRow[] {
  const byId = new Map<string, ArticleRow>();

  for (const doc of docs) {
    const isDraft = doc._id.startsWith(DRAFT_PREFIX);
    const id = isDraft ? doc._id.slice(DRAFT_PREFIX.length) : doc._id;
    const existing = byId.get(id);

    // Only the draft overwrites what is already there; the published document
    // fills in a row the draft has not claimed.
    const takeFields = isDraft || !existing;

    byId.set(id, {
      id,
      ids: [...(existing?.ids ?? []), doc._id],
      title: takeFields ? (doc.title ?? "Untitled") : (existing?.title ?? ""),
      category: takeFields ? doc.category : existing?.category,
      order: takeFields ? (doc.order ?? null) : (existing?.order ?? null),
      hasDraft: isDraft || (existing?.hasDraft ?? false),
    });
  }

  // The listing's ordering, reproduced: `order` ascending. An article without
  // one sorts last here rather than at an arbitrary point, so it is obvious it
  // needs a position — the field is required, so this is only ever content
  // pushed in through the API.
  return [...byId.values()].sort((a, b) => {
    if (a.order === b.order) return a.title.localeCompare(b.title);
    if (a.order === null) return 1;
    if (b.order === null) return -1;
    return a.order - b.order;
  });
}

/** The array with the row at `from` sitting at `to`. */
function move(rows: ArticleRow[], from: number, to: number): ArticleRow[] {
  const next = [...rows];
  const [row] = next.splice(from, 1);
  next.splice(Math.max(0, Math.min(next.length, to)), 0, row);
  return next;
}

type SaveState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "saved"; moved: number }
  | { status: "error"; message: string };

interface PostOrderPaneProps {
  options?: Record<string, unknown>;
}

export function PostOrderPane({ options }: PostOrderPaneProps) {
  const perPage = resolvePostsPerPage(
    typeof options?.perPage === "number" ? options.perPage : undefined,
  );

  const client = useClient({ apiVersion });
  const [rows, setRows] = useState<ArticleRow[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [save, setSave] = useState<SaveState>({ status: "idle" });
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);

  // Bumped to re-run the read below; the read itself lives in the effect so
  // nothing is set synchronously while rendering.
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;

    client
      .withConfig({ perspective: "raw" })
      .fetch<ArticleDoc[]>(ARTICLES_QUERY)
      .then((docs) => {
        if (!cancelled) setRows(toRows(docs ?? []));
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : "Could not load articles.",
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [client, reload]);

  const retry = useCallback(() => {
    setRows(null);
    setLoadError(null);
    setReload((value) => value + 1);
  }, []);

  /**
   * Write the new positions.
   *
   * Only the rows whose position actually changed are patched — a drag near
   * the top of a sixty-article list should not rewrite the whole archive — and
   * both ids of each of those rows go into one transaction, so the listing
   * never renders half a reorder.
   */
  const applyOrder = useCallback(
    async (next: ArticleRow[], previous: ArticleRow[]) => {
      const transaction = client.transaction();
      const moved: ArticleRow[] = [];

      next.forEach((row, index) => {
        if (row.order === index) return;
        moved.push(row);
        for (const id of row.ids) {
          transaction.patch(id, (patch) => patch.set({ order: index }));
        }
      });

      if (!moved.length) return;

      setRows(next.map((row, index) => ({ ...row, order: index })));
      setSave({ status: "saving" });

      try {
        await transaction.commit({ visibility: "async" });
        setSave({ status: "saved", moved: moved.length });
      } catch (error: unknown) {
        // Put the list back where it was: the pane showing an order the
        // dataset does not have is worse than the move not landing.
        setRows(previous);
        setSave({
          status: "error",
          message:
            error instanceof Error ? error.message : "Could not save the order.",
        });
      }
    },
    [client],
  );

  const moveRow = useCallback(
    (from: number, to: number) => {
      if (!rows || from === to || to < 0 || to >= rows.length) return;
      void applyOrder(move(rows, from, to), rows);
    },
    [applyOrder, rows],
  );

  const pageCount = useMemo(
    () => (rows ? Math.ceil(rows.length / perPage) : 0),
    [perPage, rows],
  );

  if (loadError) {
    return (
      <div className="gop-order">
        <p className="gop-order-error">{loadError}</p>
        <button type="button" className="gop-order-button" onClick={retry}>
          Try again
        </button>
      </div>
    );
  }

  if (!rows) {
    return (
      <div className="gop-order">
        <p className="gop-order-note">Loading articles…</p>
      </div>
    );
  }

  return (
    <div className="gop-order">
      <style>{PANE_STYLES}</style>

      <header className="gop-order-header">
        <p className="gop-order-note">
          Drag a post, or send it to another page. {rows.length} posts ·{" "}
          {perPage} per page · {pageCount} page{pageCount === 1 ? "" : "s"}.
        </p>
        <p className="gop-order-note gop-order-muted">
          Moves save straight away, to published articles as well as drafts.
        </p>
        <div className="gop-order-status" role="status">
          {save.status === "saving" && "Saving…"}
          {save.status === "saved" &&
            `Saved · ${save.moved} post${save.moved === 1 ? "" : "s"} renumbered`}
          {save.status === "error" && (
            <span className="gop-order-error">{save.message}</span>
          )}
        </div>
      </header>

      <ol className="gop-order-list">
        {rows.map((row, index) => {
          const page = Math.floor(index / perPage) + 1;
          const startsPage = index % perPage === 0;

          return (
            <li key={row.id}>
              {startsPage && (
                <p className="gop-order-page">
                  Page {page} · posts {index + 1}–
                  {Math.min(index + perPage, rows.length)}
                </p>
              )}

              <div
                className={[
                  "gop-order-row",
                  dragging === index ? "is-dragging" : "",
                  over === index && dragging !== index ? "is-over" : "",
                ]
                  .join(" ")
                  .trim()}
                draggable
                onDragStart={(event) => {
                  setDragging(index);
                  event.dataTransfer.effectAllowed = "move";
                  // Firefox starts no drag at all without data on the event.
                  event.dataTransfer.setData("text/plain", row.id);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  event.dataTransfer.dropEffect = "move";
                  setOver(index);
                }}
                onDrop={(event) => {
                  event.preventDefault();
                  if (dragging !== null) moveRow(dragging, index);
                  setDragging(null);
                  setOver(null);
                }}
                onDragEnd={() => {
                  setDragging(null);
                  setOver(null);
                }}
              >
                <span className="gop-order-grip" aria-hidden="true">
                  ⠿
                </span>
                <span className="gop-order-index">{index + 1}</span>

                <span className="gop-order-title">
                  <IntentLink
                    intent="edit"
                    params={{ id: row.id, type: "article" }}
                    className="gop-order-link"
                  >
                    {row.title}
                  </IntentLink>
                  <span className="gop-order-meta">
                    {row.category ?? "No category"}
                    {row.hasDraft ? " · unpublished changes" : ""}
                  </span>
                </span>

                <span className="gop-order-controls">
                  <button
                    type="button"
                    className="gop-order-button"
                    title="Move up"
                    disabled={index === 0}
                    onClick={() => moveRow(index, index - 1)}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="gop-order-button"
                    title="Move down"
                    disabled={index === rows.length - 1}
                    onClick={() => moveRow(index, index + 1)}
                  >
                    ↓
                  </button>
                  <select
                    className="gop-order-select"
                    title="Move to the top of another page"
                    value={page}
                    onChange={(event) =>
                      moveRow(index, (Number(event.target.value) - 1) * perPage)
                    }
                  >
                    {Array.from({ length: pageCount }, (_, i) => (
                      <option key={i} value={i + 1}>
                        Page {i + 1}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      {!rows.length && <p className="gop-order-note">No articles yet.</p>}
    </div>
  );
}

/** Studio theme tokens where they exist, plain fallbacks where they do not, so
 *  the pane follows light and dark without pulling in a styling dependency. */
const PANE_STYLES = `
.gop-order { padding: 1rem; font: inherit; color: var(--card-fg-color, inherit); }
.gop-order-header { display: grid; gap: .25rem; margin-bottom: 1rem; }
.gop-order-note { margin: 0; font-size: .8125rem; }
.gop-order-muted, .gop-order-meta, .gop-order-index { color: var(--card-muted-fg-color, #6e7683); }
.gop-order-status { min-height: 1.25rem; font-size: .75rem; color: var(--card-muted-fg-color, #6e7683); }
.gop-order-error { color: var(--card-badge-critical-fg-color, #c7385a); font-size: .8125rem; margin: 0 0 .5rem; }
.gop-order-list { list-style: none; margin: 0; padding: 0; display: grid; gap: .25rem; }
.gop-order-page { margin: 1rem 0 .375rem; font-size: .75rem; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; color: var(--card-muted-fg-color, #6e7683); border-top: 1px solid var(--card-border-color, #e3e4e8); padding-top: .625rem; }
.gop-order-list > li:first-child .gop-order-page { margin-top: 0; border-top: 0; padding-top: 0; }
.gop-order-row { display: flex; align-items: center; gap: .625rem; padding: .5rem .625rem; border: 1px solid var(--card-border-color, #e3e4e8); border-radius: 4px; background: var(--card-bg-color, transparent); cursor: grab; }
.gop-order-row.is-dragging { opacity: .4; }
.gop-order-row.is-over { border-color: var(--card-focus-ring-color, #2276fc); }
.gop-order-grip { cursor: grab; color: var(--card-muted-fg-color, #6e7683); }
.gop-order-index { min-width: 1.75rem; font-size: .75rem; font-variant-numeric: tabular-nums; }
.gop-order-title { display: grid; gap: .125rem; flex: 1; min-width: 0; }
.gop-order-link { color: inherit; text-decoration: none; font-size: .875rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.gop-order-link:hover { text-decoration: underline; }
.gop-order-meta { font-size: .75rem; }
.gop-order-controls { display: flex; align-items: center; gap: .25rem; }
.gop-order-button, .gop-order-select { font: inherit; font-size: .75rem; padding: .25rem .375rem; border-radius: 3px; border: 1px solid var(--card-border-color, #e3e4e8); background: transparent; color: inherit; cursor: pointer; }
.gop-order-button:disabled { opacity: .35; cursor: default; }
`;

export default PostOrderPane;
