import type { IRichTextData } from "@/content/types";

import { RichTextBody } from "./rich-text-body";

export default function RichTextSection({ data }: { data: IRichTextData }) {
  // An empty body is not a section. It also keeps the white panel from
  // appearing as a bare band while an editor is still filling the field in.
  if (!data.content.length) return null;

  return (
    <section data-surface="white" className="bg-white">
      <div className="generic-container pt-20 md:pt-28">
        <div className="[&>*:first-child]:mt-0 [&>[data-lead-in]+*]:mt-0 [&>h2+*]:mt-0 [&>h3+*]:mt-0 [&>h4+*]:mt-0 [&>h5+*]:mt-0">
          {data.title && (
            <h2 className="text-[1.75rem] font-bold leading-[1.3] text-black md:text-[2.25rem]">
              {data.title}
            </h2>
          )}

          <RichTextBody content={data.content} />
        </div>
      </div>
    </section>
  );
}
