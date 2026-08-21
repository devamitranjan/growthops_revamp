import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const WINDOW_SIZE = 5;

/** Page 1 is the canonical /post URL, so it never carries a ?page=1 query. */
function hrefForPage(page: number) {
  return page === 1 ? "/post" : `/post?page=${page}`;
}

function windowedPages(currentPage: number, totalPages: number) {
  const span = Math.min(WINDOW_SIZE, totalPages);
  const start = Math.min(
    Math.max(1, currentPage - Math.floor(span / 2)),
    totalPages - span + 1,
  );

  return Array.from({ length: span }, (_, index) => start + index);
}

const stepClasses =
  "body1-regular text-neutral-white-base transition duration-300 ease-out hover:text-primary-pink-base";

interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function PostPagination({
  currentPage,
  totalPages,
}: PostPaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <div
      role="navigation"
      aria-label="Pagination"
      className="mt-16 flex items-center justify-center gap-4 md:mt-24 md:gap-6"
    >
      {hasPrev ? (
        <Link
          href={hrefForPage(currentPage - 1)}
          rel="prev"
          className={`flex items-center gap-2 ${stepClasses}`}
        >
          <FaAngleLeft aria-hidden />
          Prev
        </Link>
      ) : (
        <span className="body1-regular flex items-center gap-2 text-neutral-white-base/30">
          <FaAngleLeft aria-hidden />
          Prev
        </span>
      )}

      <ul className="flex items-center gap-2 md:gap-3">
        {windowedPages(currentPage, totalPages).map((page) => {
          const isCurrent = page === currentPage;

          return (
            <li key={page}>
              {isCurrent ? (
                <span
                  aria-current="page"
                  className="body1-regular flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-white-base/60 text-neutral-white-base"
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={hrefForPage(page)}
                  aria-label={`Go to page ${page}`}
                  className="body1-regular flex h-10 w-10 items-center justify-center rounded-lg border border-transparent text-neutral-white-base transition duration-300 ease-out hover:border-neutral-white-base/30 hover:text-primary-pink-base"
                >
                  {page}
                </Link>
              )}
            </li>
          );
        })}
      </ul>

      {hasNext ? (
        <Link
          href={hrefForPage(currentPage + 1)}
          rel="next"
          className={`flex items-center gap-2 ${stepClasses}`}
        >
          Next
          <FaAngleRight aria-hidden />
        </Link>
      ) : (
        <span className="body1-regular flex items-center gap-2 text-neutral-white-base/30">
          Next
          <FaAngleRight aria-hidden />
        </span>
      )}
    </div>
  );
}
