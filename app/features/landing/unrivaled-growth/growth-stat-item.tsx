"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { GrowthStat } from "./unrivaled-growth.types";

interface GrowthStatItemProps {
  item: GrowthStat;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  isFirst: boolean;
  isLast: boolean;
}

const FADE_WIDTH = 0.03;
const SLIDE_DISTANCE = 40;

export function GrowthStatItem({
  item,
  scrollYProgress,
  start,
  end,
  isFirst,
  isLast,
}: GrowthStatItemProps) {
  const range = isFirst
    ? [0, end - FADE_WIDTH, end]
    : isLast
      ? [start, start + FADE_WIDTH, 1]
      : [start, start + FADE_WIDTH, end - FADE_WIDTH, end];

  const opacity = useTransform(
    scrollYProgress,
    range,
    isFirst ? [1, 1, 0] : isLast ? [0, 1, 1] : [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    range,
    isFirst
      ? [0, 0, -SLIDE_DISTANCE]
      : isLast
        ? [SLIDE_DISTANCE, 0, 0]
        : [SLIDE_DISTANCE, 0, 0, -SLIDE_DISTANCE]
  );

  const pointerEvents = useTransform(opacity, (value) =>
    value > 0.5 ? "auto" : "none"
  );

  const ctaOpacity = useTransform(
    scrollYProgress,
    [end - FADE_WIDTH * 1.5, end],
    [0, 1]
  );

  return (
    <motion.li
      style={{ opacity, y, pointerEvents }}
      className="inline-block absolute left-0 top-0 md:top-1/2 md:-translate-y-1/2 flex max-md:flex-col gap-4 items-center"
    >
      <p className="heading-h1-extrabold">{item.stat}</p>
      <p className="max-md:text-center md:w-3/5">{item.description}</p>
      {item.cta && (
        <motion.a
          style={{ opacity: ctaOpacity }}
          href="https://www.growthops.asia/work"
          target="_self"
          rel=""
          className="rounded-[40px] bg-transparent hover:bg-neutral-white-base text-white hover:text-primary-pink-base body2-bold border border-neutral-white-base px-10 py-3 transition-colors ease-out duration-300 inline-block absolute left-1/2 max-md:-translate-x-1/2 md:left-0 -bottom-16 md:-bottom-14 max-md:w-max"
        >
          View more results
        </motion.a>
      )}
    </motion.li>
  );
}
