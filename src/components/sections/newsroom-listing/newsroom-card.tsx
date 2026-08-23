import Image from "next/image";
import type { NewsroomArticle } from "@/sanity/types";

/**
 * `publishedAt` is a date-only string, so it has to be formatted in UTC:
 * `new Date("2025-07-14")` is midnight UTC, which is still the 13th anywhere
 * west of Greenwich and would render the card a day early.
 */
const PUBLISHED_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

interface NewsroomCardProps {
  article: NewsroomArticle;
  /** One label for the whole listing, so it comes from the page document
   *  rather than sitting on every card. */
  readMoreLabel: string;
  priority: boolean;
}

/**
 * Every newsroom item is published elsewhere, so the card is one external
 * anchor — never a next/link, and there is no in-site destination to offer.
 *
 * From md the anchor is a subgrid spanning the six rows the listing lays out,
 * so the date, teaser and link of both cards in a row sit on the same lines
 * however many lines the titles above them run to. Below md there is one card
 * per row and nothing to align against, so it stays a plain flex column.
 */
export function NewsroomCard({
  article,
  readMoreLabel,
  priority,
}: NewsroomCardProps) {
  return (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col outline-none md:row-span-6 md:grid md:grid-rows-subgrid md:gap-0"
    >
      <div className="relative aspect-[16/9] w-full self-start overflow-hidden">
        <Image
          src={article.imgSrc}
          alt={article.alt}
          fill
          // `priority` is deprecated in Next 16; eager + high fetch priority is
          // the replacement for an image that may be the LCP element.
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <h2 className="mt-8 text-xl font-bold leading-[1.3] text-neutral-black-base transition duration-300 ease-out group-hover:text-primary-pink-base md:mt-10">
        {article.title}
      </h2>

      <time
        dateTime={article.publishedAt}
        className="body1-regular mt-6 block text-neutral-grey-base md:mt-8"
      >
        {PUBLISHED_FORMAT.format(new Date(article.publishedAt))}
      </time>

      <p className="body1-regular mt-1 leading-[1.6] text-neutral-black-base">
        {article.excerpt}
      </p>

      <span className="body1-regular mt-10 self-start text-primary-blue-dark underline underline-offset-4 transition duration-300 ease-out group-hover:text-primary-pink-base">
        {readMoreLabel}
      </span>

      {/* Carries the gap to the next row of cards: the listing sets no row gap
          of its own, because a subgrid inherits it between every internal row
          and would space the card out from the inside. */}
      <span
        aria-hidden
        className="mt-2.5 block border-b-2 border-neutral-black-base md:mb-20"
      />
    </a>
  );
}
