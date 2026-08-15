import Image from "next/image";
import { FaPlay } from "react-icons/fa6";
import { TestimonialData } from "./testimonials.types";

interface TestimonialCardProps {
  testimonial: TestimonialData;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="w-[85%] shrink-0 md:w-[720px] max-md:w-[min(82vw,420px)] max-md:aspect-square max-md:pl-6">
      {testimonial.audioSrc && <audio src={testimonial.audioSrc} />}
      <div className="h-full w-full rounded-[20px] bg-neutral-white-base/[.08] px-4 py-6 md:p-8">
        <div className="mb-10 flex gap-5 md:mb-7 md:gap-6">
          <div className="relative h-full rounded-full bg-neutral-white-base/[.04] p-[10px] transition duration-300 ease-out lg:p-[30px]">
            <div className="relative aspect-square w-11 overflow-hidden rounded-full lg:w-28">
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
        <div className="flex items-center gap-2">
          <div className="cursor-pointer text-xs text-neutral-white-base">
            <FaPlay />
          </div>
          <p className="body3-regular text-neutral-white-base opacity-80">
            00:00
          </p>
          <div className="z-40 h-1 w-full overflow-hidden rounded-full bg-[#D9D9D9]">
            <div className="h-1 rounded-full bg-gradient-to-r from-primary-pink-light to-primary-orange-light" />
          </div>
        </div>
      </div>
    </div>
  );
}
