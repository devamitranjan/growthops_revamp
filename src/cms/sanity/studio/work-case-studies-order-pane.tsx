import { useCallback, useMemo, useState } from "react";
import { useClient } from "sanity";
import { IntentLink } from "sanity/router";

import { apiVersion } from "../env";

interface CaseStudyRow {
  id: string;
  reference: { _key?: string; _ref: string; _type: "reference" };
  title: string;
  category?: string;
}

interface WorkCaseStudiesOrderPaneProps {
  options?: {
    documentId?: string;
    sectionKey?: string;
    items?: Array<{
      _key?: string;
      _ref?: string;
      _type?: string;
      id?: string;
      title?: string;
      description?: string;
      category?: string;
      image?: string;
      alt?: string;
      href?: string;
    }>;
    itemsPerPage?: number;
  };
}

type SaveState =
  | { status: "idle" }
  | { status: "saving" }
  | { status: "saved" }
  | { status: "error"; message: string };

const DEFAULT_ITEMS_PER_PAGE = 6;

export function WorkCaseStudiesOrderPane({
  options = {},
}: WorkCaseStudiesOrderPaneProps) {
  const {
    documentId,
    sectionKey,
    items = [],
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  } = options;
  const client = useClient({ apiVersion });
  const [dragging, setDragging] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [save, setSave] = useState<SaveState>({ status: "idle" });

  const sourceRows: CaseStudyRow[] = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id ?? item._ref ?? `item-${index}`,
      reference: {
        ...(item._key ? { _key: item._key } : {}),
        _ref: item.id ?? item._ref ?? `item-${index}`,
        _type: "reference" as const,
      },
      title: item.title ?? `Untitled #${index + 1}`,
      category: item.category,
    }));
  }, [items]);
  const [rows, setRows] = useState<CaseStudyRow[]>(sourceRows);

  const pageCount = useMemo(
    () => Math.ceil(rows.length / itemsPerPage),
    [rows.length, itemsPerPage],
  );

  const moveRow = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (
        !documentId ||
        !sectionKey ||
        fromIndex === toIndex ||
        toIndex < 0 ||
        toIndex >= rows.length
      ) {
        return;
      }

      const next = [...rows];
      const [row] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, row);
      setRows(next);
      setSave({ status: "saving" });

      const itemsPath = `sections[_key=="${sectionKey}"].items`;
      const references = next.map((item) => item.reference);
      const publishedId = documentId.replace(/^drafts\./, "");

      void client
        .fetch<{ _id: string }[]>(`*[_id in [$publishedId, $draftId]]{ _id }`, {
          publishedId,
          draftId: `drafts.${publishedId}`,
        })
        .then((documents) => {
          const transaction = client.transaction();
          for (const document of documents) {
            transaction.patch(document._id, (patch) =>
              patch.set({ [itemsPath]: references }),
            );
          }
          return transaction.commit({ visibility: "async" });
        })
        .then(() => setSave({ status: "saved" }))
        .catch((error: unknown) => {
          setRows(rows);
          setSave({
            status: "error",
            message:
              error instanceof Error
                ? error.message
                : "Could not save the order.",
          });
        });
    },
    [client, documentId, rows, sectionKey],
  );

  if (!rows.length) {
    return (
      <div className="gop-order">
        <p className="gop-order-note">No case studies yet.</p>
      </div>
    );
  }

  return (
    <div className="gop-order">
      <style>{PANE_STYLES}</style>

      <header className="gop-order-header">
        <p className="gop-order-note">
          Drag a case study, or send it to another page. {rows.length} case
          studies · {itemsPerPage} per page · {pageCount} page
          {pageCount === 1 ? "" : "s"}.
        </p>
        <p className="gop-order-note gop-order-muted">
          Moves save straight away, to the page and its draft.
        </p>
        <div className="gop-order-status" role="status">
          {save.status === "saving" && "Saving..."}
          {save.status === "saved" && "Saved"}
          {save.status === "error" && (
            <span className="gop-order-error">{save.message}</span>
          )}
        </div>
      </header>

      <ol className="gop-order-list">
        {rows.map((row, index) => {
          const page = Math.floor(index / itemsPerPage) + 1;
          const startsPage = index % itemsPerPage === 0;

          return (
            <li key={row.id}>
              {startsPage && (
                <p className="gop-order-page">
                  Page {page} · items {index + 1}–
                  {Math.min(index + itemsPerPage, rows.length)}
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
                    params={{ id: row.id, type: "workCaseStudy" }}
                    className="gop-order-link"
                  >
                    {row.title}
                  </IntentLink>
                  <span className="gop-order-meta">
                    {row.category ?? "No category"}
                  </span>
                </span>

                <span className="gop-order-controls">
                  <button
                    type="button"
                    className="gop-order-button"
                    title="Move up"
                    disabled={index === 0}
                    onClick={(event) => {
                      event.stopPropagation();
                      moveRow(index, index - 1);
                    }}
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className="gop-order-button"
                    title="Move down"
                    disabled={index === rows.length - 1}
                    onClick={(event) => {
                      event.stopPropagation();
                      moveRow(index, index + 1);
                    }}
                  >
                    ↓
                  </button>
                  <select
                    className="gop-order-select"
                    title="Move to the top of another page"
                    value={page}
                    onChange={(event) => {
                      const targetPage = Number(event.target.value);
                      moveRow(index, (targetPage - 1) * itemsPerPage);
                    }}
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
    </div>
  );
}

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

export default WorkCaseStudiesOrderPane;
