"use client";

import Image from "next/image";
import { ToggleGroup } from "radix-ui";
import { FaAngleLeft, FaAngleRight, FaPlay } from "react-icons/fa6";

const categories = [
  "Finance",
  "Insurance",
  "Telco",
  "Travel",
  "Superapp",
  "More",
];

const testimonials = [
  {
    audioSrc: "",
    imgSrc: "/placeholder.svg",
    alt: "Mizuho",
    quote:
      "From strategy to execution, GrowthOps went beyond and exceeded our expectations.",
    position:
      "Director, Systems Planning ＆ Development Section, Mizuho Bank, Ltd. ",
  },
  {
    audioSrc: "",
    imgSrc: "/placeholder.svg",
    alt: "Leading Regional Bank",
    quote: "GrowthOps have helped us profitably acquire customers.",
    position: "Business & Innovation ",
  },
  {
    audioSrc: "",
    imgSrc: "/placeholder.svg",
    alt: "company logo",
    quote:
      "The key to success was due to collaborative efforts and fast implementation of GrowthOps and our teams.",
    position: "Digital Analytics & Insights, Decision Management",
  },
];

const logos = [
  { src: "/placeholder.svg", alt: "DBS x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "RHB x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "AIA x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "UOB x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Mastercard x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Emirates x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "CIMB x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Telekom Malaysia x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "U Mobile x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Firefly Airlines x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Malaysia Airlines x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Taylor's Universityx GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Grab x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Esplanade x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "HLB x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Unifi x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Mizuho x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Singlife x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Manulife x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "FWD x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Proton x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Amway x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Maxis x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Bega x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Farmer's Union x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Unicharm x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Shell x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "RSPO x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "Upvio x GrowthOps Asia" },
  { src: "/placeholder.svg", alt: "SPH x GrowthOps Asia" },
];

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
              {testimonials.map((item) => (
                <div
                  key={item.alt}
                  className="w-[85%] md:w-[45%] shrink-0 max-md:pl-6"
                >
                  {item.audioSrc && <audio src={item.audioSrc} />}
                  <div className="w-full h-full bg-neutral-white-base/[.08] rounded-[20px] px-4 py-6 md:p-8">
                    <div className="flex gap-5 md:gap-6 mb-10 md:mb-7">
                      <div className="relative h-full p-[10px] lg:p-[30px] rounded-full bg-neutral-white-base/[.04] transition duration-300 ease-out">
                        <div className="relative w-11 lg:w-28 aspect-square rounded-full overflow-hidden">
                          <Image
                            src={item.imgSrc}
                            alt={item.alt}
                            fill
                            sizes="(min-width: 1024px) 112px, 44px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-8">
                        <h5 className="heading-h5-extrabold">
                          &ldquo;{item.quote}&rdquo;
                        </h5>
                        <div>
                          <p className="body2-regular">{item.position}</p>
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
              ))}
            </div>
          </div>

          <div className="logo-slider-wrapper relative w-full whitespace-nowrap overflow-hidden">
            {[0, 1].map((row) => (
              <div
                key={row}
                className="logo-slider inline-block h-full w-max animate-logo-slide"
              >
                {logos.map((logo, i) => (
                  <div
                    key={`${row}-${i}`}
                    className="relative inline-block align-middle w-[102px] md:w-[160px] h-[40px] md:h-[62px] mx-4"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      sizes="(min-width: 768px) 160px, 102px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
