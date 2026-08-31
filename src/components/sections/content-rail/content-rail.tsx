import { SectionHeader } from "@/components/ui/section-header";
import type { IContentRailData } from "@/content/types";

import { ContentRailScroll } from "./content-rail-scroll";

export default function ContentRail({ data }: { data: IContentRailData }) {
  if (!data.cards.length) return null;

  return (
    <section className="reveal relative isolate pb-16 bg-[#d01950]">
      <div className="rounded-b-[40px] bg-white md:rounded-b-[56px] py-16">
        <ContentRailScroll cards={data.cards}>
          <SectionHeader
            title={data.title}
            titleClassName="heading-h2-extrabold text-neutral-black-base"
            subtitle={
              data.description ? (
                <p className="body2-regular md:body1-regular max-w-[92ch] text-neutral-black-base">
                  {data.description}
                </p>
              ) : undefined
            }
            className="flex items-center justify-between"
          />
        </ContentRailScroll>
      </div>
    </section>
  );
}
