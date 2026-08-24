"use client";

import clsx from "clsx";

import { SectionHeader } from "@/components/ui/section-header";
import { ICreativeTechData } from "@/sanity/types";
import { useTechMarquee } from "./creative-tech.hooks";
import { TechMarqueeRow } from "./tech-marquee-row";

interface CreativeTechProps {
  data: ICreativeTechData;
}

export default function CreativeTech({ data }: CreativeTechProps) {
  const { sectionRef, registerTrack } = useTechMarquee(data.rows);

  return (
    <section ref={sectionRef} className="reveal mt-[80px] md:mt-[100px]">
      <div className="generic-container">
        <SectionHeader
          title={data.title}
          titleClassName="heading-h2-extrabold text-neutral-white-base"
        />

        <div className="overflow-hidden rounded-[24px] bg-neutral-white-base/[.04] md:rounded-[32px]">
          {data.rows.map((row, index) => (
            <TechMarqueeRow
              key={row.id}
              logos={row.logos}
              trackRef={registerTrack(index)}
              className={clsx(
                index > 0 && "border-t border-neutral-white-base/10",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
