"use client";

import { useCallback, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import { useCarouselButtons } from "@/hooks/use-carousel-buttons";
import { ITestimonialsData } from "@/content/types";

const EMBLA_OPTIONS = {
  align: "center",
  containScroll: "trimSnaps",
  skipSnaps: false,
} as const;

export function useTestimonialsCarousel({
  categories,
  testimonials,
  defaultCategory,
}: Pick<ITestimonialsData, "categories" | "testimonials" | "defaultCategory">) {
  const [selectedCategory, setSelectedCategory] = useState(
    defaultCategory ?? categories[0],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(EMBLA_OPTIONS);

  const { canScrollPrev, canScrollNext, scrollPrev, scrollNext } =
    useCarouselButtons(emblaApi);

  const selectCategory = useCallback((value: string) => {
    if (value) setSelectedCategory(value);
  }, []);

  const filteredTestimonials = testimonials.filter(
    (testimonial) => testimonial.category === selectedCategory,
  );

  return {
    selectedCategory,
    selectCategory,
    filteredTestimonials,
    emblaRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  };
}
