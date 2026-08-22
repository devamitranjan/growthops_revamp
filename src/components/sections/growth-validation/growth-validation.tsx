import Image from "next/image";

import { SectionHeader } from "@/components/ui/section-header";
import type { GrowthValidationData } from "@/sanity/types";

export default function GrowthValidation({
  data,
}: {
  data: GrowthValidationData;
}) {
  return (
    <section className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <SectionHeader
          title={data.title}
          titleClassName="heading-h2-bold text-white text-4xl md:text-5xl font-extrabold"
          link={data.sectionLink}
        />

        <div className="relative flex max-md:flex-col h-[415px] w-full bg-gradient-to-b md:bg-gradient-to-r from-primary-blue-extradark via-primary-blue-dark to-primary-cyan-base rounded-[40px] overflow-hidden">
          <div className="md:w-2/5 max-md:h-1/2 flex flex-col justify-center md:pl-16 max-md:px-6 max-md:pt-8">
            <p className="body2-semibold md:body1-semibold mb-1 md:mb-2">
              {data.eyebrow}
            </p>
            <p className="heading-h3-bold mb-6 md:mb-8">{data.headline}</p>
            <div className="flex gap-4 justify-between md:justify-start">
              {data.awards.map((award) => (
                <a
                  key={award.image}
                  className="aspect-video w-1/2 md:w-40"
                  href={award.href}
                  target="_self"
                  rel=""
                >
                  {/* The tile is a background image so the two overlays can sit
                      on top of it without a stacking wrapper per layer. */}
                  <div
                    className="group relative h-full rounded-lg p-2 flex flex-col justify-end bg-cover bg-center overflow-hidden"
                    style={{ backgroundImage: `url('${award.image}')` }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-40 bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light transition ease-out duration-300 z-10" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-neutral-black-light/80" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="relative md:w-3/5 max-md:h-1/2">
            <Image
              src={data.image}
              alt={data.imageAlt}
              fill
              priority
              unoptimized
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
