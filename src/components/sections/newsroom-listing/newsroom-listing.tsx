import type { NewsroomListingData } from "@/content/types";
import { NewsroomCard } from "./newsroom-card";

interface NewsroomListingProps {
  data: NewsroomListingData;
}

/**
 * /newsroom in full.
 *
 * Two sections rather than one: the heading sits on the site's black, the
 * cards on white, and the band is only as tall as the heading needs.
 *
 * The card grid declares no rows. Each card spans six implicit ones and
 * subgrids onto them, so a pair of cards shares row heights and their dates,
 * teasers and links line up — see `NewsroomCard`.
 */
export default function NewsroomListing({ data }: NewsroomListingProps) {
  return (
    <>
      <section className="bg-neutral-black-light pb-10 pt-16 md:pb-14 md:pt-30">
        <div className="generic-container">
          <h1 className="heading-h1-bold text-neutral-white-base">
            {data.heading}
          </h1>
        </div>
      </section>

      <section className="bg-white pb-16 pt-16 md:pb-4 md:pt-24">
        <div className="generic-container grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-[70px] md:gap-y-0">
          {data.articles.map((article, index) => (
            <NewsroomCard
              key={article.id}
              article={article}
              readMoreLabel={data.readMoreLabel}
              // Only the first row is above the fold.
              priority={index < 2}
            />
          ))}
        </div>
      </section>
    </>
  );
}
