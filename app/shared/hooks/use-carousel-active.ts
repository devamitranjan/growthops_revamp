"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

const getServerSnapshot = () => 0;

export function useCarouselActive(emblaApi: EmblaCarouselType | undefined) {
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

  return useSyncExternalStore(
    subscribe,
    () => emblaApi?.selectedScrollSnap() ?? 0,
    getServerSnapshot,
  );
}
