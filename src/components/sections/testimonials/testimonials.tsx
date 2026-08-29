"use client";

import { ToggleGroup } from "radix-ui";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { TestimonialCard } from "./testimonial-card";
import { LogoMarquee } from "./logo-marquee";
import { useTestimonialsCarousel } from "./testimonials.hooks";
import { ITestimonialsData } from "@/content/types";

interface TestimonialsProps {
  data: ITestimonialsData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  const { title, categories, testimonials, logos, defaultCategory } = data;

  const {
    selectedCategory,
    selectCategory,
    filteredTestimonials,
    emblaRef,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
  } = useTestimonialsCarousel({ categories, testimonials, defaultCategory });

  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div>
        <div className="generic-container mb-8 md:mb-12">
          <h2 className="heading-h2-extrabold text-neutral-white-base">
            {title}
          </h2>
        </div>

        <div>
          <ToggleGroup.Root
            type="single"
            value={selectedCategory}
            onValueChange={selectCategory}
            className="generic-container flex gap-5 mb-8 max-md:overflow-x-auto max-md:[scrollbar-width:none] max-md:[-ms-overflow-style:none] max-md:[&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => (
              <ToggleGroup.Item
                key={category}
                value={category}
                className="group py-2 px-6 border rounded-[30px] transition duration-300 ease-out cursor-pointer border-neutral-white-base bg-transparent hover:bg-neutral-white-base/[.08] data-[state=on]:border-primary-cyan-extradark data-[state=on]:bg-primary-cyan-extradark"
              >
                <p className="body2-regular text-nuetral-white-base transition duration-300 ease-out group-data-[state=on]:body2-bold">
                  {category}
                </p>
              </ToggleGroup.Item>
            ))}
          </ToggleGroup.Root>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-0 h-full w-[10%] md:w-1/4 bg-gradient-to-r from-neutral-black-light to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-[10%] md:w-1/4 bg-gradient-to-r from-transparent to-neutral-black-light z-20 pointer-events-none" />

          <div className="relative mb-16">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="swiper__prev absolute left-[5%] top-1/2 -translate-y-1/2 text-neutral-white-base text-2xl opacity-60 hover:opacity-100 z-20 cursor-pointer disabled:hidden max-md:hidden transition duration-300 ease-out"
              aria-label="Scroll testimonials left"
            >
              <FaAngleLeft />
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="swiper__next absolute right-[5%] top-1/2 -translate-y-1/2 text-neutral-white-base text-2xl opacity-60 hover:opacity-100 z-20 cursor-pointer disabled:hidden max-md:hidden transition duration-300 ease-out"
              aria-label="Scroll testimonials right"
            >
              <FaAngleRight />
            </button>

            <div
              ref={emblaRef}
              className="overflow-hidden max-md:overflow-x-auto max-md:touch-pan-x max-md:snap-x max-md:snap-mandatory max-md:pb-2 max-md:[scrollbar-width:none] max-md:[-ms-overflow-style:none] max-md:[&::-webkit-scrollbar]:hidden max-md:z-30 px-[5%] md:px-[calc(50vw-360px)]"
            >
              <div className="flex gap-[18px] md:gap-[40px]">
                {filteredTestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            </div>
          </div>

          {logos?.length ? <LogoMarquee logos={logos} /> : null}
        </div>
      </div>
    </section>
  );
}
