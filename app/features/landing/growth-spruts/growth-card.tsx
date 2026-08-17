"use client";

import cx from "clsx";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { GrowthCardData } from "./growth-spurts.types";

interface GrowthCardProps {
  card: GrowthCardData;
  isActive: boolean;
  onClick: () => void;
}

export function GrowthCard({ card, isActive, onClick }: GrowthCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "relative flex flex-col shrink-0 overflow-hidden cursor-pointer text-left",
        "transition duration-500 ease-out",
        "max-md:w-[78%] md:w-[277px]",
        isActive
          ? "max-md:scale-100 max-md:opacity-100 max-md:blur-none"
          : "max-md:scale-90 max-md:opacity-50 max-md:blur-[1px]",
        "md:group-has-[button:hover]/cards:opacity-40 md:group-has-[button:hover]/cards:blur-[3px]",
        "md:hover:opacity-100! md:hover:blur-none!",
      )}
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="relative aspect-[3/5] overflow-hidden rounded-[20px]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-neutral-black-light" />

          <Image
            src={card.imageSrc}
            alt={card.alt}
            fill
            sizes="(max-width: 768px) 78vw, 277px"
            priority={isActive}
            className="object-cover"
          />
        </div>

        <p className="text-neutral-white-base md:body1-semibold body3-semibold">
          {card.label}
        </p>

        <div className="flex items-center gap-2">
          <FaCircleCheck
            aria-hidden="true"
            className="text-sm text-primary-pink-base"
          />

          <p className="text-neutral-white-base body3-regular">
            {card.description}
          </p>
        </div>
      </div>
    </button>
  );
}
