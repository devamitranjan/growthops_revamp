"use client";

import { GrowthStatItem } from "./growth-stat-item";
import { useUnrivaledGrowthAnimation } from "./unrivaled-growth.hooks";
import { IUnrivaledGrowthData } from "@/content/types";

interface UnrivaledGrowthProps {
  data: IUnrivaledGrowthData;
}

export const UnrivaledGrowth: React.FC<UnrivaledGrowthProps> = ({ data }) => {
  const { title, stats, cta } = data;

  const {
    sectionRef,
    backgroundRef,
    headingRef,
    solidHeadingRef,
    ctaRef,
    registerStat,
  } = useUnrivaledGrowthAnimation({ stats, cta });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-x-0 bottom-0 top-0 z-0 overflow-hidden rounded-[0px] bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light"
      />

      <div className="relative z-10 grid min-h-screen grid-rows-2 text-white">
        <div className="flex items-center justify-center">
          <div ref={headingRef} className="relative z-20">
            <h2 className="heading-h2-bold gradient-text z-10 text-center">
              {title}
            </h2>
            <h2
              ref={solidHeadingRef}
              className="heading-h2-bold absolute inset-0 z-20 text-center text-white"
            >
              {title}
            </h2>
          </div>
        </div>
        <div />

        <ul className="pointer-events-none absolute inset-0 z-10">
          {stats?.map((item, i) => (
            <GrowthStatItem key={item.id} item={item} ref={registerStat(i)} />
          ))}
        </ul>

        {cta ? (
          <a
            ref={ctaRef}
            href={cta.href}
            className="body2-bold absolute z-10 rounded-[40px] border border-neutral-white-base bg-transparent px-10 py-3 text-white transition-colors duration-300 ease-out hover:bg-neutral-white-base hover:text-primary-pink-base max-md:top-[calc(50%+224px)] max-md:left-1/2 max-md:w-max max-md:-translate-x-1/2 md:top-[calc(50%+80px)] md:left-1/2"
          >
            {cta.label}
          </a>
        ) : null}
      </div>
    </section>
  );
};
