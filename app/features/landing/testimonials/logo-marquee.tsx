"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { LogoData } from "./testimonials.types";

interface LogoMarqueeProps {
  logos: LogoData[];
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <Marquee
        gradient={false}
        speed={75}
        pauseOnHover
        direction="left"
        className="[&_.rfm-marquee]:items-center [&_.rfm-marquee]:gap-4"
      >
        {logos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="relative mx-4 inline-block h-[40px] w-[102px] align-middle md:h-[62px] md:w-[160px]"
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
      </Marquee>
    </div>
  );
}
