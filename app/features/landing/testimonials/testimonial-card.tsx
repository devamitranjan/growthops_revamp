import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { TestimonialData } from "./testimonials.types";

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-[85%] md:w-[45%] shrink-0 max-md:pl-6">
      {testimonial.audioSrc && <audio src={testimonial.audioSrc} />}
      <div className="w-full h-full bg-neutral-white-base/[.08] rounded-[20px] px-4 py-6 md:p-8">
        <div className="flex gap-5 md:gap-6 mb-10 md:mb-7">
          <div className="relative h-full p-[10px] lg:p-[30px] rounded-full bg-neutral-white-base/[.04] transition duration-300 ease-out">
            <div className="relative w-11 lg:w-28 aspect-square rounded-full overflow-hidden">
              <Image
                src={testimonial.imgSrc}
                alt={testimonial.alt}
                fill
                sizes="(min-width: 1024px) 112px, 44px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h5 className="heading-h5-extrabold">
              &ldquo;{testimonial.quote}&rdquo;
            </h5>
            <div>
              <p className="body2-regular">{testimonial.position}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer text-xs text-neutral-white-base">
            <FaPlay />
          </div>
          <p className="body3-regular text-neutral-white-base opacity-80">
            00:00
          </p>
          <div className="w-full bg-[#D9D9D9] rounded-full h-1 z-40 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-pink-light to-primary-orange-light h-1 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
