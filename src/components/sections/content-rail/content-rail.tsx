import { SectionHeader } from "@/components/ui/section-header";
import type { IContentRailData } from "@/content/types";

import { ContentRailScroll } from "./content-rail-scroll";

export default function ContentRail({ data }: { data: IContentRailData }) {
  if (!data.cards.length) return null;

  return (
    <section className="reveal mt-[80px] bg-[#d01950] pb-16 md:mt-[100px]">
      <div className="rounded-b-[40px] bg-white md:rounded-b-[56px]">
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
