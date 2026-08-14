import React from "react";
import Image from "next/image";
import cx from "clsx";
// 1. Added a TypeScript Interface for strict typing
interface ServiceItem {
  href: string;
  imgSrc: string;
  alt: string;
  overlayColor: string;
}

const services: ServiceItem[] = [
  {
    href: "https://www.growthops.asia/digital-first-creative",
    imgSrc: "/ourServices/digital-first-creative.webp",
    alt: "Digital-First Creative",
    overlayColor: "bg-primary-cyan-base",
  },
  {
    href: "https://www.growthops.asia/performance-marketing-and-analytics",
    imgSrc: "/ourServices/performance-marketing.webp",
    alt: "Performance Marketing",
    overlayColor: "bg-primary-pink-base",
  },
  {
    href: "https://www.growthops.asia/marketing-technology",
    imgSrc: "/ourServices/marketing-technology.webp",
    alt: "Marketing Technology",
    overlayColor: "bg-primary-blue-dark",
  },
  {
    href: "https://www.growthops.asia/experience-strategy-and-design",
    imgSrc: "/ourServices/experience-strategy-&-design.webp",
    alt: "Experience Strategy and Design",
    overlayColor: "bg-primary-yellow-extradark",
  },
  {
    href: "https://www.growthops.asia/fsi-tech",
    imgSrc: "/ourServices/fsi-technology.webp",
    alt: "FSI-Technology",
    overlayColor: "bg-primary-blue-extradark",
  },
  {
    href: "https://www.growthops.asia/research-insights-and-strategy",
    imgSrc: "/ourServices/research-insights-&-strategy.webp",
    alt: "Research, Insights and Strategy",
    overlayColor: "bg-primary-cyan-base",
  },
];

export default function ServicesGrid() {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <h2 className="heading-h2-bold mb-8 text-white max-md:mb-12">
          Our Services
        </h2>

        {/* Grid handles responsiveness perfectly */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-6">
          {services.map((service) => (
            <a key={service.href} href={service.href} target="_self">
              {/* Fixed typo: bg-transparent */}
              <div className="group h-full cursor-pointer rounded-[20px] bg-transparent p-[1.5px] transition duration-300 ease-out">
                <div className="flex h-full flex-col items-center justify-center gap-3 rounded-[30px] border border-neutral-white-base bg-neutral-black-light py-3 transition duration-300 ease-out hover:bg-primary-cyan-extradark md:gap-4 md:px-3">
                  {/* Fixed arbitrary values for mobile sizing (h-[72px]) so it definitely renders */}
                  <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full md:h-[120px] md:w-[120px]">
                    <div
                      className={cx(
                        "absolute left-0 top-0 z-20 h-full w-full opacity-80 mix-blend-color",
                        service.overlayColor,
                      )}
                    />

                    {/* Upgraded to Next.js Image component */}
                    <Image
                      src={service.imgSrc}
                      alt={service.alt}
                      fill
                      className="object-cover transition duration-300 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 72px, 120px"
                    />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
