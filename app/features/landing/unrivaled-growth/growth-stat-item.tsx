import { GrowthStat } from "./unrivaled-growth.types";

interface GrowthStatItemProps {
  item: GrowthStat;
}

export function GrowthStatItem({ item }: GrowthStatItemProps) {
  return (
    <li className="rolling-text inline-block absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 flex max-md:flex-col gap-4 items-center">
      <p className="heading-h1-extrabold">{item.stat}</p>
      <p className="max-md:text-center md:w-3/5">{item.description}</p>
      {item.cta && (
        <a
          href="https://www.growthops.asia/work"
          target="_self"
          rel=""
          className="scroll-text-cta rounded-[40px] bg-transparent hover:bg-neutral-white-base text-white hover:text-primary-pink-base body2-bold border border-neutral-white-base px-10 py-3 transition ease-out duration-300 inline-block absolute left-1/2 max-md:-translate-x-1/2 md:left-0 -bottom-16 md:-bottom-14 max-md:w-max"
        >
          View more results
        </a>
      )}
    </li>
  );
}
