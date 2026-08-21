import type { Ref } from "react";
import { GrowthStat } from "@/sanity/types";

interface GrowthStatItemProps {
  item: GrowthStat;
  ref: Ref<HTMLLIElement>;
}

export function GrowthStatItem({ item, ref }: GrowthStatItemProps) {
  return (
    <li
      ref={ref}
      className="absolute flex items-center gap-4 max-md:inset-x-6 max-md:top-[calc(50%+72px)] max-md:flex-col md:top-1/2 md:left-1/2  md:-translate-y-1/2"
    >
      <p className="heading-h1-extrabold">{item.stat}</p>
      <p className="max-md:text-center md:w-3/5">{item.description}</p>
    </li>
  );
}
