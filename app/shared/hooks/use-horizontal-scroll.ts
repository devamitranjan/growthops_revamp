"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  scrollAmount = 300,
) {
  const scrollRef = useRef<T>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);

    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    },
    [scrollAmount],
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

  return { scrollRef, canScrollLeft, canScrollRight, scroll };
}
