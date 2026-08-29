"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { LogoData } from "@/content/types";

interface LogoMarqueeProps {
  logos: LogoData[];
  speed?: number;
}

export function LogoMarquee({ logos, speed = 75 }: LogoMarqueeProps) {
  return (
    <div className="relative w-full overflow-hidden">
      <Marquee
        gradient={false}
        speed={speed}
        pauseOnHover
        direction="left"
        className="[&_.rfm-marquee]:items-center"
      >
        {logos.map((logo) => (
          <div
            key={logo.id}
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
