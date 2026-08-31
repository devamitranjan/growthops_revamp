"use client";

import { FaPlus } from "react-icons/fa6";
import { Accordion } from "radix-ui";

import type { IFaqData } from "@/content/types";
import { FaqAnswer } from "./faq-answer";

interface FaqProps {
  data: IFaqData;
}

/**
 * The question-and-answer panel.
 *
 * This is the one light block in an otherwise dark page, so the panel paints
 * its own background and ink rather than inheriting either. Answers open
 * independently — `type="multiple"` means opening one leaves the others as the
 * reader left them, so two answers can be compared side by side. Every row is
 * closeable, so nothing has to stay open.
 *
 * The plus rotates 45deg into a cross instead of swapping to a second icon, so
 * the two states animate into each other rather than popping.
 */
export default function Faq({ data }: FaqProps) {
  const { title, eyebrow, items, openFirst } = data;

  return (
    <section data-surface="white" className="bg-white">
      <div className="generic-container pt-20 md:py-28">
        <div className="rounded-[30px] bg-neutral-white-base px-6 py-12 md:rounded-[40px] md:px-16 md:py-20">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-16 lg:gap-24">
            {/* The heading sits at the top of its column and stays there.
                It is deliberately not sticky: following the scroll down past a
                long list of open answers reads as the title coming loose. */}
            <div className="md:self-start">
              {eyebrow && (
                <p className="body2-semibold mb-3 uppercase tracking-wide text-primary-pink-base">
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-12 text-2xl font-bold md:mt-16 md:text-3xl first:mt-0 text-neutral-black-light">
                {title}
              </h2>
            </div>

            <Accordion.Root
              type="multiple"
              defaultValue={openFirst && items[0] ? [items[0].id] : undefined}
              className="w-full"
            >
              {items.map((item) => (
                <Accordion.Item
                  key={item.id}
                  value={item.id}
                  className="border-b border-neutral-black-light/10"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary-pink-base focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-white-base">
                      <span className="body1-bold text-neutral-black-light transition duration-300 ease-out group-hover:text-primary-pink-base md:text-[1.0625rem]">
                        {item.question}
                      </span>
                      <FaPlus
                        aria-hidden
                        className="mt-1 shrink-0 text-lg text-primary-pink-base transition-transform duration-300 ease-out group-data-[state=open]:rotate-45"
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>

                  <Accordion.Content className="accordion-content">
                    <div className="pb-6 pr-10">
                      <FaqAnswer answer={item.answer} />
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </div>
    </section>
  );
}
