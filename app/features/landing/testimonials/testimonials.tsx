"use client";

import { ToggleGroup } from "radix-ui";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { TestimonialCard } from "./testimonial-card";
import { LogoMarquee } from "./logo-marquee";
import { categories, testimonials, logos } from "./testimonials.data";

export default function Testimonials() {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div>
        <div className="generic-container mb-8 md:mb-12">
          <h2 className="heading-h2-extrabold text-neutral-white-base">
            In Their Words
          </h2>
        </div>
        <div>
          <ToggleGroup.Root
            type="single"
            defaultValue="Finance"
            className="generic-container flex gap-5 mb-8 max-md:overflow-scroll"
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
            <div className="swiper__prev absolute left-[5%] top-1/2 text-neutral-white-base text-2xl opacity-60 hover:opacity-100 z-20 cursor-pointer aria-disabled:hidden max-md:hidden transition duration-300 ease-out">
              <FaAngleLeft />
            </div>
            <div className="swiper__next absolute right-[5%] top-1/2 text-neutral-white-base text-2xl opacity-60 hover:opacity-100 z-20 cursor-pointer aria-disabled:hidden max-md:hidden transition duration-300 ease-out">
              <FaAngleRight />
            </div>

            <div className="flex gap-[18px] md:gap-[50px] overflow-x-auto max-md:z-30">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.alt}
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>

          <LogoMarquee logos={logos} />
        </div>
      </div>
    </section>
  );
}
