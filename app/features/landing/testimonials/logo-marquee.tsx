import Image from "next/image";
import { LogoData } from "./testimonials.types";

interface LogoMarqueeProps {
  logos: LogoData[];
}

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  return (
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
  );
}
