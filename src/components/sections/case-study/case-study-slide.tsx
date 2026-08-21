import clsx from "clsx";

import { CaseStudySlideData } from "@/sanity/types";

interface CaseStudySlideProps {
  slide: CaseStudySlideData;
  isActive: boolean;
  progress: number;
  onClick: () => void;
}

export function CaseStudySlide({
  slide,
  isActive,
  progress,
  onClick,
}: CaseStudySlideProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${slide.label}`}
      aria-current={isActive ? "true" : undefined}
      className={clsx(
        "group relative flex aspect-video",
        "w-[78%] md:w-[calc(25%-24px)]",
        "shrink-0 cursor-pointer flex-col justify-end",
        "overflow-hidden rounded-xl p-4 text-left",
        "bg-cover bg-center shadow-lg",
        "transition-all duration-500 ease-out",
        "focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-primary-pink-light",
        isActive ? "scale-[1.02]" : "scale-100",
      )}
      style={{
        backgroundImage: `url("${slide.bg}")`,
      }}
    >
      <div
        className={clsx(
          "absolute inset-0",
          "bg-gradient-to-r",
          "from-primary-pink-extradark",
          "to-primary-pink-light",
          "transition-opacity duration-500 ease-out",
          isActive
            ? "opacity-30"
            : "opacity-0 group-hover:opacity-40",
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-neutral-black-base/80 via-transparent to-transparent" />

      <div className="relative z-20 flex flex-col gap-3">
        <p className="card__label text-left text-neutral-white-base body3-semibold md:body1-semibold">
          {slide.label}
        </p>

        <div className="h-1 w-full overflow-hidden rounded-full bg-neutral-white-base/30">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-pink-light to-primary-orange-light"
            style={{
              width: `${isActive ? progress : 0}%`,
            }}
          />
        </div>
      </div>
    </button>
  );
}