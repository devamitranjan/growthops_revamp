"use client";

import cx from "clsx";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useCarouselButtons } from "../../../shared/hooks/use-carousel-buttons";
import { ReportSlide } from "../../../shared/components/report-overview/report-overview.types";

interface ReportCarouselProps {
  slides: ReportSlide[];
  className?: string;
}

const arrowClasses =
  "absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-neutral-white-base/60 text-sm text-neutral-black-base backdrop-blur-sm transition duration-300 ease-out hover:bg-neutral-white-base disabled:cursor-not-allowed disabled:bg-neutral-white-base/25 disabled:text-neutral-black-base/40";

export const ReportCarousel = ({ slides, className }: ReportCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselButtons(emblaApi);

  const hasMultipleSlides = slides.length > 1;

  return (
    <div
      className={cx("relative overflow-hidden", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Report preview"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative aspect-[1767/2500] w-full shrink-0 grow-0 basis-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {hasMultipleSlides && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous page"
            className={cx(arrowClasses, "left-4")}
          >
            <FaAngleLeft />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next page"
            className={cx(arrowClasses, "right-4")}
          >
            <FaAngleRight />
          </button>
        </>
      )}
    </div>
  );
};
