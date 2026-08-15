import Image from "next/image";
import cx from "clsx";
import { ServiceItem } from "./services-grid.types";

interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <a href={service.href} target="_self" className="block min-w-0">
      <div className="group h-full w-full cursor-pointer rounded-[20px] bg-transparent p-[1.5px] transition duration-300 ease-out">
        <div
          className="
            relative
            flex
            h-[180px]
            w-full
            flex-col
            items-center
            justify-center
            gap-3
            overflow-hidden
            rounded-[30px]
            border
            border-neutral-white-base
            bg-neutral-black-light
            px-2
            py-4
            transition
            duration-300
            ease-out
            hover:bg-primary-cyan-extradark

            md:h-full
            md:gap-4
            md:px-3
            md:py-3
          "
        >
          <div
            className="
              relative
              h-[125px]
              w-[125px]
              max-w-full
              shrink-0
              overflow-hidden
              rounded-full

              md:h-[120px]
              md:w-[120px]
            "
          >
            <div
              className={cx(
                "absolute inset-0 z-20 h-full w-full opacity-80 mix-blend-color",
                service.overlayColor,
              )}
            />
            <Image
              src={service.imgSrc}
              alt={service.alt}
              fill
              className="object-cover transition duration-300 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 125px, 120px"
            />
          </div>
        </div>
      </div>
    </a>
  );
}
