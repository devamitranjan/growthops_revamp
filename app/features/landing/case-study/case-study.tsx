"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { VideoDialog } from "../../../shared/components/video-dialog-portal";
import { CaseStudySlide } from "./case-study-slide";
import { caseStudySlides } from "./case-study.data";

const SLIDE_DURATION = 6000;

export default function CaseStudy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const isProgrammaticScrollRef = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    watchDrag: () => !window.matchMedia("(min-width: 768px)").matches,
  });

  const totalSlides = caseStudySlides.length;
  const activeSlide = caseStudySlides[activeIndex];

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const goToNextSlide = useCallback(() => {
    setActiveIndex((current) =>
      current === totalSlides - 1 ? 0 : current + 1,
    );
    setProgress(0);
  }, [totalSlides]);

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId = 0;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const currentProgress = Math.min(
        (elapsed / SLIDE_DURATION) * 100,
        100,
      );

      setProgress(currentProgress);

      if (currentProgress >= 100) {
        goToNextSlide();
        return;
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex, goToNextSlide]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    isProgrammaticScrollRef.current = true;
    emblaApi.scrollTo(activeIndex);
  }, [emblaApi, activeIndex]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const handleSelect = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false;
        return;
      }

      setActiveIndex(emblaApi.selectedScrollSnap());
      setProgress(0);
    };

    emblaApi.on("select", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
    };
  }, [emblaApi]);

  const handleCardClick = (index: number) => {
    goToSlide(index);
  };

  const handleVideoOpen = () => {
    if (!activeSlide?.video) {
      return;
    }

    setIsVideoOpen(true);
  };

  if (!activeSlide) {
    return null;
  }

  return (
    <section className="reveal case-study-wrapper">
      <div className="relative h-[680px] w-full overflow-hidden md:h-[700px]">
        <div
          key={activeSlide.id}
          className={[
            "absolute inset-0",
            "bg-cover bg-center",
            "transition-opacity duration-700 ease-out",
          ].join(" ")}
          style={{
            backgroundImage: `url("${activeSlide.bg}")`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-neutral-black-base to-transparent to-80%" />

        <div className="absolute inset-0 bg-gradient-to-r from-neutral-black-base to-transparent to-60% shadow-[inset_0px_5px_20px_rgb(7,12,15)]" />

        <div className="relative z-10 generic-container h-full w-full">
          <div className="flex h-full flex-col justify-center">
            <div
              key={activeSlide.id}
              className="w-full md:w-1/2"
            >
              <div className="content-wrapper flex flex-col">
                <p className="body2-semibold md:body1-semibold mb-2">
                  Unforgettable Digital Experience
                </p>

                <p className="heading-h2-extrabold mb-3 md:mb-4">
                  {activeSlide.label}
                </p>

                <p className="body2-regular md:body1-regular mb-8 md:mb-10" />

                <button
                  type="button"
                  onClick={handleVideoOpen}
                  className="scroll-text-cta w-fit rounded-[40px] border border-neutral-white-base bg-transparent px-10 py-3 body2-bold text-white transition-colors duration-300 ease-out hover:bg-neutral-white-base hover:text-primary-pink-base"
                >
                  Explore more
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20 w-full">
          <div className="generic-container">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4 md:gap-8">
                {caseStudySlides.map((slide, index) => (
                  <CaseStudySlide
                    key={slide.id}
                    slide={slide}
                    isActive={index === activeIndex}
                    progress={
                      index === activeIndex ? progress : 0
                    }
                    onClick={() => handleCardClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoDialog
        open={isVideoOpen}
        title={`${activeSlide.label} video`}
        onOpenChange={setIsVideoOpen}
      />
    </section>
  );
}
