"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { VideoDialog } from "../../../shared/components/video-dialog-portal";
import { CaseStudySlide } from "./case-study-slide";
import { caseStudySlides } from "./case-study.data";

const SLIDE_DURATION = 6000;
const DESKTOP_VISIBLE_CARDS = 4;

export default function CaseStudy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const mobileCarouselRef = useRef<HTMLDivElement | null>(null);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileScrollTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const isProgrammaticScrollRef = useRef(false);

  const totalSlides = caseStudySlides.length;
  const activeSlide = caseStudySlides[activeIndex];

  const maxDesktopStartIndex = Math.max(
    totalSlides - DESKTOP_VISIBLE_CARDS,
    0,
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSlides) {
        return;
      }

      setActiveIndex(index);
      setProgress(0);

      if (index === 0) {
        setVisibleStartIndex(0);
        return;
      }

      setVisibleStartIndex(
        Math.min(index, maxDesktopStartIndex),
      );
    },
    [maxDesktopStartIndex, totalSlides],
  );

  const goToNextSlide = useCallback(() => {
    const nextIndex =
      activeIndex === totalSlides - 1
        ? 0
        : activeIndex + 1;

    goToSlide(nextIndex);
  }, [activeIndex, goToSlide, totalSlides]);

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

      animationFrameId =
        requestAnimationFrame(updateProgress);
    };

    animationFrameId =
      requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex, goToNextSlide]);


  useEffect(() => {
    const container = mobileCarouselRef.current;

    if (!container) {
      return;
    }

    const activeCard =
      mobileCardRefs.current[activeIndex];

    if (!activeCard) {
      return;
    }

    const containerLeft =
      container.getBoundingClientRect().left;

    const cardLeft =
      activeCard.getBoundingClientRect().left;

    const targetScrollLeft =
      container.scrollLeft +
      (cardLeft - containerLeft);

    isProgrammaticScrollRef.current = true;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });

    const timeout = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeIndex]);

  const handleMobileScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) {
      return;
    }

    if (mobileScrollTimeoutRef.current) {
      clearTimeout(mobileScrollTimeoutRef.current);
    }

    mobileScrollTimeoutRef.current = setTimeout(() => {
      const container = mobileCarouselRef.current;

      if (!container) {
        return;
      }

      const containerLeft =
        container.getBoundingClientRect().left;

      let closestIndex = activeIndex;
      let closestDistance = Infinity;

      mobileCardRefs.current.forEach(
        (card, index) => {
          if (!card) {
            return;
          }

          const cardLeft =
            card.getBoundingClientRect().left;

          const distance = Math.abs(
            cardLeft - containerLeft,
          );

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        },
      );

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
        setProgress(0);
      }
    }, 100);
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (mobileScrollTimeoutRef.current) {
        clearTimeout(mobileScrollTimeoutRef.current);
      }
    };
  }, []);

  const handleCardClick = (index: number) => {
    goToSlide(index);
  };

  const handleVideoOpen = () => {
    if (!activeSlide?.video) {
      return;
    }

    setIsVideoOpen(true);
  };

  if (!activeSlide || totalSlides === 0) {
    return null;
  }

  const desktopSlides = Array.from(
    {
      length: Math.min(
        DESKTOP_VISIBLE_CARDS,
        totalSlides,
      ),
    },
    (_, offset) => {
      const index =
        visibleStartIndex + offset;

      return caseStudySlides[index];
    },
  );

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
            {/* Mobile carousel */}
            <div
              ref={mobileCarouselRef}
              onScroll={handleMobileScroll}
              className={[
                "flex gap-4 overflow-x-auto",
                "snap-x snap-mandatory",
                "scroll-smooth",
                "md:hidden",
                "[scrollbar-width:none]",
                "[-ms-overflow-style:none]",
                "[&::-webkit-scrollbar]:hidden",
              ].join(" ")}
            >
              {caseStudySlides.map(
                (slide, index) => (
                  <div
                    key={slide.id}
                    ref={(element) => {
                      mobileCardRefs.current[index] =
                        element;
                    }}
                    className="w-[78%] shrink-0 snap-start"
                  >
                    <CaseStudySlide
                      slide={slide}
                      isActive={
                        index === activeIndex
                      }
                      progress={
                        index === activeIndex
                          ? progress
                          : 0
                      }
                      onClick={() =>
                        handleCardClick(index)
                      }
                    />
                  </div>
                ),
              )}
            </div>

            {/* Desktop carousel */}
            <div className="hidden md:grid md:grid-cols-4 md:gap-8">
              {desktopSlides.map((slide) => {
                if (!slide) {
                  return null;
                }

                const slideIndex =
                  caseStudySlides.findIndex(
                    (item) =>
                      item.id === slide.id,
                  );

                return (
                  <CaseStudySlide
                    key={slide.id}
                    slide={slide}
                    isActive={
                      slideIndex === activeIndex
                    }
                    progress={progress}
                    onClick={() =>
                      handleCardClick(slideIndex)
                    }
                  />
                );
              })}
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