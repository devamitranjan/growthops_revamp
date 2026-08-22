"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

const getServerSnapshot = () => false;

export function useCarouselButtons(emblaApi: EmblaCarouselType | undefined) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {};

      emblaApi.on("select", onStoreChange);
      emblaApi.on("reInit", onStoreChange);

      return () => {
        emblaApi.off("select", onStoreChange);
        emblaApi.off("reInit", onStoreChange);
      };
    },
    [emblaApi],
  );

  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollPrev() ?? false,
    getServerSnapshot,
  );
  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollNext() ?? false,
    getServerSnapshot,
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return { canScrollPrev, canScrollNext, scrollPrev, scrollNext };
}
