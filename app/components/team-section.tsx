"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const teamBatches = [
  [
    {
      name: "Chee Keong",
      title: "Chief Executive Officer, Asia",
      from: "#1a2a5c",
      to: "#0c1330",
      image: "/goGetters_Img/goon.webp",
    },
    {
      name: "Boon Keong Tng",
      title: "Regional Head of Consulting",
      from: "#2c2c2c",
      to: "#000000",
      image: "/goGetters_Img/boon.webp",
    },
    {
      name: "Chris Greenough",
      title:
        "General Manager, Malaysia and Regional Head of Creative Strategy",
      from: "#1f3d38",
      to: "#0a1815",
      image: "/goGetters_Img/chris.webp",
    },
  ],
  [
    {
      name: "Shaad Hamid",
      title:
        "General Manager, Singapore and Regional Head of Performance Marketing",
      from: "#5c2430",
      to: "#260f16",
      image: "/goGetters_Img/shaad.webp",
    },
    {
      name: "Edith Chin",
      title: "Head of Finance",
      from: "#4a3220",
      to: "#1c130a",
      image: "/goGetters_Img/edith.webp",
    },
    {
      name: "Arshpreet Kaur",
      title: "Group General Counsel",
      from: "#004cba",
      to: "#0c1330",
      image: "/goGetters_Img/arsh.webp",
    },
  ],
];

const continuousBatches = [...teamBatches, ...teamBatches];

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((current) => {
        setPrevIndex(current);
        return (current + 1) % continuousBatches.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="reveal mt-20 max-md:mt-[100px]">
      <div className="mx-auto w-full max-w-[1280px] px-5 max-md:px-10">


        <h2 className="heading-h2-bold mb-8 text-white max-md:mb-8">
          Meet Our GOGetters
        </h2>


        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">

          {[0, 1, 2].map((columnIndex) => {
            const staticBg = teamBatches[0][columnIndex];

            return (
              <div
                key={columnIndex}
                className="bg-white p-2"
              >
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

                  {continuousBatches.map((batch, batchIndex) => {
                    const member = batch[columnIndex];

                    const isCurrent = batchIndex === currentIndex;
                    const isPrev = batchIndex === prevIndex;

                    let positionClass = "translate-x-full";
                    let transitionClass = "transition-none";

                    if (isCurrent) {
                      positionClass = "translate-x-0";
                      transitionClass =
                        "transition-transform duration-[600ms] ease-in-out";
                    } else if (isPrev) {
                      positionClass = "-translate-x-full";
                      transitionClass =
                        "transition-transform duration-[600ms] ease-in-out";
                    }

                    const delay =
                      isCurrent || isPrev
                        ? `${columnIndex * 150}ms`
                        : "0ms";

                    return (
                      <div
                        key={`content-${batchIndex}`}
                        className={`
                          absolute
                          inset-0
                          flex
                          flex-col
                          justify-end
                          p-4

                          ${positionClass}
                          ${transitionClass}

                          max-md:flex-row
                          max-md:items-center
                          max-md:justify-start
                          max-md:p-0
                        `}
                        style={{
                          transitionDelay: delay,
                        }}
                      >

                        <div
                          className="
                            absolute
                            inset-0
                            overflow-hidden

                            max-md:left-0
                            max-md:top-0
                            max-md:right-auto
                            max-md:bottom-0
                            max-md:h-full
                            max-md:w-[42%]

                            max-md:rounded-tl-xl
                            max-md:rounded-bl-xl
                          "
                        >
                          {member.image && (
                            <Image
                              src={member.image}
                              alt={`${member.name} - ${member.title}`}
                              fill
                              className="
                                object-cover
                                object-top
                              "
                              sizes="42vw"
                            />
                          )}
                        </div>

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/90
                            via-black/30
                            to-transparent

                            max-md:hidden
                          "
                        />

                        <div
                          className="
                            relative
                            z-10

                            max-md:ml-[42%]
                            max-md:flex
                            max-md:h-full
                            max-md:flex-1
                            max-md:flex-col
                            max-md:justify-center
                            max-md:overflow-hidden
                            max-md:px-3
                          "
                        >
                          <p
                            className="
                              body1-semibold
                              text-white
                              max-md:text-sm
                            "
                          >
                            {member.name}
                          </p>

                          <p
                            className="
                              body2-regular
                              mt-1
                              text-white/80
                              line-clamp-3

                              max-md:text-xs
                              max-md:leading-[1.3]
                            "
                          >
                            {member.title}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

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
                  +250
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
                  team members embracing our #GrowTogether culture
                </p>

              </div>

              <a
                href="https://www.growthops.asia/culture"
                target="_self"
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
                Learn more
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}