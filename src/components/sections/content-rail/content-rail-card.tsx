import clsx from "clsx";
import Image from "next/image";

import type { ContentRailCardData } from "@/content/types";

const CARD_TINTS = [
  "bg-[#fce3ea]",
  "bg-[#fdeedc]",
  "bg-[#dcf5f2]",
  "bg-[#e3eafb]",
];

interface ContentRailCardProps {
  card: ContentRailCardData;
  index: number;
}

export function ContentRailCard({ card, index }: ContentRailCardProps) {
  return (
    <li
      data-content-rail-card=""
      className={clsx(
        "relative flex w-full flex-col",
        "rounded-[32px] p-7 pb-5 md:p-8 md:pb-5",
        "md:w-[600px] md:shrink-0 lg:w-[780px] xl:w-[880px]",
        "md:min-h-[180px]",
        "transition duration-300 ease-out",
        "motion-safe:has-[a:hover]:-translate-y-1",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-4 has-[a:focus-visible]:outline-primary-pink-base",
        CARD_TINTS[index % CARD_TINTS.length],
      )}
    >
      {card.image ? (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-[20px] bg-neutral-white-base">
          <Image
            src={card.image}
            alt={card.alt ?? ""}
            fill
            sizes="(max-width: 768px) 85vw, 880px"
            className="object-cover"
          />
        </div>
      ) : null}

      <h6 className="heading-h6-bold text-neutral-black-base">
        {card.href ? (
          <a
            href={card.href}
            className="outline-none after:absolute after:inset-0 after:rounded-[32px] after:content-['']"
          >
            {card.title}
          </a>
        ) : (
          card.title
        )}
      </h6>

      <p className="body2-regular md:body1-regular mt-3 text-neutral-black-base md:mt-4">
        {card.description}
      </p>
    </li>
  );
}
