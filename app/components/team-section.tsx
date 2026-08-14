"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

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
      title: "General Manager, Malaysia and Regional Head of Creative Strategy",
      from: "#1f3d38",
      to: "#0a1815",
      image: "/goGetters_Img/chris.webp",
    },
  ],
  [
    {
      name: "Shaad Hamid",
      title: "General Manager, Singapore and Regional Head of Performance Marketing",
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
  ]
];

// Duplicating the batches creates an invisible buffer for smooth looping
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
        <h2 className="heading-h2-bold mb-8 text-white max-md:mb-12">
          Meet Our GOGetters
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          
          {/* Animated Team Member Cards */}
          {[0, 1, 2].map((columnIndex) => {
            return (
              // 1. OUTER WHITE FRAME
              <div 
                key={columnIndex} 
                className="bg-white p-2"
              >
                {/* 2. INNER CLIPPING CONTAINER */}
                <div className="relative h-full w-full overflow-hidden rounded-xl rounded-br-[60px] bg-[#0c1330] aspect-[3/4]">
                  
                  {/* 3A. BACKGROUND LAYER: Fades smoothly in place (does not slide) */}
                  {continuousBatches.map((batch, batchIndex) => {
                    const member = batch[columnIndex];
                    const isCurrent = batchIndex === currentIndex;
                    
                    // Match the slide delay so the color changes right as the image arrives
                    const delay = `${columnIndex * 150}ms`;

                    return (
                      <div
                        key={`bg-${batchIndex}`}
                        className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out ${
                          isCurrent ? "opacity-100" : "opacity-0"
                        }`}
                        style={{
                          background: `linear-gradient(160deg, ${member.from}, ${member.to})`,
                          transitionDelay: delay,
                        }}
                      />
                    );
                  })}

                  {/* 3B. SLIDING CONTENT: Image and Text layer that slides right-to-left */}
                  {continuousBatches.map((batch, batchIndex) => {
                    const member = batch[columnIndex];
                    const isCurrent = batchIndex === currentIndex;
                    const isPrev = batchIndex === prevIndex;
                    
                    let positionClass = "translate-x-full";
                    let transitionClass = "transition-none";

                    if (isCurrent) {
                      positionClass = "translate-x-0";
                      transitionClass = "transition-transform duration-[600ms] ease-in-out";
                    } else if (isPrev) {
                      positionClass = "-translate-x-full";
                      transitionClass = "transition-transform duration-[600ms] ease-in-out";
                    }

                    const delay = isCurrent || isPrev ? `${columnIndex * 150}ms` : "0ms";

                    return (
                      <div
                        key={`content-${batchIndex}`}
                        className={`absolute inset-0 flex flex-col justify-end p-6 ${positionClass} ${transitionClass}`}
                        style={{
                          transitionDelay: delay,
                        }}
                      >
                        {/* Optimized Next.js Image */}
                        {member.image && (
                          <Image
                            src={member.image}
                            alt={`${member.name} - ${member.title}`}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        )}

                        {/* Dark gradient overlay (slides with the image) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        
                        {/* Text Content */}
                        <div className="relative z-10">
                          <p className="body1-semibold text-white">
                            {member.name}
                          </p>
                          <p className="body2-regular mt-1 text-white/80 line-clamp-3">
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

          {/* 4. STATIC +250 CULTURE CARD */}
          <div className="bg-white p-2">
            <div className="relative flex h-full w-full aspect-[3/4] flex-col justify-center gap-8 overflow-hidden rounded-xl rounded-br-[60px] bg-[#0a1128] p-6 lg:p-8">
              <div>
                <p className="text-6xl font-extrabold text-[#3b82f6] lg:text-7xl">
                  +250
                </p>
                <p className="body2-semibold mt-4 text-[#3b82f6]">
                  team members embracing our <br />
                  #GrowTogether culture
                </p>
              </div>
              <a
                href="https://www.growthops.asia/culture"
                target="_self"
                className="w-fit rounded-full border border-white px-6 py-2.5 text-sm font-bold text-white transition duration-300 ease-out hover:bg-white hover:text-[#0c1330]"
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