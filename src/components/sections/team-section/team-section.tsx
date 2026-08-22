"use client";

import { TeamMemberCard } from "./team-member-card";
import { useTeamRotation } from "./team-section.hooks";
import { ITeamSectionData } from "@/sanity/types";

interface TeamSectionProps {
  data: ITeamSectionData;
}

export default function TeamSection({ data }: TeamSectionProps) {
  const { title, batches, highlight } = data;

  const { currentIndex, prevIndex, continuousBatches, columnIndexes } =
    useTeamRotation(batches);

  return (
    <section className="reveal mt-20 max-md:mt-[100px]">
      <div className="mx-auto w-full max-w-[1280px] px-5 max-md:px-10">
        <h2 className="heading-h2-bold mb-8 text-white max-md:mb-8">{title}</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {columnIndexes.map((columnIndex) => {
            const staticBg = batches[0][columnIndex];

            return (
              <div key={columnIndex} className="bg-white p-2">
                <div
                  className="
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    rounded-xl
                    rounded-br-[60px]
                    aspect-[3/4]

                    max-md:aspect-auto
                    max-md:h-[210px]

                    max-md:rounded-tl-xl
                    max-md:rounded-tr-xl
                    max-md:rounded-bl-xl
                    max-md:rounded-br-[60px]
                  "
                  style={{
                    background: `linear-gradient(160deg, ${staticBg.from}, ${staticBg.to})`,
                  }}
                >
                  {continuousBatches.map((batch, batchIndex) => (
                    <TeamMemberCard
                      key={`content-${batchIndex}`}
                      member={batch[columnIndex]}
                      columnIndex={columnIndex}
                      isCurrent={batchIndex === currentIndex}
                      isPrev={batchIndex === prevIndex}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {highlight ? (
            <div className="bg-white p-2">
              <div
                className="
                  relative
                  flex
                  h-full
                  w-full
                  aspect-[3/4]
                  flex-col
                  justify-center
                  gap-5
                  overflow-hidden
                  rounded-xl
                  rounded-br-[60px]
                  bg-[#0a1128]
                  p-6
                  lg:p-8

                  max-md:aspect-auto
                  max-md:h-[210px]
                  max-md:rounded-tl-xl
                  max-md:rounded-tr-xl
                  max-md:rounded-bl-xl
                  max-md:rounded-br-[60px]
                  max-md:p-5
                "
              >
                <div>
                  <p
                    className="
                      bg-gradient-to-r
                      from-[#93c5fd]
                      via-[#3b82f6]
                      to-[#2563eb]
                      bg-clip-text
                      text-6xl
                      font-extrabold
                      text-transparent
                      lg:text-7xl

                      max-md:text-4xl
                    "
                  >
                    {highlight.value}
                  </p>

                  <p
                    className="
                      body2-semibold
                      mt-4
                      bg-gradient-to-r
                      from-[#93c5fd]
                      via-[#3b82f6]
                      to-[#2563eb]
                      bg-clip-text
                      text-transparent

                      max-md:mt-2
                      max-md:text-xs
                    "
                  >
                    {highlight.description}
                  </p>
                </div>

                {highlight.cta ? (
                  <a
                    href={highlight.cta.href}
                    target={highlight.cta.target ?? "_self"}
                    className="
                      w-fit
                      rounded-full
                      border
                      border-white
                      px-6
                      py-2.5
                      text-sm
                      font-bold
                      text-white
                      transition
                      duration-300
                      ease-out
                      hover:bg-white
                      hover:text-[#0c1330]

                      max-md:px-4
                      max-md:py-1.5
                      max-md:text-xs
                    "
                  >
                    {highlight.cta.label}
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
