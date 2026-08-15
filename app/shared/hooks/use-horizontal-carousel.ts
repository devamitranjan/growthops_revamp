"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseHorizontalCarouselOptions {
  scrollAmount?: number;
  trackActiveItem?: boolean;
}

export function useHorizontalCarousel<T extends HTMLElement = HTMLDivElement>(
  options: UseHorizontalCarouselOptions = {},
) {
  const { scrollAmount = 300, trackActiveItem = false } = options;

  const scrollRef = useRef<T>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      scrollRef.current?.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    [scrollAmount],
  );

  const registerItem = useCallback(
    (index: number) => (element: HTMLElement | null) => {
      itemRefs.current[index] = element;
    },
    [],
  );

  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    updateScrollButtons();

    container.addEventListener("scroll", updateScrollButtons, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [updateScrollButtons]);

  useEffect(() => {
    if (!trackActiveItem) return;

    const container = scrollRef.current;

    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce<IntersectionObserverEntry | null>(
          (best, entry) => {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              return entry;
            }

            return best;
          },
          null,
        );

        if (!mostVisible || mostVisible.intersectionRatio <= 0) {
          return;
        }

        const index = itemRefs.current.indexOf(
          mostVisible.target as HTMLElement,
        );

        if (index !== -1) {
          setActiveIndex(index);
        }
      },
      {
        root: container,
        threshold: [0.5, 0.75, 1],
      },
    );

    itemRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [trackActiveItem]);

  return {
    scrollRef,
    itemRefs,
    registerItem,
    canScrollLeft,
    canScrollRight,
    scroll,
    activeIndex,
  };
}
