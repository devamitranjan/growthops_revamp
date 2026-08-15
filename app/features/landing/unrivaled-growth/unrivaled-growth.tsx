import { GrowthStatItem } from "./growth-stat-item";
import { stats } from "./unrivaled-growth.data";

export default function UnrivaledGrowth() {
  return (
    <section className="scroll-animation-wrapper generic-conatiner h-screen flex max-md:flex-col justify-center items-center gap-12 md:gap-24 mt-[80px] md:mt-[100px]">
      <div className="scroll-animation-bg absolute top-0 left-0 h-full w-full">
        <div className="h-full w-full bg-gradient-to-r from-primary-pink-extradark to-primary-pink-light" />
      </div>
      <div className="scroll-animation-title heading-h2-extrabold bg-neutral-white-base bg-clip-text text-transparent md:w-full max-md:h-1/2 md:pl-32 flex justify-center max-md:items-end text-center">
        <h2>Unrivaled Growth</h2>
      </div>
      <ul className="rolling-text-wrapper relative h-full w-9/12 md:w-full md:mr-32 invisible overflow-hidden z-10">
        {stats.map((item) => (
          <GrowthStatItem key={item.stat} item={item} />
        ))}
      </ul>
    </section>
  );
}
